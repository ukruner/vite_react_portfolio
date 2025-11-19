import React from 'react'
import mainStore from '../../../../store';
import { useSelector } from 'react-redux';
import { switcherActions } from '../../../../store/slices/switchers';
import { useState } from 'react';
export default function LayoutButton({changeChatLayout}) {
    
    
  return (
    <button onClick={changeChatLayout} aria-label='layoutbutton' className='chat-navigation-button bottom-4 right-4'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='svg-class'>
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg></button>
  )
}
