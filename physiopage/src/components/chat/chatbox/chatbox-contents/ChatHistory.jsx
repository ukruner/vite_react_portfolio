import React from 'react'
import { useRef, useEffect } from 'react';
import ChatBounceLoader from './ChatBounceLoader';
import { useSelector } from 'react-redux';


export default function ChatHistory({mockScrollRef}) {

    const chatSlice = useSelector(state => state.chatSlice);
    const isChatThinking = useSelector(state => state.switcherSlice.isAiThinking);

    const chatScrollRef = mockScrollRef ?? useRef(null);

    useEffect(() => {

      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;

        
      }, [chatSlice.history]);
    
      return <>
        <div ref={!mockScrollRef ? chatScrollRef : null} className='chat-history-container'>
          {chatSlice.history.map((message, index)=> <p key={index} className={'message ' + message.sender}>{message.text}</p>)}
          
        </div>
        {isChatThinking && <ChatBounceLoader data-testid="bounceloader"/>}
        </>
  
}
