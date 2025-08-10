
import { switcherActions } from '../../store/slices/switchers'
import mainStore from '../../store'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ChatBox from './ChatBox';
import { chatActions } from '../../store/slices/chatSlice';
export default function ChatWindow() {

  const chatOpen = useSelector(state => state.switcherSlice.isChatBoxOpen);

  const chatSlice = useSelector(state => state.chatSlice);

  const [sessionTerminated, setSessionTerminated] = useState(false);
  

  function changeChatLayout(){
    mainStore.dispatch(switcherActions.setChatBoxOpen());
    if (sessionTerminated) {
      setSessionTerminated(false);
    } 

  }

  const postData = async () => {
    console.log(JSON.stringify(chatSlice));
    const response = await fetch(
      "https://storechatdata-default-rtdb.europe-west1.firebasedatabase.app/chat.json",
      { method: "POST", body: JSON.stringify(chatSlice) }
    );

    if (!response.ok) {
      throw new Error("posting data unsuccessful");
    }
  };

  function closeChatSession(){
    
    if (chatSlice.history.length > 0){
    postData();
    mainStore.dispatch(chatActions.clearState());
    setSessionTerminated(true);
    setTimeout(
      () => {mainStore.dispatch(switcherActions.setChatBotOnline(false))}, 1000)
  }
  else{
    changeChatLayout();
  }}

  function resetChatData(){
    if (sessionTerminated){
      mainStore.dispatch(chatActions.resetState());
      setSessionTerminated(false)
      changeChatLayout();
    }
  }
  return (
<div className='chat-window'>
  <div className='rounded-2xl overflow-hidden flex flex-col w-full  h-full bg-white shadow-lg'><ChatBox></ChatBox></div>
  
{chatOpen && <div className='flex basis-[10%] flex-row gap-2 justify-end'>{sessionTerminated && 
  <button onClick={resetChatData} className="flex items-center justify-center  bottom-4 ~xs/lg:~w-12/16 ~text-xs/sm ~xs/lg:~h-12/16 right-4 bg-blue-1 text-white px-4 py-2 rounded-full shadow-lg ">finish session</button>} 
  <button onClick={closeChatSession} className="flex items-center justify-center bottom-4 ~xs/lg:~w-12/16 ~xs/lg:~h-12/16 right-4 bg-blue-1 text-white px-4 py-2 rounded-full shadow-lg "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 shrink-0">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg></button>
  <button onClick={changeChatLayout} className="flex items-center justify-center bottom-4 ~xs/lg:~w-12/16 ~xs/lg:~h-12/16 right-4 bg-blue-1 text-white px-4 py-2 rounded-full shadow-lg "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 shrink-0">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg></button></div>}
</div>
 
  )
}
