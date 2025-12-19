import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { forwardRef, useImperativeHandle } from 'react'

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

export const Parallax = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        scrollTo: vi.fn(),
    }))

    return <div data-testid="parallax">{props.children}</div>
})

export const ParallaxLayer = ({ children }) => (
    <div data-testid="parallax-layer">{children}</div>
)

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
import ParallaxContainer from './ParallaxContainer.jsx'
import { Provider } from 'react-redux'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

describe('Parallax view testing suite,', () => {
    const mockReduxSlice = {
        switcherSlice: {
            scrollToValue: null,
            navBarLayer: 0,
            routeParallax: false,
        },
    }

    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)

    console.log(mainStore.dispatch.mock.calls)
    beforeEach(() => {
        vi.clearAllMocks()
        sessionStorage.clear()
    })

    //simplyifying the scrolling and dispatch logic inside the actual component

    const getSectionFromOffset_testEnv = (offset) => Math.round(offset)

    const handleScroll_testEnv = (offset, { dispatch, highlightButton }) => {
        const section = getSectionFromOffset_testEnv(offset)
        dispatch({ type: 'switchers/setNavBarLayer', payload: section })
        highlightButton(section)
    }

    it('testing the helper functions above that they would dispatch correct values to redux, to affect another component', () => {
        const mockDispatch_testEnv = vi.fn()
        const mockHighlightButton_testEnv = vi.fn()

        const offset = 2.3

        handleScroll_testEnv(offset, {
            dispatch: mockDispatch_testEnv,
            highlightButton: mockHighlightButton_testEnv,
        })
        expect(mockDispatch_testEnv).toHaveBeenCalledWith({
            type: 'switchers/setNavBarLayer',
            payload: 2,
        })

        expect(mockHighlightButton_testEnv).toHaveBeenCalledWith(2)
    })

    it('sessionstorage being empty, there is no dispatch call on render to open the sidebar', () => {
        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSlice)
        })
        const router = createMemoryRouter(
            [{ path: '/', element: <ParallaxContainer /> }],
            { initialEntries: ['/'] }
        )

        render(
            <Provider store={mainStore}>
                <RouterProvider router={router} />
            </Provider>
        )
        const hereButton = screen.getByLabelText('to-questionnaire')
        fireEvent.click(hereButton)
        expect(mockNavigate).toHaveBeenCalledWith('/questionnaire')
        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'switchers/setRouteParallax',
            payload: true,
        })
    })
})
