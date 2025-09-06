

export const postData2 = async(dataObj, token) => {
  try {

    if (token) {
    
    console.log("completing data post")
    await fetch('http://localhost:5000/api/backend/mongodb', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(dataObj)
      })}}
   catch (error) { 
        console.error(error)
        throw error
      }
}

    

    