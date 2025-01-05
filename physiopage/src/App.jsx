
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Background from './components/Background';
import MoveStuffAround from './components/MoveStuffAround';
import Sidebar from './components/Sidebar';
import { useSelector } from 'react-redux';

// parallax scrolling, link up with navbar title switches - background switches

function App() {
  const marginTop = useSelector(state => state.marqueeSign.marqueeSign) ? '7rem' : '5rem';

  const router = createBrowserRouter([{
    path: '/',
    element: (
      <main>
        

<header className='fixed z-[200]'><MoveStuffAround></MoveStuffAround>
<Header ></Header></header>
<div className='relative' style={{top: marginTop}}>

      <Background></Background>
      
      
      <div className='z-50 w-[35rem] relative'><Layout>

      </Layout>
      <Layout>

      </Layout>
      <Layout>

      </Layout></div>
      <Sidebar></Sidebar>
      </div>
      
    
</main>
    ),
  }])
  return <RouterProvider router={router}></RouterProvider>
    
}

export default App;
