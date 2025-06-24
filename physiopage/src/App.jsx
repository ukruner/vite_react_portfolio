

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import Layout from './components/Layout'
import Layout2 from './components/Layout2'
import Questionnaire from './components/formComponents/Questionnaire'
import ParallaxContainer from './components/ParallaxContainer'
import FormSummary from './components/formComponents/FormSummary'

function App() {


    const router = createBrowserRouter([
        {
            path: '/',
            element: (
               <Layout><ParallaxContainer/></Layout>
            ),
        },
        {
          path: '/questionnaire',
          element: (
             <Layout2><Questionnaire></Questionnaire></Layout2>
          ),
      },
        {
            path: '/results',
            element: (
                <Layout2><FormSummary/></Layout2>
            )
        }

    ])
    return <RouterProvider router={router}></RouterProvider>
}

export default App
