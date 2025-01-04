
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MoveStuffAround from './components/MoveStuffAround';
import Sidebar from './components/Sidebar';
import { Fragment } from 'react';

// parallax scrolling, link up with navbar title switches - background switches

function App() {

  const router = createBrowserRouter([{
    path: '/',
    element: (<Fragment>
      <main >
    <section ><MoveStuffAround></MoveStuffAround>
      <Header ></Header></section>
     <Sidebar></Sidebar>
      <div><Layout>

      </Layout>
      <Layout>

      </Layout>
      <Layout>

      </Layout></div>
      {/* <Footer>
      </Footer> */}
</main>
    </Fragment>),
  }])
  return <RouterProvider router={router}></RouterProvider>
    
}

export default App;
