import React from 'react'
import { useSelector } from 'react-redux';

export default function ChatHeader({testBotOnline}) {

    const botOnline = testBotOnline ?? useSelector(state => state.switcherSlice.chatBotOnline);

  return (
    <div className='chat-header'>
            <div className='flex-centertext'>Hello, virtual assistant is here to help answer your questions</div>
            <img className='chat-bot-image hidden sm:block' src={`../${botOnline ? 'avatar - green.png' : 'avatar - grey.png'}`} alt='avatarimage'></img>
            <div className={`${botOnline ? 'max-sm:text-green-500' : 'max-sm:text-red-500'}`}>Mariana</div>
        </div>
  )
}
