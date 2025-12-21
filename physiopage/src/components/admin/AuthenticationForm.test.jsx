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
import AuthenticationForm from './AuthenticationForm.jsx'
import { Provider } from 'react-redux'
import {
    createMemoryRouter,
    RouterProvider,
    useNavigation,
    useSearchParams,
    useActionData,
} from 'react-router-dom'

describe('Authentication form testing suite,', () => {
    const mockReduxSlice = {
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
    it('displays all the form headers when rendered', () => {
        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSlice)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <AuthenticationForm /> }],
            { initialEntries: ['/'] }
        )

        useActionData.mockReturnValue({
            errors: '404'
        });

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )

        expect(screen.getByText('Email')).toBeInTheDocument()
        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByText('Remember me')).toBeInTheDocument()
        expect(screen.getByText('Back to home')).toBeInTheDocument()
        expect(screen.queryByText('submitting...')).not.toBeInTheDocument()
        const routeParallaxText = screen.queryByLabelText('route-parallax-text')
        const routeSidebarText = screen.queryByLabelText('route-sidebar-text')
        const routeHeaderText = screen.queryByLabelText('route-header-text')
        expect(routeSidebarText).not.toBeInTheDocument()
        expect(routeHeaderText).not.toBeInTheDocument()
        expect(routeParallaxText).not.toBeInTheDocument()
        const headerFormText = screen.getByLabelText('header-form-text')
        expect(headerFormText).toHaveTextContent('Log in or create new user')
        const finalButton = screen.getByLabelText('final-button')
        expect(finalButton).toHaveTextContent('Login');
        expect(screen.queryByLabelText('error-message')).not.toBeInTheDocument();
        expect(screen.getByText('Create new user')).toBeInTheDocument()
    })
    it("displays 'To access the form, please' if route parallax is true", () => {
        const mockReduxWithParallax = {
            switcherSlice: { ...mockReduxSlice, routeParallax: true },
        }
        useSearchParams.mockReturnValue([
            new URLSearchParams({ mode: 'login' }),
            vi.fn(),
        ])

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxWithParallax)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <AuthenticationForm /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const routeParallaxText = screen.queryByLabelText('route-parallax-text')
        const routeSidebarText = screen.queryByLabelText('route-sidebar-text')
        const routeHeaderText = screen.queryByLabelText('route-header-text')
        expect(routeParallaxText).toBeInTheDocument()
        expect(routeSidebarText).not.toBeInTheDocument()
        expect(routeHeaderText).not.toBeInTheDocument()
    })
    it("displays 'To access useful content, please' if route parallax is true", () => {
        const mockReduxWithHeader = {
            switcherSlice: { ...mockReduxSlice.switcherSlice, routeHeader: true },
        }
        useSearchParams.mockReturnValue([
            new URLSearchParams({ mode: 'login' }),
            vi.fn(),
        ])

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxWithHeader)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <AuthenticationForm /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const routeParallaxText = screen.queryByLabelText('route-parallax-text')
        const routeSidebarText = screen.queryByLabelText('route-sidebar-text')
        const routeHeaderText = screen.queryByLabelText('route-header-text')
        expect(routeHeaderText).toBeInTheDocument()
        expect(routeSidebarText).not.toBeInTheDocument()
        expect(routeParallaxText).not.toBeInTheDocument()
    })
    it("displays 'To access links on health related content, please' if route parallax is true", () => {
        const mockReduxWithSidebar = {
            switcherSlice: { ...mockReduxSlice.switcherSlice, routeSidebar: true },
        }
        useSearchParams.mockReturnValue([
            new URLSearchParams({ mode: 'login' }),
            vi.fn(),
        ])

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxWithSidebar)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <AuthenticationForm /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const routeParallaxText = screen.queryByLabelText('route-parallax-text')
        const routeSidebarText = screen.queryByLabelText('route-sidebar-text')
        const routeHeaderText = screen.queryByLabelText('route-header-text')
        expect(routeSidebarText).toBeInTheDocument()
        expect(routeHeaderText).not.toBeInTheDocument()
        expect(routeParallaxText).not.toBeInTheDocument()
    })
    it("displays 'submitting...' if navigation state is 'submitting'", () => {
        useNavigation.mockReturnValue({
            state: 'submitting',
            location: null,
            formData: null,
            formMethod: null,
            formAction: null,
        })

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSlice)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <AuthenticationForm /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )

        expect(screen.getByText('submitting...')).toBeInTheDocument()
    })

    it("when useSearchParams mode is at 'signup', then Save and Back to Home buttons display, Login and Create new user buttons do not", () => {
        useSearchParams.mockReturnValue([
            new URLSearchParams({ mode: 'signup' }),
            vi.fn(),
        ])

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSlice)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <AuthenticationForm /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )

        expect(screen.getByText('Back to home')).toBeInTheDocument()
        
        const finalButton = screen.getByLabelText('final-button')
        expect(finalButton).toHaveTextContent('Save')
        const headerFormText = screen.getByLabelText('header-form-text')
        expect(headerFormText).toHaveTextContent(
            'Press Save to register your user'
        )
        expect(screen.queryByText('Create new user')).not.toBeInTheDocument()
    })
    it('displays an error if data= error object exists, and renders the content', () => {
        useActionData.mockReturnValue({
            errors: '404',
            message: 'email already exists'
        });

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSlice)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <AuthenticationForm /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )

        const errorMessageElement = screen.getByLabelText('error-message');
        expect(errorMessageElement).toHaveTextContent('email already exists');

    })
})
