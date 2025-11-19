import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import * as storeModule from '../../../../store/index.js'
import { act } from 'react-dom/test-utils'
import React from 'react'
vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
}))

vi.mock('../../../../store/index.js', () => ({
    default: {
        dispatch: vi.fn(),
    },
}))

import mainStore from '../../../../store/index.js'
import { useSelector } from 'react-redux'
import ChatForm from './ChatForm'
import { fetchGemini } from './ChatForm'
import { fireEvent } from '@testing-library/react'

describe('ChatForm test suite', () => {
    let result
    const mockRef = { current: { value: 'teststring' } }
    const message = 'teststring'

    beforeAll(async () => {
        global.fetch = vi.fn()
        global.fetch.mockResolvedValue({
            json: async () => 'airesponse',
        })

        result = await fetchGemini(message)

        // vi.clearAllMocks(),
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

    // it("handleSubmit request gets triggered when Enter button is pressed", ()=>{

    // });
    // it("handleSubmit does NOT get triggered with shift+Enter", ()=>{

    // });
    it('placeholder message appears (textRef gets cleared) once user sends the message', () => {
        render(<ChatForm mockString={message} />)
        const textArea = screen.getByPlaceholderText('Your message')

        const button = screen.getByRole('button')
        expect(textArea.value).toBe(message)
        fireEvent.click(button)

        expect(textArea.value).toBe('')
    })

    it('once form submits, a dispatch call to change chatBotOnline, setIsAiThinking is sent as well as dispatch call to update chat history object with user message', async () => {
        vi.useFakeTimers()
        const mockFormRef = vi.fn()

        vi.spyOn(React, 'useRef').mockReturnValue({
            current: {
                childMethod: mockFormRef,
            },
        })
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
    // it("displays response text on screen", ()=>{

    // });
    it('response has an .error object, and then it displays it failed to get a response in the chatbox', async () => {
        global.fetch.mockResolvedValue({
            json: async () => {
                error: 'error'
            },
        })
        result = await fetchGemini(message)
    })
    // it("throws an error if request doesn't succeed at all");
})
