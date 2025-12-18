import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import * as storeModule from '../../../../store/index.js'
import { act } from 'react-dom/test-utils'
import React from 'react'
// import Response from 'node-fetch';

vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
}))

vi.mock('../../../../store/index.js', () => ({
    default: {
        dispatch: vi.fn(),
    },
}))

window.fetch = vi.fn()

import mainStore from '../../../../store/index.js'
import { useSelector } from 'react-redux'
import ChatForm from './ChatForm'
import { fetchGemini } from './ChatForm'
import { fireEvent } from '@testing-library/react'

describe('ChatForm test suite', () => {
    let result
    // const mockRef = { current: { value: 'teststring' } }
    const message = 'teststring'

    const mockFormRef = vi.fn()

    vi.spyOn(React, 'useRef').mockReturnValue({
        current: {
            childMethod: mockFormRef,
        },
    })

    beforeEach(() => {
        window.fetch.mockResolvedValueOnce({ json: async () => 'airesponse' })
    })

    beforeAll(async () => {
        console.log(mainStore.dispatch.mock.calls)
    })
    const mockStore = {
        switcherSlice: {
            chatBotOnline: false,
        },
    }

    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockStore)
    })

    test('pressing Enter (without Shift) calls handleSubmit', () => {
        const handleSubmitMock = vi.fn((e) => e.preventDefault())
        const { getByLabelText } = render(
            <ChatForm
                mockString={message}
                handleSubmitMock={handleSubmitMock}
            />
        )

        const input = getByLabelText('chat-textarea')

        fireEvent.keyDown(input, { key: 'Enter', shiftKey: false })

        expect(handleSubmitMock).toHaveBeenCalled()
    })

    test('pressing Shift+Enter does NOT call handleSubmit', () => {
        const handleSubmitMock = vi.fn((e) => e.preventDefault())
        const { getByLabelText } = render(
            <ChatForm
                mockString={message}
                handleSubmitMock={handleSubmitMock}
            />
        )

        const input = getByLabelText('chat-textarea')

        fireEvent.keyDown(input, { key: 'Enter', shiftKey: true })

        expect(handleSubmitMock).not.toHaveBeenCalled()
    })
    it('placeholder message appears (textRef gets cleared) once user sends the message', () => {
        render(<ChatForm mockString={message} />)
        const textArea = screen.getByPlaceholderText('Your message')

        const button = screen.getByRole('button')
        expect(textArea.value).toBe(message)
        fireEvent.click(button)

        expect(textArea.value).toBe('')
    })

    it('once form submits, a dispatch call to change chatBotOnline, setIsAiThinking is sent as well as dispatch call to update chat history object with user message.', async () => {
        vi.useFakeTimers()

        render(<ChatForm mockString={message} />)
        const form = screen.getByLabelText('formsubmit')
        fireEvent.submit(form)

        await vi.runAllTimersAsync()

        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'switchers/setIsAiThinking',
            payload: true,
        })
        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'chatSlice/updateHistory',
            payload: { sender: 'user', text: message },
        })

        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'switchers/setChatBotOnline',
            payload: true,
        })
        vi.clearAllTimers()
    })
    it('received data equals to expected value', async () => {
        result = await fetchGemini(message)

        expect(result).toEqual('airesponse')
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:5000/api/backend/gemini',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                }),
            }
        )
    })
    it('Dispatch call to update chat history is made with the response received, if there is no response.error', async () => {
        vi.useFakeTimers()

        render(<ChatForm mockString={message} />)
        const form = screen.getByLabelText('formsubmit')
        fireEvent.submit(form)
        await vi.runAllTimersAsync()

        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'chatSlice/updateHistory',
            payload: { sender: 'ai', text: 'airesponse' },
        })
        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'switchers/setIsAiThinking',
            payload: false,
        })
        vi.clearAllTimers()
    })
    it('error is returned if response has an .error object', async () => {
        window.fetch.mockReset()
        window.fetch.mockResolvedValueOnce({
            json: async () => ({ error: 'error' }),
        })
        const result = await fetchGemini(message)
        expect(result).toEqual({ error: 'error' })
    })

    it('response has an .error object, and then it fires a dispatch that it failed to get a response from Gemini', async () => {
        vi.useFakeTimers()
        window.fetch.mockReset()
        window.fetch.mockResolvedValueOnce({
            json: async () => ({ error: 'error' }),
        })
        render(<ChatForm mockString={message} />)
        const form = screen.getByLabelText('formsubmit')
        fireEvent.submit(form)
        await vi.runAllTimersAsync()

        // expect(result2).toEqual(result2)
        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'chatSlice/updateHistory',
            payload: {
                sender: 'ai',
                text: 'Failed to get a response from Gemini, check your connection or settings',
            },
        })
        expect(mainStore.dispatch).toHaveBeenCalledWith({
            type: 'switchers/setIsAiThinking',
            payload: false,
        })
        vi.clearAllTimers()
    })
})
