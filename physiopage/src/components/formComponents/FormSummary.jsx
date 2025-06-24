
import { displayResponseData } from '../../utils/evaluateForm'

export default function FormSummary() {


  return (
    <div className='h-screen w-screen grid items-center justify-center'>
      <div className='questionnaire-box mt-[7rem] w-[35rem] grid gap-4'>
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
