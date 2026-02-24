import { json, redirect } from 'react-router-dom'
import AuthenticationForm from './AuthenticationForm'
import mainStore from '../../store'
import { userActions } from '../../store/slices/userSlice'
import ErrorPage from '../error/Error'
import { getUserObject } from '../../utils/auth'
import { isValidText } from '../../utils/validation'
import API_BASE from '../../utils/apiBase'
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_AUTH_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const app2 = initializeApp(firebaseConfig)
const auth = getAuth(app2)

export default function Authentication() {
    const user = getUserObject()

    return (
        <>
            {!user ? (
                <div aria-label='auth-form-container' className="auth-form-container">
                    <div className="auth-form-bg" />
                    <AuthenticationForm />
                </div>
            ) : (
                <ErrorPage loggedIn={true}></ErrorPage>
            )}
        </>
    )
}

export function parseAuthFormData(formData) {
  return {
    email: formData.get('email'),
    password: formData.get('password'),
    rememberMe: formData.has('rememberMe'),
  }};

export const action = async ({ request }) => {
    try {
        const searchParams = new URL(request.url).searchParams

        const mode = searchParams.get('mode') || 'login'
        const state = mainStore.getState()
        const routeParallax = state.switcherSlice.routeParallax
        const routeSidebar = state.switcherSlice.routeSidebar
        let loggedUser;
        if (mode !== 'login' && mode !== 'signup') {
            throw json({ message: 'Unsupported mode.' }, { status: 422 })
        }
        const data = await request.formData()

        const { email, password, rememberMe } = parseAuthFormData(data);
   

        if (!isValidText(password, 6)) {
            return json(
                { message: 'Password must be at least 6 characters long.' },
                { status: 422 }
            )
        }

        if (mode === 'signup') {
            const createdFlag = sessionStorage.getItem('signupCreated') === 'true';
            if (createdFlag) {
                return json(
                    { message: 'Signup limit reached for this session.' },
                    { status: 429 }
                );
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                console.log('User registered with uid:', userCredential.user)
                sessionStorage.setItem('signupCreated', 'true');
                return redirect('/auth?mode=login')
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    return json(
                        { message: 'Email already exists' },
                        { status: 422 }
                    )
                }
                throw new Error('Signup failed');            }
        }

        if (mode === 'login') {
            const LIMIT_WINDOW_MS = 60_000;
            const now = Date.now();
            const lastTs = Number(sessionStorage.getItem('loginAttemptsTs') || '0');
            if (lastTs && now - lastTs > LIMIT_WINDOW_MS) {
                sessionStorage.setItem('loginAttempts', '0');
                sessionStorage.setItem('loginAttemptsTs', '0');
            }
            const attempts = Number(sessionStorage.getItem('loginAttempts') || '0');
            const withinWindow = lastTs && now - lastTs <= LIMIT_WINDOW_MS;
            if (withinWindow && attempts >= 3) {
                return json(
                    { message: 'Login limit reached. Please wait and try again.' },
                    { status: 429 }
                );
            }
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password,
                    rememberMe
                )
                loggedUser = userCredential.user
                sessionStorage.setItem('loginAttempts', '0');
                sessionStorage.setItem('loginAttemptsTs', '0');
                const token = await loggedUser.getIdToken(true)
                const res = await fetch(
                    `${API_BASE}/api/backend/sessionLogin`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token, rememberMe }),
                        credentials: 'include', // ensures cookie is set
                    }
                )
                if (!res.ok) {
                    if (res.status === 429) {
                        return json(
                            { message: 'Login limit reached. Please wait and try again.' },
                            { status: 429 }
                        );
                    }
                    return json(
                        { message: 'Failed to create session.' },
                        { status: res.status }
                    );
                }
                mainStore.dispatch(userActions.setUser(loggedUser.uid))
            
            } catch (error) {
                console.log(error.message, error.code)
                if (error?.code === 'auth/too-many-requests') {
                    return json(
                        { message: 'Too many attempts from this device. Please wait and try again later.' },
                        { status: 429 }
                    );
                }
                if (error?.code === 'auth/network-request-failed') {
                    return json(
                        { message: 'Please check your connection' },
                        { status: 503 }
                    );
                }
                const nextAttempts = attempts + 1;
                sessionStorage.setItem('loginAttempts', String(nextAttempts));
                sessionStorage.setItem('loginAttemptsTs', String(now));
                if (nextAttempts >= 3) {
                    return json(
                        { message: 'Login limit reached. Please wait and try again.' },
                        { status: 429 }
                    );
                }
                return json(
                    { message: 'Invalid email or password.' },
                    { status: 401 }
                );
            }
        }

        if (routeParallax) {
            return redirect('/questionnaire')
        } else {
            if (routeSidebar) {
                if (loggedUser) {
                    mainStore.dispatch(userActions.setUser(loggedUser.uid))
                }
            }
            return redirect('/')
        }
    } catch (error) {
      
        console.log('Error with', error.message, error.code)
        throw error
    }
}

export async function logoutAction() {
    const state = mainStore.getState()
    const user = state.userSlice.user
    if (user) {
        try {
            await fetch(`${API_BASE}/api/backend/logout`, {
                method: 'POST',
                credentials: 'include',
            })

            mainStore.dispatch(userActions.clearUser())
            console.log('logout logic executing')
            return redirect('/')
        } catch (error) {
            console.error('Error logging out:', error)
            throw error;
        }
    }
}
