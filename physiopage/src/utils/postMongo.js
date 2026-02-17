

export const postData2 = async(dataObj, token) => {
  try {

  
    
    await fetch('http://localhost:5000/api/backend/mongodb', {
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

    

    