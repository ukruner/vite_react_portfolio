import React from 'react'
import ChatImageSvg from './ChatImageSvg'
import mainStore from '../../../../store'
import { switcherActions } from '../../../../store/slices/switchers'
import { useSelector } from 'react-redux'

export default function GlobalChatButton() {

const chatOpen = useSelector((state) => state.switcherSlice.isChatBoxOpen)

    function openChat() {
        
        if (!chatOpen){
        mainStore.dispatch(switcherActions.setChatBoxOpen(true))}
        else {
         mainStore.dispatch(switcherActions.setChatBoxOpen(false))   
        }
    }
  return (
                    <button
                        onClick={openChat}
                        className="chat-navigation-button fixed bottom-0 right-0 mb-4 mr-5"
                        aria-label='globalchatbutton'
                    >
                        <ChatImageSvg />
                    </button>
  )
}
