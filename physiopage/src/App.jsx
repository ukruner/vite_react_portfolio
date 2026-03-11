


import { userActions } from './store/slices/userSlice.js'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import API_BASE from './utils/apiBase'
import { readJsonResponse } from './utils/readJsonResponse'

function App() {
const dispatch = useDispatch();

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch(`${API_BASE}/backend/sessionStatus`, {
          credentials: "include", // send cookies
        });

        if (!res.ok) {
          throw new Error("Not authenticated");
        }

        const data = await readJsonResponse(res);
        if (!data?.uid) {
          throw new Error("Not authenticated");
        }
        dispatch(userActions.setUser(data.uid)); // update Redux with backend user info
      } catch (err) {
        dispatch(userActions.clearUser()); // clear if no session
      }
    }

    checkSession();
  }, [dispatch]);

    
    return null
}

export default App
