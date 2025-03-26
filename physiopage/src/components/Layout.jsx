import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import MoveStuffAround from './Header/MoveStuffAround';
import Sidebar from './Sidebar';
import ChatWindow from './chat/ChatWindow';
import ParallaxContainer from './ParallaxContainer';
import Questionnaire from './Questionnaire';

function Layout() {
    const location = useLocation();
    const isQuestionnaire = location.pathname === "/questionnaire";

    return (
        <main>
            <header className="fixed z-[200]">
                <MoveStuffAround />
                <Header />
            </header>
            <div>
                {isQuestionnaire ? <Questionnaire /> : <ParallaxContainer />}
                <Sidebar />
                <ChatWindow />
            </div>
        </main>
    );
}


export default Layout;