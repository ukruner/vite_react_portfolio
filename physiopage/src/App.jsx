

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import Layout from './components/Layout'

function App() {


    const router = createBrowserRouter([
        {
            path: '/',
            element: (
               <Layout/>
            ),
        },
        {
          path: '/questionnaire',
          element: (
             <Layout/>
          ),
      }

    ])
    return <RouterProvider router={router}></RouterProvider>
}

export default App
