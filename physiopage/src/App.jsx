

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import Layout from './components/Layout'
import Layout2 from './components/Layout2'
import Questionnaire from './components/formComponents/Questionnaire'
import ParallaxContainer from './components/ParallaxContainer'
import FormSummary from './components/formComponents/FormSummary'
import Authentication, {action as authAction} from './components/admin/Authentication'  
// import {action as authAction} from '/Users/urmaskruner/Desktop/VScodeprojects/Portfolio_v2/vite_react_portfolio/physiopage/src/backend/server.js'
import ErrorPage from './components/error/Error'
import { action as logOutAction } from './utils/logout.js'


function App() {


    const router = createBrowserRouter([
        {
            path: '/',
            element: (
               <Layout><ParallaxContainer/></Layout>
            ),
            errorElement: <ErrorPage></ErrorPage>,
        children: [
{
            path: '/logout',
            action: logOutAction,
        }
        ]},

        {
          path: '/questionnaire',
          element: (
             <Layout2><Questionnaire></Questionnaire></Layout2>
          ),
          errorElement: <ErrorPage></ErrorPage>
   
      },
        {
            path: '/results',
            element: (
                <Layout2><FormSummary/></Layout2>
            ),
            errorElement: <ErrorPage></ErrorPage>
        },
         {
            path: '/auth',
            element: (<Authentication/>),
            action: authAction,
            errorElement: <ErrorPage></ErrorPage>
        },
        

    ])
    return <RouterProvider router={router}></RouterProvider>
}

export default App
