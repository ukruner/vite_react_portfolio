import HeaderBlank from './header/HeaderBlank';
import Sidebar from './Sidebar';
import ChatWindow from './chat/ChatWindow';
import { useSelector } from 'react-redux';
import GlobalChatButton from './chat/navigation/chatnavigation-contents/GlobalChatButton';

function Layout2({children}) {
    const chatOpen = useSelector(state => state.switcherSlice.isChatBoxOpen);
    
    return (
        <main>
            <header className="fixed z-[200] w-full">
                <div className="header-scroll">
                    <HeaderBlank/>
                </div>
                <Sidebar />
            </header>
            <div className='q-layout-container'>
                
                <div className={`sm:flex justify-center ${chatOpen ? 'flex-[3_3_0%] hidden' : 'flex-[4_4_0%]'}`}>
                {children}</div>
               
                {chatOpen && <div className='chat-window-container' data-testid='chatwindow'><ChatWindow /></div>}

            </div>
             
             {!chatOpen && <GlobalChatButton/>}
            
        </main>
    );
}


export default Layout2;
