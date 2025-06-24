import responseChoices from '../components/formResponseData.json'
import { formEntries } from '../components/formEntries'

export let displayResponseData = [];

export const evaluateForm = (formData) => {

    // const responseChoices = JSON.parse(responseChoices);

    const diagnosis = formData.some(obj => obj.radiodiagnosis === "Yes");

    displayResponseData = formData.map((entry) => {
        const [[key, value]] = Object.entries(entry)
        let chosen = formEntries.find((element) => element.id == key)
        chosen.options = value
        console.log(key);
      
        if (responseChoices[key] ) {
            if (key == "bodypart" && diagnosis){
            console.log("diagnosis known")
            chosen.comment = ''
            }
            else{
        
            chosen.comment = responseChoices[key][value]}
        } else {
            console.log('no entry found')
            chosen.comment = ''
        }
     
        return { id: chosen.label, response: value, comment: chosen.comment }
    })

    console.log(displayResponseData)
    
    
    // console.log(displayResponseData);
}
