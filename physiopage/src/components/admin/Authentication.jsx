import { json, redirect } from 'react-router-dom'
import AuthenticationForm from './AuthenticationForm'
import mainStore from '../../store'
import { userActions } from '../../store/slices/userSlice'
import ErrorPage from '../error/Error'
import { getUserObject } from '../../utils/auth'
import { isValidText } from '../../utils/validation'
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
    databaseURL: import.meta.env.VITE_FIREBASE_URL,
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
        console.log(mode)
        if (mode !== 'login' && mode !== 'signup') {
            throw json({ message: 'Unsupported mode.' }, { status: 422 })
        }
        const data = await request.formData()

        const { email, password, rememberMe } = parseAuthFormData(data);

        console.log(rememberMe)

        if (!isValidText(password, 6)) {
            return json(
                { message: 'Password must be at least 6 characters long.' },
                { status: 422 }
            )
        }

        if (mode === 'signup') {
          
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                console.log('User registered with uid:', userCredential.user)
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
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password,
                    rememberMe
                )
                const loggedUser = userCredential.user
                const token = await loggedUser.getIdToken(true)
                console.log('Sending token:', token)
                const res = await fetch(
                    'http://localhost:5000/api/backend/sessionLogin',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token, rememberMe }),
                        credentials: 'include', // ensures cookie is set
                    }
                )
                console.log('User logged in:', loggedUser.uid, mode)
                mainStore.dispatch(userActions.setUser(loggedUser.uid))
            
           
            } catch (error) {
                throw new Error('Failed to create session')
            }
        }

        if (routeParallax) {
            return redirect('/questionnaire')
        } else {
            if (routeSidebar) {
                mainStore.dispatch(userActions.setUser(loggedUser.uid))
            }
            return redirect('/')
        }
    } catch (error) {
      
        console.error('Error with', error.message)
        throw error
    }
}

export async function logoutAction() {
    const state = mainStore.getState()
    const user = state.userSlice.user
    if (user) {
        try {
            await fetch('http://localhost:5000/api/backend/logout', {
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
