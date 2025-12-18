import { vi } from 'vitest'
import * as storeModule from '../../store/index.js'

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

import { render, screen } from '@testing-library/react'
import mainStore from '../../store/index.js'
import { fireEvent } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import AuthBox from './AuthBox'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

describe('AuthBox testing suite,', () => {
    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)

    console.log(mainStore.dispatch.mock.calls)

    beforeEach(() => {
        vi.clearAllMocks()
    })
    it("displays Log in / Sign up button if user doesn't exist. Upon pressing Log in, navigateAuth is called wiht the dispatch call to set routeHeader to true and useNavigate to /auth", () => {
        const mockReduxSlice = {
            userSlice: {
                user: '',
            },
        }
        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSlice)
        })

        const router = createMemoryRouter(
            [{ path: '/', element: <AuthBox /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const navButton = screen.getByRole('button', {
            name: 'Log in/ Sign up',
        })

        expect(navButton).toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: 'Log out' })
        ).not.toBeInTheDocument()
        fireEvent.click(navButton)

        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'switchers/setRouteHeader',
            payload: true,
        })
        expect(mockNavigate).toHaveBeenCalledWith('/auth')
    })

    it('displays Log out button if user does exist.', () => {
        const mockReduxSlice = {
            userSlice: {
                user: 'user',
            },
        }
        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSlice)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <AuthBox /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        expect(
            screen.getByRole('button', { name: 'Log out' })
        ).toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: 'Log in/ Sign up' })
        ).not.toBeInTheDocument()
    })
})
