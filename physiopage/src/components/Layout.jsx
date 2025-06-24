import { useLocation } from 'react-router-dom';
import Header from './header/Header';
import MoveStuffAround from './header/MoveStuffAround';
import Sidebar from './Sidebar';
import ChatWindow from './chat/ChatWindow';
import ParallaxContainer from './ParallaxContainer';
import Questionnaire from './formComponents/Questionnaire';

function Layout({children}) {
    const location = useLocation();
    const isQuestionnaire = location.pathname === "/questionnaire";

    
    return (
        <main>
            <header className="fixed z-[200]">
                <MoveStuffAround />
                <Header />
            </header>
            <div>
                {children}
                <Sidebar />
                <ChatWindow />
            </div>
        </main>
    );
}


export default Layout;