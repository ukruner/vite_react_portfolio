import React from 'react'
import LayoutButton from './chatnavigation-contents/LayoutButton.jsx'
import CloseButton from './chatnavigation-contents/CloseButton.jsx'
import ResetButton from './chatnavigation-contents/ResetButton.jsx'
import { useSelector } from 'react-redux'
import { switcherActions } from '../../../store/slices/switchers.js'
import mainStore from '../../../store/index.js'


export default function ChatNavigation() {
const sessionTerminated = useSelector(state => state.switcherSlice.sessionTerminated);
const chatOpen = useSelector(state => state.switcherSlice.isChatBoxOpen);

function changeChatLayout(){
  if (!chatOpen){
        mainStore.dispatch(switcherActions.setChatBoxOpen(true))}
        else {
         mainStore.dispatch(switcherActions.setChatBoxOpen(false))   
        }
    if (sessionTerminated) {
    mainStore.dispatch(switcherActions.setSessionTerminated(false))
} 
  }


    
  return (
    <>
    {chatOpen && <div className='chat-navigation-container' data-testid='chatnavigation'>{sessionTerminated ? 
    <ResetButton changeChatLayout={changeChatLayout}/> : <CloseButton changeChatLayout={changeChatLayout}/>} 
  
  <LayoutButton changeChatLayout={changeChatLayout}/></div>}</>
  )
}
