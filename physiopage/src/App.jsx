
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MoveStuffAround from './components/MoveStuffAround';

function App() {

  const router = createBrowserRouter([{
    path: '/',
    element: (<>
    <section ><MoveStuffAround></MoveStuffAround></section>
      <Header></Header>
      <Layout>

      </Layout>
      <Footer>
      </Footer>

    </>),
  }])
  return <RouterProvider router={router}></RouterProvider>
    
}

export default App;
