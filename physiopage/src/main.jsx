import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { router } from './router.jsx';
import { RouterProvider } from "react-router-dom";
import mainStore from './store/index.js';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store={mainStore}>
      <>
      <App />
<RouterProvider
  router={router}
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
/>
      </>
    </Provider>
  </StrictMode>,
)
