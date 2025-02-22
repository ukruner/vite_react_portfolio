import React from 'react'
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

export default function ChatBox() {

      const chatOpen = useSelector(state => state.switcherSlice.isChatBoxOpen);
      const botOnline = useSelector(state => state.switcherSlice.chatBotOnline);

      const textRef = useRef();
      const chatBoxRef = useRef();

      const api_key = import.meta.env.VITE_API_KEY;

      const genAI = new GoogleGenerativeAI(
        api_key
      );

      const [messages, setMessages] = useState(
        []
      )

      // startchat instead of generatecontent, and switch between grey/green lights of the avatar

      async function handleSubmit(e) {
        e.preventDefault();
        console.log(api_key)
        const newMessages = [...messages, {
          text: textRef.current.value,
          sender: "user"
        }];
        console.log(textRef.current.value)
        
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt = 'you are an assistant, to help customers with any health questions they may have. Each response should be no longer than 2 sentences.';
          const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                maxOutputTokens: 100,  // <---- Set your desired maximum output tokens here
            },
        });
          const response = await result.response;
          const text = response.text();
          console.log(text)
        setMessages([...newMessages, {
          sender: 'ai',
          text: text
        }])
        textRef.current.value = '';
      }
      catch(error) {
        console.log('error route');
        console.error('Error:', error);
        setMessages([...newMessages, {
          sender: 'ai',
          text: 'Error getting response from server.'}]);
      }}



      const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          handleSubmit(event);
        }
      };


      useEffect(() => {
        // Scroll to the bottom whenever messages change
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      }, [messages]);

      

  return (
    <div className={`flex flex-col w-[20rem] h-[30rem] overflow-hidden shadow-md transition-all duration-[900ms] ease-out ${!chatOpen ? 'opacity-0' : 'opacity-100'}  bg-white rounded-2xl`}>
        <div className='basis-[25%] w-[100%] p-2 gap-1 bg-blue-1 flex flex-col justify-center items-center'>
            <div className=' text-center'>Hello, virtual assistant is here to help answer your questions</div>
            <img className='w-10 h-10 ' src={`../public/${!botOnline ? 'avatar - green.png' : 'avatar - grey.png'}`}></img>
            <div className='text-sm '>Mariana</div>
        </div>
        <div ref={chatBoxRef} className='basis-[60%] m-3 overflow-auto bg-white'>
          {messages.map((message, index)=> <p key={index} className={'message ' + message.sender}>{message.text}</p>)}
        
        </div>
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
