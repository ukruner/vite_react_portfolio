

import API_BASE from './apiBase'

export const postData2 = async(dataObj, token) => {
  try {
    const res = await fetch(`${API_BASE}/backend/mongodb`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(dataObj)
      })

      if (!res.ok) {
        let message = 'Failed to submit questionnaire.'
        try {
          const body = await res.json()
          message = body?.error || body?.detail || message
        } catch {
          // Keep the generic message if the backend did not return JSON.
        }

        throw new Error(message)
      }

      return res
    }
   catch (error) { 
        console.error(error)
        throw error
      }
}

    

    
