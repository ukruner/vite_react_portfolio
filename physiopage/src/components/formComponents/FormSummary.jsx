
import { displayResponseData } from '../../utils/evaluateForm'
import ResponseElement from './customFormElements/responseElement'

export default function FormSummary() {
  console.log(displayResponseData)

  return (
    <div className='form-summary-container'>
      <div className='questionnaire-box form-summary'>
      {displayResponseData.map((entry)=>{
        return (<ResponseElement entry={entry}/>
        )
      })}
      </div>
    </div>
  )
}
