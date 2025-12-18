import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import * as storeModule from '../../store/index.js'

vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
}))

vi.mock('../../store/index.js', () => ({
    default: {
        dispatch: vi.fn(),
    },
}))

import mainStore from '../../store/index.js'
import { useSelector, useDispatch } from 'react-redux'
import HeaderNavbar from './HeaderNavbar.jsx'

describe('Headernavbar testing suite,', () => {
    const navArray = ['Intro', 'Why', 'Challenges', 'Our mission', 'Outcome']

    const mockReduxSlice = { switcherSlice: { scrollToValue: null } }

    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)

    console.log(mainStore.dispatch.mock.calls)

    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockReduxSlice)
    })

    it('displays side buttons, which need to be present to create Google Chrome tab like visual for the peripheral buttons', () => {
        render(<HeaderNavbar></HeaderNavbar>)
        expect(screen.getByLabelText('left-side')).toBeInTheDocument()
        expect(screen.getByLabelText('right-side')).toBeInTheDocument()
    })
    it('displays buttons with the names from the array provided', () => {
        render(<HeaderNavbar></HeaderNavbar>)
        navArray.map((element) => {
            expect(screen.getByText(element)).toBeInTheDocument()
        })
    })
    it('sends a dispatch call to set scroll value if one of the clickable buttons are pressed', () => {
        render(<HeaderNavbar></HeaderNavbar>)
        navArray.forEach((element, index) => {
            const mappedButton = screen.getByText(element)
            fireEvent.click(mappedButton)
            expect(mainStore.dispatch).toHaveBeenCalledWith({
                type: 'switchers/setScrollToValue',
                payload: index,
            })
        })
    })
    it('changes classes of the clicked button and adjacent ones (including parent containers), in order to mimic curved edges.', () => {
        render(<HeaderNavbar></HeaderNavbar>)
        navArray.forEach((element, index) => {
            const mappedButton = screen.getByText(element)
            fireEvent.click(mappedButton)
            expect(mappedButton).toHaveClass('navbar-active-button')
            const parentContainer = mappedButton.closest('div')
            const parentRight = parentContainer.nextElementSibling
            expect(parentRight).toHaveClass('side-button-wrapper')
            const parentLeft = parentContainer.previousElementSibling
            expect(parentLeft).toHaveClass('side-button-wrapper')
            if (index === 0) {
                const leftEdgeButton = screen.getByLabelText('left-side')
                expect(leftEdgeButton).toHaveClass('navbar-left-button')
                const rightButton = screen.getByText(navArray[index + 1])
                expect(rightButton).toHaveClass('navbar-right-button')
            } else if (index === navArray.length - 1) {
                const rightEdgeButton = screen.getByLabelText('right-side')
                expect(rightEdgeButton).toHaveClass('navbar-right-button')
                const leftButton = screen.getByText(navArray[index - 1])
                expect(leftButton).toHaveClass('navbar-left-button')
            } else {
                const rightButton = screen.getByText(navArray[index + 1])
                expect(rightButton).toHaveClass('navbar-right-button')
                const leftButton = screen.getByText(navArray[index - 1])
                expect(leftButton).toHaveClass('navbar-left-button')
            }
        })
    })
    it('does only have one clicked button, other buttons are unclicked.', () => {
        render(<HeaderNavbar></HeaderNavbar>)
        navArray.forEach((element) => {
            const mappedButton = screen.getByText(element)
            fireEvent.click(mappedButton)
            const leftEdgeButton = screen.getByLabelText('left-side')
            expect(leftEdgeButton).not.toHaveClass('navbar-active-button')
            const rightEdgeButton = screen.getByLabelText('right-side')
            expect(rightEdgeButton).not.toHaveClass('navbar-active-button')
            navArray.forEach((button) => {
                if (button !== element) {
                    const unclickedButton = screen.getByText(button)
                    expect(unclickedButton).not.toHaveClass(
                        'navbar-active-button'
                    )
                }
            })
        })
    })
})
