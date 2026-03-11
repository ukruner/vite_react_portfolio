

import API_BASE from './apiBase'

export const postData2 = async(dataObj, token) => {
  try {

  
    
    await fetch(`${API_BASE}/backend/mongodb`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(dataObj)
      })}
   catch (error) { 
        console.error(error)
        throw error
      }
}

    

    
