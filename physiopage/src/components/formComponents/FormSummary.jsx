
import { displayResponseData } from '../../utils/evaluateForm'

export default function FormSummary() {


  return (
    <div className='flex flex-col h-auto'>
      <div className='questionnaire-box flex flex-col mb-5 gap-4 p-5  border-2 ~text-xs/lg border-black rounded-3xl'>
      {displayResponseData.map((entry)=>{
        return (<div key={entry.label}><div className='flex gap-2 my-4'>
          <p className='text-lg'>{entry.id}</p>
          <p className='text-red-500 text-lg'>{entry.response}</p></div>
          <p className='text-sm/6'>{entry.comment}</p></div>
        )
      })}
      </div>
    </div>
  )
}
