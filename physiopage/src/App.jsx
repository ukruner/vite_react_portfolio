

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import Layout from './components/Layout'
import Layout2 from './components/Layout2'
import Questionnaire from './components/formComponents/Questionnaire'
import ParallaxContainer from './components/ParallaxContainer'
import FormSummary from './components/formComponents/FormSummary'
import Authentication, {action as authAction} from './components/admin/Authentication'  
// import {action as authAction} from '/Users/urmaskruner/Desktop/VScodeprojects/Portfolio_v2/vite_react_portfolio/physiopage/src/backend/server.js'
import ErrorPage from './components/error/Error'
import { logoutAction } from './components/admin/Authentication'
import { userActions } from './store/slices/userSlice.js'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function App() {
const dispatch = useDispatch();

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("http://localhost:5000/api/backend/sessionStatus", {
          credentials: "include", // send cookies
        });

        if (!res.ok) {
          throw new Error("Not authenticated");
        }

        const data = await res.json();
        console.log(data)
        dispatch(userActions.setUser(data.uid)); // update Redux with backend user info
      } catch (err) {
        dispatch(userActions.clearUser()); // clear if no session
      }
    }

    checkSession();
  }, [dispatch]);

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
               <Layout><ParallaxContainer/></Layout>
            ),
            errorElement: <ErrorPage></ErrorPage>,
        },

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
        {
            path: '/logout',
            action: logoutAction,
            element: <div>Logging out...</div>
        }
        

    ])
    return <RouterProvider router={router}></RouterProvider>
}

export default App
