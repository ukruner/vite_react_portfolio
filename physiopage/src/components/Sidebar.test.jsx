import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import * as storeModule from '../store/index.js'

vi.mock('../store/index.js', () => ({
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

const mockNavigate = vi.fn()

export { mockNavigate }
vi.mock(import('react-router-dom'), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

import mainStore from '../store/index.js'
import { useSelector, useDispatch } from 'react-redux'
import {} from '../store/slices/switchers'
import Sidebar from './Sidebar.jsx'
import { Provider } from 'react-redux'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

describe('Sidebar testing suite,', () => {
    const mockReduxSlice = {
        switcherSlice: { isSidebarOpen: false, isRouteSidebar: false },
        userSlice: { user: '' },
    }

    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)

    console.log(mainStore.dispatch.mock.calls)
    beforeEach(() => {
        vi.clearAllMocks()
        sessionStorage.clear()
    });

    
    it('sessionstorage being empty, there is no dispatch call on render to open the sidebar', () => {
        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSlice)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <Sidebar /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        expect(mainStore.dispatch).not.toHaveBeenCalledWith({
            type: 'switchers/setIsSidebarOpen',
            payload: true,
        })
    });
    it('does not display opened sidebar specific classes if isSidebarOpen is false - and visual text content is not visible', () => {
        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSlice)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <Sidebar /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const grandParent = screen.getByLabelText('sidebar-grandparent')
        expect(grandParent).not.toHaveClass('h-full max-h-full')
        const sidebarContainer = screen.getByLabelText('sidebar-container')
        expect(sidebarContainer).not.toHaveClass(
            'h-full max-h-screen opacity-100'
        )
        const sidebarText = screen.getByLabelText('sidebar-text')
        expect(sidebarText).not.toBeVisible()
        const navigateButton = screen.getByLabelText('navigate-register')
        expect(navigateButton).not.toBeVisible()
        const sidebarCloseButton = screen.getByLabelText('sidebar-button')
        expect(sidebarCloseButton).not.toBeVisible()
    })
    it('does display opened sidebar specific classes if isSidebarOpen is true', () => {
        const mockReduxSliceTrue = {
            switcherSlice: { isSidebarOpen: true, isRouteSidebar: false },
            userSlice: { user: '' },
        }

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSliceTrue)
        })

        const router = createMemoryRouter(
            [{ path: '/', element: <Sidebar /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const grandParent = screen.getByLabelText('sidebar-grandparent')
        expect(grandParent).toHaveClass('h-full max-h-full')
        const sidebarContainer = screen.getByLabelText('sidebar-container')
        expect(sidebarContainer).toHaveClass('h-full max-h-screen opacity-100')
        const sidebarText = screen.getByLabelText('sidebar-text')
        expect(sidebarText).toBeVisible()
        const navigateButton = screen.getByLabelText('navigate-register')
        expect(navigateButton).toBeVisible()
        const sidebarCloseButton = screen.getByLabelText('sidebar-button')
        expect(sidebarCloseButton).toBeVisible()
    })
    it('does display useful content links if the user is logged in and sidebar is open', () => {
        const mockReduxSliceTrue = {
            switcherSlice: { isSidebarOpen: true, isRouteSidebar: false },
            userSlice: { user: 'user' },
        }

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSliceTrue)
        })

        const router = createMemoryRouter(
            [{ path: '/', element: <Sidebar /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const usefulLinksDiv = screen.getByLabelText('useful-links')
        expect(usefulLinksDiv).toBeVisible()
    })

    it('does send a dispatch call to close the sidebar if cross button is pressed.', () => {
        const mockReduxSliceTrue = {
            switcherSlice: { isSidebarOpen: true, isRouteSidebar: false },
            userSlice: { user: '' },
        }

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSliceTrue)
        })

        const router = createMemoryRouter(
            [{ path: '/', element: <Sidebar /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const sidebarCloseButton = screen.getByLabelText('sidebar-button')
        fireEvent.click(sidebarCloseButton)
        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'switchers/setIsSidebarOpen',
            payload: false,
        })
    })
    it('does send a dispatch call to close the sidebar if cross button is pressed, and navigates to /auth', () => {
        const mockReduxSliceTrue = {
            switcherSlice: { isSidebarOpen: true, isRouteSidebar: false },
            userSlice: { user: '' },
        }

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSliceTrue)
        })

        const router = createMemoryRouter(
            [{ path: '/', element: <Sidebar /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const navigateButton = screen.getByLabelText('navigate-register')
        fireEvent.click(navigateButton)
        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'switchers/setRouteSidebar',
            payload: true,
        })
        expect(mockNavigate).toHaveBeenCalledWith('/auth')
    })
    it('does display opened sidebar specific classes if isSidebarOpen is true', () => {
        const mockReduxSliceTrue = {
            switcherSlice: { isSidebarOpen: true, isRouteSidebar: false },
            userSlice: { user: '' },
        }

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSliceTrue)
        })

        const router = createMemoryRouter(
            [{ path: '/', element: <Sidebar /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const grandParent = screen.getByLabelText('sidebar-grandparent')
        expect(grandParent).toHaveClass('h-full max-h-full')
        const sidebarContainer = screen.getByLabelText('sidebar-container')
        expect(sidebarContainer).toHaveClass('h-full max-h-screen opacity-100')
        const sidebarText = screen.getByLabelText('sidebar-text')
        expect(sidebarText).toBeVisible()
        const navigateButton = screen.getByLabelText('navigate-register')
        expect(navigateButton).toBeVisible()
        const sidebarCloseButton = screen.getByLabelText('sidebar-button')
        expect(sidebarCloseButton).toBeVisible()
    })
    it('does on render set the sidebar to true and opens it, if sessionStorage states it should be open.', () => {
        sessionStorage.setItem('sidebarOpen', 'true')
        const sidebarSession = sessionStorage.getItem('sidebarOpen')
        expect(sidebarSession).toBe('true')
        const mockReduxSliceTrue = {
            switcherSlice: { isSidebarOpen: true, isRouteSidebar: false },
            userSlice: { user: 'user' },
        }

        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSliceTrue)
        })

        const router = createMemoryRouter(
            [{ path: '/', element: <Sidebar /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'switchers/setIsSidebarOpen',
            payload: true,
        })

        const grandParent = screen.getByLabelText('sidebar-grandparent')
        expect(grandParent).toHaveClass('h-full max-h-full')
        const sidebarContainer = screen.getByLabelText('sidebar-container')
        expect(sidebarContainer).toHaveClass('h-full max-h-screen opacity-100')
    })
})
