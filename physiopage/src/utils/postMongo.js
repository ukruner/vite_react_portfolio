export const postData2 = async(dataObj) => {
  try {
    await fetch('http://localhost:5000/api/backend/mongodb', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataObj)
      })
  } catch(error) { 

        throw error
      }
}