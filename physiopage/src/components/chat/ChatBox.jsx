import React from 'react'
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { switcherActions } from '../../store/slices/switchers';
import { chatActions } from '../../store/slices/chatSlice';
import mainStore from '../../store';

export default function ChatBox() {

      const chatOpen = useSelector(state => state.switcherSlice.isChatBoxOpen);
      const botOnline = useSelector(state => state.switcherSlice.chatBotOnline);
      const chatSlice = useSelector(state => state.chatSlice);
      const isChatThinking = useSelector(state => state.switcherSlice.isAiThinking);

      const textRef = useRef();
      const chatBoxRef = useRef();

      const api_key = import.meta.env.VITE_API_KEY;

      const genAI = new GoogleGenerativeAI(
        api_key
      );

      const [messages, setMessages] = useState(
        []
      )

      const [chatId, setChatId] = useState(null);

      const [scrollTrigger, setScrollTrigger] = useState(0);

      // startchat instead of generatecontent, and switch between grey/green lights of the avatar

      async function handleSubmit(e) {
        if (!botOnline){
          setTimeout(
          () => {mainStore.dispatch(switcherActions.setChatBotOnline())}, 1000);
        }
        e.preventDefault();
        console.log(genAI);
        console.log(import.meta.env.VITE_API_KEY);

        mainStore.dispatch(chatActions.updateHistory({ sender: 'user', text: textRef.current.value }))
        // setMessages(prevMessages => [...prevMessages, { sender: 'user', text: textRef.current.value }])
        //youtube version
        // const newMessages = [...messages, {
        //   text: textRef.current.value,
        //   sender: "user"
        // }];
        // console.log(textRef.current.value)
        
        //gemini version
        mainStore.dispatch(switcherActions.setIsAiThinking());
        const messageText = textRef.current.value;
        if (!messageText) return;

        try {

        textRef.current.value = '';
        const response = await fetch('http://localhost:5000/api/gemini/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              message: messageText,
              chatId: chatId, // Send the chat ID
          }),
      });
      
      const data = await response.json();

      // setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: data.response }]);
      mainStore.dispatch(chatActions.updateHistory({ sender: 'ai', text: data.response }))
      mainStore.dispatch(switcherActions.setIsAiThinking());
      
      if (!chatId) {
        // Store the chat ID if it's a new chat
        mainStore.dispatch(chatActions.setChatId(data.chatId))
        // setChatId(data.chatId);
      }
      
      console.log("chatId in redux:", chatSlice.chatId)

      }

      catch(error) { 

        console.error('Error:', error);

      }}



      const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          handleSubmit(event);
        }
      };


      useEffect(() => {
        
              console.log(chatBoxRef.current.scrollHeight)
              chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        
      }, [chatSlice.history]);

      

  return (
    <div className={`chat-box ~text-xs/lg`}>
        <div className='basis-[25%] w-[100%] p-2 gap-1 bg-blue-1 flex flex-col justify-center items-center'>
            <div className='flex text-center'>Hello, virtual assistant is here to help answer your questions</div>
            <img className='w-10 h-10 ' src={`../${botOnline ? 'avatar - green.png' : 'avatar - grey.png'}`}></img>
            <div>Mariana</div>
        </div>
    
        <div ref={chatBoxRef} className='basis-[55%] mx-3 mt-3 overflow-auto bg-white'>
          {chatSlice.history.map((message, index)=> <p key={index} className={'message ' + message.sender}>{message.text}</p>)}
          
        </div>
        <div className='basis-[5%]'>
        {isChatThinking && <div className="bouncing-loader">
         <div className=''></div>
        <div></div>
        <div></div>
      </div>}</div>
        <form onSubmit={handleSubmit} className='flex basis-[15%] bg-white'>
          <div className='flex basis-[80%] px-2 py-2'>
            <textarea ref={textRef} id='chatInput' onKeyDown={handleKeyDown} className='outline-0 w-full leading-6 text-ellipsis resize-none' type='text' placeholder='Your message' ></textarea></div>
            <button type='submit' className='flex basis-[20%] justify-center place-items-center active:transition-transform delay-150 active:scale-125'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(103 199 255)" className="size-10">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
</svg>

            </button>
        </form>
        </div>
  )
}
