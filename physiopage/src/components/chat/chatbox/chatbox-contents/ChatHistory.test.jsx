import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
}))

import { useSelector, useDispatch } from 'react-redux'
import ChatHistory from './ChatHistory'

describe('ChatHistory code testing', () => {
    const mockReduxSlice = {
        chatSlice: {
            history: [
                { sender: 'ai', text: 'Mock 1' },
                { sender: 'user', text: 'Mock 2' },
            ],
        },
        switcherSlice: {
            isAiThinking: false,
        },
    }
    const mockRef = { current: { scrollHeight: 500, scrollTop: 0 } }

    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)

    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockReduxSlice)
    })

    it('chat history renders if array is populated', () => {
        render(<ChatHistory mockScrollRef={mockRef} />)
        expect(screen.getByText('Mock 2')).toBeInTheDocument()
    })

    it('bounceloader does not render if boolean is false', () => {
        render(<ChatHistory mockScrollRef={mockRef} />)
        expect(screen.queryByTestId('bounceloader')).not.toBeInTheDocument()
    })
    it('bounceloader does render if boolean is true', () => {
        const mockAiTrue = {
            ...mockReduxSlice,
            switcherSlice: {
                isAiThinking: true,
            },
        }
        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockAiTrue)
        })
        render(<ChatHistory mockScrollRef={mockRef} />)

        expect(screen.getByTestId('bounceloader')).toBeInTheDocument()
    })
    it('scrolls chat box to bottom when new message added', () => {
        const mockEmptyChat = {
            chatSlice: {
                history: [],
            },
            ...mockReduxSlice,
        }
        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockEmptyChat)
        })
        render(<ChatHistory mockScrollRef={mockRef} />)
        useSelector.mockImplementation((selectorFn) => {
            return selectorFn(mockReduxSlice)
        })
        render(<ChatHistory mockScrollRef={mockRef} />)

        expect(mockRef.current.scrollTop).toBe(mockRef.current.scrollHeight)
    })
})
