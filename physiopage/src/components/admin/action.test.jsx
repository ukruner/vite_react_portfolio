import { vi } from 'vitest'

import * as storeModule from '../../store/index.js'

vi.mock('../../store/index.js', () => ({
    default: {
        getState: vi.fn(() => ({
            marqueeSign: {},
            switcherSlice: {
                routeSidebar: false,
                routeParallax: false,
                routeHeader: false,
            },
            chatSlice: {},
            userSlice: {},
        })),
        dispatch: vi.fn(),
        subscribe: vi.fn(),
    },
}))
vi.mock(import('react-redux'), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useDispatch: vi.fn(),
    }
})

vi.mock('firebase/auth', async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        signInWithEmailAndPassword: vi.fn(() =>
            Promise.resolve({
                user: {
                    uid: 'mock-id',
                    getIdToken: vi.fn(() => Promise.resolve('fake-token')),
                },
            })
        ),
        getAuth: vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        ),
        createUserWithEmailAndPassword: vi.fn(),
    }
})

import { describe, it, expect } from 'vitest'
import mainStore from '../../store/index.js'
import { useDispatch } from 'react-redux'
import { action } from './Authentication.jsx'
import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'

describe('action function testing suite', () => {
    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)
    console.log(mainStore.dispatch.mock.calls)

    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        })
    )
    beforeEach(() => {
        vi.clearAllMocks()
        sessionStorage.clear()
        mainStore.getState.mockReturnValue({
            marqueeSign: {},
            switcherSlice: {
                routeSidebar: false,
                routeParallax: false,
                routeHeader: false,
            },
            chatSlice: {},
            userSlice: {},
        })
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        })
    })
    
    

    it('redirects to / if the response comes back fine, meaning that log in was successful', async () => {
        signInWithEmailAndPassword.mockResolvedValue({
            user: {
                uid: 'mock-id',
                getIdToken: vi.fn().mockResolvedValue('fake-token'),
            },
        })
        const formData = new FormData()
        formData.append('email', 'test@example.com')
        formData.append('password', 'secret')
        formData.append('rememberMe', 'on')

        const request = new Request(
            'http://localhost:5000/api/backend/sessionLogin',
            {
                method: 'POST',
                body: formData,
            }
        )

        const response = await action({ request })

        expect(response.status).toBe(302)
        expect(response.headers.get('Location')).toBe('/')
        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'userSlice/setUser',
            payload: 'mock-id',
        })
    })
    it('returns an error response if session creation fails after login succeeds', async () => {
        signInWithEmailAndPassword.mockResolvedValue({
            user: {
                uid: 'mock-id',
                getIdToken: vi.fn().mockResolvedValue('fake-token'),
            },
        })
        global.fetch.mockResolvedValue({
            ok: false,
            status: 500,
            json: () => Promise.resolve({}),
        })
        const formData = new FormData()
        formData.append('email', 'test@example.com')
        formData.append('password', 'secret')
        formData.append('rememberMe', 'on')

        const request = new Request(
            'http://localhost:5000/api/backend/sessionLogin',
            {
                method: 'POST',
                body: formData,
            }
        )

        const response = await action({ request })
        const body = await response.json()

        expect(response.status).toBe(500)
        expect(body.message).toBe('Failed to create session.')
    })

    it('redirects to /questionnaire if the response comes back fine, meaning that log in was successful', async () => {
        mainStore.getState.mockReturnValue({
            switcherSlice: { ...mainStore.switcherSlice, routeParallax: true },
            ...mainStore.getState,
        })

        signInWithEmailAndPassword.mockResolvedValue({
            user: {
                uid: 'mock-id',
                getIdToken: vi.fn().mockResolvedValue('fake-token'),
            },
        })

        const formData = new FormData()
        formData.append('email', 'test@example.com')
        formData.append('password', 'secret')
        formData.append('rememberMe', 'on')

        const request = new Request(
            'http://localhost:5000/api/backend/sessionLogin',
            {
                method: 'POST',
                body: formData,
            }
        )

        const response = await action({ request })

        expect(response.status).toBe(302)
        expect(response.headers.get('Location')).toBe('/questionnaire')
        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'userSlice/setUser',
            payload: 'mock-id',
        })
    })
    it('returns code 422 and message that password must be at least 6 characters, meaning that log in was unsuccessful', async () => {
        const formData = new FormData()
        formData.append('email', 'test@example.com')
        formData.append('password', 'short')
        formData.append('rememberMe', 'on')

        const request = new Request(
            'http://localhost:5000/api/backend/sessionLogin',
            {
                method: 'POST',
                body: formData,
            }
        )

        const response = await action({ request })
        const body = await response.json()
        expect(response.status).toBe(422)
        expect(body.message).toBe(
            'Password must be at least 6 characters long.'
        )
        expect(mainStore.dispatch).not.toHaveBeenCalled()
    })
    it("returns code 422 and message of 'unsupported mode' meaning that log in was unsuccessful", async () => {
        const formData = new FormData()
        formData.append('email', 'test@example.com')
        formData.append('password', 'short')
        formData.append('rememberMe', 'on')

        const request = new Request(
            'http://localhost:5000/api/backend/sessionLogin?mode=mock',
            {
                method: 'POST',
                body: formData,
            }
        )
        try {
            await action({ request })
            throw new Error('Action did not throw expected json')
        } catch (response) {
            const body = await response.json()
            expect(response.status).toBe(422)
            expect(body.message).toBe('Unsupported mode.')
            expect(mainStore.dispatch).not.toHaveBeenCalled()
        }
    })
    it('registers the user with provided parameters, if the mode=signup', async () => {
        createUserWithEmailAndPassword.mockResolvedValue({
            user: { uid: 'mock-id' },
        })

        const formData = new FormData()
        formData.append('email', 'test@example.com')
        formData.append('password', 'secret')
        formData.append('rememberMe', 'on')

        const request = new Request(
            'http://localhost:5000/api/backend/sessionLogin?mode=signup',
            {
                method: 'POST',
                body: formData,
            }
        )

        const response = await action({ request })
        expect(response.status).toBe(302)
        expect(response.headers.get('Location')).toBe('/auth?mode=login')
    })
    it('returns an error if email trying to be registered is already in use', async () => {
        sessionStorage.removeItem('signupCreated')
        createUserWithEmailAndPassword.mockRejectedValue({
            code: 'auth/email-already-in-use',
        })
        const formData = new FormData()
        formData.append('email', 'test@example.com')
        formData.append('password', 'secret')
        formData.append('rememberMe', 'on')

        const request = new Request(
            'http://localhost:5000/api/backend/sessionLogin?mode=signup',
            {
                method: 'POST',
                body: formData,
            }
        )

        const response = await action({ request })
        const body = await response.json()
        expect(response.status).toBe(422)
        expect(body.message).toBe('Email already exists')
    })
    it('returns an error if there is an unspecified error during registering', async () => {
        sessionStorage.removeItem('signupCreated')
        createUserWithEmailAndPassword.mockRejectedValue({
            error: 'Signup failed',
        })
        const formData = new FormData()
        formData.append('email', 'test@example.com')
        formData.append('password', 'secret')
        formData.append('rememberMe', 'on')

        const request = new Request(
            'http://localhost:5000/api/backend/sessionLogin?mode=signup',
            {
                method: 'POST',
                body: formData,
            }
        )

        try {
            await action({ request })
            throw new Error('Action did not throw an error')
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('Signup failed')
        }
    })

    it('action function rethrows unexpected errors', async () => {

          vi.spyOn(console, 'error').mockImplementation(() => {});
        sessionStorage.removeItem('signupCreated')

        createUserWithEmailAndPassword.mockRejectedValue({
            code: 'auth/unexpected-error',
            message: 'Something went wrong',
        })
        const formData = new FormData()
        formData.append('email', 'test@example.com')
        formData.append('password', 'secret')
        formData.append('rememberMe', 'on')

        const request = new Request(
            'http://localhost:5000/api/backend/sessionLogin?mode=signup',
            {
                method: 'POST',
                body: formData,
            }
        )

        await expect(action({ request })).rejects.toThrow('Signup failed')
    })
})
