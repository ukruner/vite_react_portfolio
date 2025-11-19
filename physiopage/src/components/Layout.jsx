import Header from './header/Header'
import MoveStuffAround from './header/MoveStuffAround'
import Sidebar from './Sidebar'
import ChatWindow from './chat/ChatWindow'
import { useSelector } from 'react-redux'
import GlobalChatButton from './chat/navigation/chatnavigation-contents/GlobalChatButton'

function Layout({ children }) {
    const chatOpen = useSelector((state) => state.switcherSlice.isChatBoxOpen)

    return (
        <main>
            <header className="fixed z-[200]">
                <MoveStuffAround />
                <Header />
                <Sidebar />
            </header>
            <div>
                {children}
                <div>
                    {chatOpen && (
                        <div className="chat-window-container">
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
