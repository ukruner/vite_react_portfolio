import responseChoices from '../components/formResponseData.json'
import { formEntries } from '../components/formEntries'

export let displayResponseData = [];

export const evaluateForm = (formData) => {

    const diagnosis = formData.some(obj => obj.radiodiagnosis === "Yes");

    displayResponseData = formData.map((entry) => {
        const [[key, value]] = Object.entries(entry)
        let chosen = formEntries.find((element) => element.id == key)
        chosen.options = value

      
        if (responseChoices[key] ) {
            if (key == "bodypart" && diagnosis){
            chosen.comment = ''
            }
            else{
        
            chosen.comment = responseChoices[key][value]}
        } else {
            chosen.comment = ''
        }
     
        return { id: chosen.label, response: value, comment: chosen.comment }
    })

}
