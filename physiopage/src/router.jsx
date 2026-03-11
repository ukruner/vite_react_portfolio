import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import API_BASE from './utils/apiBase'
import { readJsonResponse } from './utils/readJsonResponse'


import Layout from './components/Layout'
import Layout2 from './components/Layout2'
import Questionnaire from './components/formComponents/Questionnaire'
import ParallaxContainer from './components/ParallaxContainer'
import FormSummary from './components/formComponents/FormSummary'
import Authentication, {action as authAction} from './components/admin/Authentication'  
// import {action as authAction} from '/Users/urmaskruner/Desktop/VScodeprojects/Portfolio_v2/vite_react_portfolio/physiopage/src/backend/server.js'
import ErrorPage from './components/error/Error'
import { logoutAction } from './components/admin/Authentication'

async function requireAuth() {
    const res = await fetch(`${API_BASE}/backend/sessionStatus`, {
        credentials: 'include',
    });
    if (!res.ok) {
        return redirect('/auth');
    }
    const data = await readJsonResponse(res);
    if (!data?.uid) {
        return redirect('/auth');
    }
    return null;
}

export const routes = [ {
            path: '/',
            element: (
               <Layout><ParallaxContainer/></Layout>
            ),
            errorElement: <ErrorPage></ErrorPage>,
        },

        {
          path: '/questionnaire',
          loader: requireAuth,
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
        

    ];
    
export const router = createBrowserRouter([
        {
            path: '/',
            element: (
               <Layout><ParallaxContainer/></Layout>
            ),
            errorElement: <ErrorPage></ErrorPage>,
        },

        {
          path: '/questionnaire',
          loader: requireAuth,
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
        

    ], {
        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        },
    })
