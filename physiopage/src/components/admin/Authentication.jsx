import { json, redirect } from 'react-router-dom'
import AuthenticationForm from './AuthenticationForm'
import mainStore from '../../store'
import ErrorPage from '../error/Error'
import { getAuthToken } from '../../utils/auth'

export default function Authentication() {
    const token = getAuthToken()

    return (
        <>
            {!token ? (
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

export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams

    const mode = searchParams.get('mode') || 'login'
    const state = mainStore.getState()
    const routeParallax = state.switcherSlice.routeParallax
    const routeSidebar = state.switcherSlice.routeSidebar

    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Unsupported mode.' }, { status: 422 })
    }
    const data = await request.formData()

    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    }

    const response = await fetch('http://localhost:8080/' + mode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
    })

    if (response.status === 422 || response.status === 401) {
        return response
    }

    if (!response.ok) {
        throw json({ message: 'could not authenticate user.' }, { status: 500 })
    }

    const resData = await response.json()

    const token = resData.token

    localStorage.setItem('token', token)

    if (routeParallax) {
        return redirect('/questionnaire')
    } else {
        if (routeSidebar) {
            sessionStorage.setItem('sidebarOpen', 'true')
        }
        return redirect('/')
    }
}
