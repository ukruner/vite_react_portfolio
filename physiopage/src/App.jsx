


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
