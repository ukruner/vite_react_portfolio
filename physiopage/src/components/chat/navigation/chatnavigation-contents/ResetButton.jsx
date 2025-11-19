import React from 'react'
import { chatActions } from '../../../../store/slices/chatSlice';
import mainStore from '../../../../store';
import { useSelector } from 'react-redux';
import { switcherActions } from '../../../../store/slices/switchers';

export default function ResetButton({changeChatLayout}) {

    const sessionTerminated = useSelector(state => state.switcherSlice.sessionTerminated);

    function resetChatData(){
        if (sessionTerminated){
          mainStore.dispatch(chatActions.resetState());
          changeChatLayout();
        }
      }

  return (
      <button onClick={resetChatData} aria-label='resetbutton' className='chat-navigation-button bottom-4 right-4'>finish session</button>
  )
}
