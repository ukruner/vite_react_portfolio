import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import * as storeModule from '../../store/index.js'

vi.mock('../../store/index.js', () => ({
    default: {
        getState: () => ({
            marqueeSign: {},
            switcherSlice: {},
            chatSlice: {},
            userSlice: {},
        }),
        subscribe: vi.fn(),
        dispatch: vi.fn(),
    },
}))

vi.mock(import('react-redux'), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useSelector: vi.fn(),
        useDispatch: vi.fn(),
    }
})

vi.mock(import('react-router-dom'), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useNavigation: vi.fn(),
        useSearchParams: vi.fn(),
        useActionData: vi.fn(),
    }
})

import mainStore from '../../store/index.js'
import { useSelector, useDispatch } from 'react-redux'
import {} from '../../store/slices/switchers'
import Authentication from './Authentication.jsx'
import { Provider } from 'react-redux'
import {
    createMemoryRouter,
    RouterProvider,
    useNavigation,
    useSearchParams,
    useActionData,
} from 'react-router-dom'

describe('Authentication form testing suite,', () => {
    const mockReduxUserSlice = {
        userSlice: {
            user: ''
        },
        switcherSlice: {
            routeSidebar: false,
            routeParallax: false,
            routeHeader: false,
        },
    }

    useNavigation.mockReturnValue({
        state: '',
        location: null,
        formData: null,
        formMethod: null,
        formAction: null,
    })

    useSearchParams.mockReturnValue([
        new URLSearchParams({ mode: '' }),
        vi.fn(),
    ])

    useActionData.mockReturnValue(null)

    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)

    console.log(mainStore.dispatch.mock.calls)
    beforeEach(() => {
        vi.clearAllMocks()
    })
    it("renders the AuthenticationForm component if user is false", ()=>{
        useSelector.mockImplementation((selectorFn) => {
                    return selectorFn(mockReduxUserSlice)
                })
                const router = createMemoryRouter(
            [{ path: '/', element: <Authentication /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        expect(screen.getByLabelText('auth-form-container')).toBeInTheDocument();
    });
    it("renders ErrorPage instead if the user already exists / is logged in - as no auth is required", ()=>{
         useSelector.mockImplementation((selectorFn) => {
                    return selectorFn({...mockReduxUserSlice, userSlice: {user: 'userObject'}})
                })
                const router = createMemoryRouter(
            [{ path: '/', element: <Authentication /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        expect(screen.queryByLabelText('auth-form-container')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('error-container')).toBeInTheDocument();

    });
    });