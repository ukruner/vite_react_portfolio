import responseChoices from '../components/formResponseData.json'
import { formEntries } from '../components/formEntries'

export let displayResponseData = [];

export const evaluateForm = (formData) => {

    const diagnosis = formData.some(obj => obj.radiodiagnosis === "Yes");

    displayResponseData = formData.map((entry) => {
        const [[key, value]] = Object.entries(entry)
        let chosen = formEntries.find((element) => element.id == key)
        chosen.options = value

        let comment = ''
        let videos = []

        if (responseChoices[key]) {
            if (key == "bodypart" && diagnosis) {
                comment = ''
            } else {
                comment = responseChoices[key][value] || ''
            }
        }

        // Look up any configured videos by answer text in the top-level videos array
        if (Array.isArray(responseChoices.videos)) {
            for (const mapping of responseChoices.videos) {
                if (Object.prototype.hasOwnProperty.call(mapping, value)) {
                    const candidate = mapping[value]
                    if (Array.isArray(candidate)) {
                        videos = candidate
                    }
                }
            }
        }

        chosen.comment = comment
        chosen.videos = videos
     
        return {
            id: chosen.label,
            response: value,
            comment: chosen.comment,
            videos: chosen.videos
        }
    })

}
