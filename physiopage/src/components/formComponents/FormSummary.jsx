
import { displayResponseData } from '../../utils/evaluateForm'
import ErrorPage from '../error/Error'
import ResponseElement from './customFormElements/responseElement'

export default function FormSummary() {
  console.log(displayResponseData)

  return (
    <div className='form-summary-container'>
      {displayResponseData.length > 0 ? <div className='questionnaire-box form-summary'>
       {displayResponseData.map((entry)=> {return (<ResponseElement entry={entry}/>)})}</div> 
      
      : <ErrorPage formEmpty={true}></ErrorPage>}
      
    </div>
  )
}
