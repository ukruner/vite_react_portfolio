import { useLocation } from 'react-router-dom';
import HeaderBlank from './header/HeaderBlank';
import MoveStuffAround from './header/MoveStuffAround';
import Sidebar from './Sidebar';
import mainStore from '../store';
import ChatWindow from './chat/ChatWindow';
import Questionnaire from './formComponents/Questionnaire';
import { switcherActions } from '../store/slices/switchers';
import { useSelector } from 'react-redux';

function Layout2({children}) {
    const location = useLocation();
    const isQuestionnaire = location.pathname === "/questionnaire";
    const chatOpen = useSelector(state => state.switcherSlice.isChatBoxOpen);

    
    function openChat(){
    mainStore.dispatch(switcherActions.setChatBoxOpen());
    // setChatIsOpen(!chatIsOpen);
    console.log(chatOpen)
  }

    return (
        <main>
            <header className="fixed z-[200]">
                <MoveStuffAround />
                <HeaderBlank/>
            </header>
            <div className={`flex flex-row w-full h-screen pt-[7rem] pb-[1rem] gap-10`}>
                
                <div className={`flex justify-center ${chatOpen ? 'flex-[3_3_0%]' : 'flex-[4_4_0%]'}`}>
                {children}</div>
               
                {chatOpen && <div className='flex flex-1 h-full justify-end'><ChatWindow /></div>}

            </div>
             <Sidebar />
             {!chatOpen && <button onClick={openChat} className="fixed flex items-center justify-center bottom-4 ~xs/lg:~w-12/16 ~xs/lg:~h-12/16 right-[2.5rem] bg-blue-1 text-white px-4 py-4 mb-4 rounded-full shadow-lg "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg></button>}
            
        </main>
    );
}


export default Layout2;