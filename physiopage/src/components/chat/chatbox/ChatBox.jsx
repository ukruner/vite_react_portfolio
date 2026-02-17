
import ChatHeader from './chatbox-contents/ChatHeader';
import ChatHistory from './chatbox-contents/ChatHistory';
import ChatForm from './chatbox-contents/ChatForm';

export default function ChatBox() {

      
  return (
    <div className='chat-box-gp'>
    <div className='chat-box' data-testid="chatboxparent">
        <ChatHeader/>
        <ChatHistory/>
        <ChatForm/>
        </div></div>
  )
}
