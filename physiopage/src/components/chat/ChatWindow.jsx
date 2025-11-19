
import ChatBox from './chatbox/ChatBox';
import ChatNavigation from './navigation/ChatNavigation';

export default function ChatWindow(){
  return (
<div className='chat-window'>
  <ChatBox/>
  <ChatNavigation/>
</div>
 
  )
}
