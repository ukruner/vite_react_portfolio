import React from 'react'
import { useSelector } from 'react-redux';
import { chatActions } from '../../../../store/slices/chatSlice';
import { switcherActions } from '../../../../store/slices/switchers';
import mainStore from '../../../../store';
export default function CloseButton({changeChatLayout}) {

        const chatSlice = useSelector(state => state.chatSlice);

    function closeChatSession(){
    
    if (chatSlice.history.length > 0){
    mainStore.dispatch(chatActions.clearState());
    mainStore.dispatch(switcherActions.setSessionTerminated(true));
      
          console.log("Scheduling timeout!");
setTimeout(
      () => {console.log("Timeout fired!");
        mainStore.dispatch(switcherActions.setChatBotOnline(false))}, 1000)
  }
  else{
    changeChatLayout();
  }}

  return (
    <button onClick={closeChatSession} className='chat-navigation-button bottom-4 right-4' aria-label='closebutton'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='svg-class'>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg></button>
  )
}
