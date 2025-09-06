import { json, redirect } from 'react-router-dom'
import AuthenticationForm from './AuthenticationForm'
import mainStore from '../../store'
import { userActions } from '../../store/slices/userSlice'
import ErrorPage from '../error/Error'
import { getUserObject } from '../../utils/auth'
import {isValidText} from '../../utils/validation'
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
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
};

const app2 = initializeApp(firebaseConfig)
const auth = getAuth(app2)

export default function Authentication() {
    const user = getUserObject();

    return (
        <>
            {!user ? (
                <div className="relative z-0 flex h-screen w-screen items-center justify-center overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/patches_of_clouds_and_light_blue_sky_4k_5k_hd_light_blue.jpg')] bg-cover bg-center opacity-30" />
                    <AuthenticationForm />
                </div>
            ) : (
                <ErrorPage loggedIn={true}></ErrorPage>
            )}
        </>
    )
}

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

        const email = data.get('email')
        const password = data.get('password');

  

  if (!isValidText(password, 6)) {
        return json({ message: "Password must be at least 6 characters long." }, { status: 422 });
  }


        if (mode === 'signup') {
            try {const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            console.log('User registered with uid:', userCredential.user)
            return redirect('/auth?mode=login')}
            catch (error) {
                 if (error.code === "auth/email-already-in-use") {
                 
      return json({ message: "Email already exists" }, { status: 422 });
    }
    return json({ message: "Signup failed" }, { status: 500 });
  }
  }
            
        
        if (mode === 'login') {
            console.log(auth, email, password)
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const loggedUser = userCredential.user;

            console.log('User logged in:', loggedUser.uid)
            mainStore.dispatch(userActions.setUser(loggedUser.uid));

                if (routeParallax) {
                    return redirect('/questionnaire')
                } else {
                if (routeSidebar) {
                    mainStore.dispatch(userActions.setUser(loggedUser.uid));
                    }
        return redirect('/')
    }
         
        }
    } catch (error) {
        console.error('Error with', mode, error.message)
        throw error
    }
}

export async function logoutAction(){
    const state = mainStore.getState();
  const user = state.userSlice.user;
    if(user){

    try {
    
    await signOut(auth);
    mainStore.dispatch(userActions.clearUser())
    console.log('logout logic executing');
    return redirect('/')}

    catch (error) {
        console.error("Error logging out:", error);
    }};
}

