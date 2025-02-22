
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Background from './components/Background';
import MoveStuffAround from './components/MoveStuffAround';
import Sidebar from './components/Sidebar';
import { useSelector } from 'react-redux';
import ParallaxContainer from './components/ParallaxContainer';
import ScrollContainer from './components/scrollContainer';
// parallax scrolling, link up with navbar title switches - background switches
import Demo from './components/ScrollFile';
import ChatWindow from './components/chat/ChatWindow';

function App() {
  const marginTop = useSelector(state => state.marqueeSign.marqueeSign) ? '7rem' : '5rem';

  const router = createBrowserRouter([{
    path: '/',
    element: (
      
      <main>
        

<header className='z-[200]'><MoveStuffAround></MoveStuffAround>
<Header></Header></header>
<div className='flex' style={{top: marginTop}}>

      <ParallaxContainer></ParallaxContainer>
      
      {/* <ScrollContainer></ScrollContainer>   */}
     {/* <Demo></Demo> */}
      <Sidebar></Sidebar>
      <ChatWindow></ChatWindow></div>
      {/* <div className='z-50 w-[35rem] relative'></div> */}
      
    
</main>
    ),
  }])
  return <RouterProvider router={router}></RouterProvider>
    
}

export default App;
