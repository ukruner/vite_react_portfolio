import Header from './header/Header'
import Sidebar from './Sidebar'
import ChatWindow from './chat/ChatWindow'
import { useSelector } from 'react-redux'
import GlobalChatButton from './chat/navigation/chatnavigation-contents/GlobalChatButton'

function Layout({ children }) {
    const chatOpen = useSelector((state) => state.switcherSlice.isChatBoxOpen)

    return (
        <main>
            <header className="fixed z-[200] w-full">
                <div className="header-scroll">
                    <Header /></div>
                    <Sidebar />
                
            </header>
            <div>
                {children}
                <div>
                    {chatOpen && (
                        <div className="chat-window-container" data-testid='chatwindow'>
                            <ChatWindow />
                        </div>
                    )}
                </div>

                {!chatOpen && 
                    <GlobalChatButton/>
                }
            </div>
        </main>
    )
}

export default Layout
