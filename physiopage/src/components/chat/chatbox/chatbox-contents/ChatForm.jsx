import React from 'react'
import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import mainStore from '../../../../store'
import { switcherActions } from '../../../../store/slices/switchers'
import { chatActions } from '../../../../store/slices/chatSlice'
import { fetchGemini } from './geminiApi'


export default function ChatForm({ mockString, handleSubmitMock }) {
    const textRef = useRef(null)

    useEffect(() => {
        if (mockString && textRef.current) {
            textRef.current.value = mockString
        }
    }, [mockString]);

    async function handleSubmit(e) {
        const messageText = mockString ?? textRef.current.value

        if (messageText.length > 0) {
            e.preventDefault()
            mainStore.dispatch(switcherActions.setIsAiThinking(true))
            mainStore.dispatch(
                chatActions.updateHistory({ sender: 'user', text: messageText })
            )
            setTimeout(() => {
                mainStore.dispatch(switcherActions.setChatBotOnline(true))
            }, 1000)

            try {
               
                textRef.current.value = ''
                const response = await fetchGemini(messageText)
                

                if (!response.error) {
                    mainStore.dispatch(
                        chatActions.updateHistory({
                            sender: 'ai',
                            text: response,
                        })
                    )
                    mainStore.dispatch(switcherActions.setIsAiThinking(false))
                }
             
                else {
                    
                    setTimeout(() => {
                        console.log(response.error)

                        if (response.status === 429) {
                            mainStore.dispatch(
                            chatActions.updateHistory({
                                sender: 'ai',
                                text: 
                                    response.error
                            })
                        )}
                        else if (response.status === 401){
                             mainStore.dispatch(
                            chatActions.updateHistory({
                                sender: 'ai',
                                text: 
                                response.error
                            })
                        )
                        }
                        else{
                        mainStore.dispatch(
                            chatActions.updateHistory({
                                sender: 'ai',
                                text: 
                                'Failed to get a response from Gemini, check your connection or settings'
                            })
                        )
                        
                    }   mainStore.dispatch(switcherActions.setIsAiThinking(false))}, 1000)
                }
            } catch (error) {
                throw error
            }
        } else return
    }

    const handleKeyDown = (event) => {
        
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            
            if (handleSubmitMock){
                handleSubmitMock(event);
            }
            else{
            handleSubmit(event)
        }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex" aria-label="formsubmit">
            <div className="chat-textbox-container">
                <textarea
                    ref={textRef}
                    id="chatInput"
                    aria-label="chat-textarea"
                    data-testid='chat-textarea'
                    onKeyDown={handleKeyDown}
                    className="chat-textarea"
                    type="text"
                    placeholder="Your message"
                ></textarea>
            </div>
            <button type="submit" className="chat-submit-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgb(103 199 255)"
                    className="size-10"
                >
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
            </button>
        </form>
    )
}
