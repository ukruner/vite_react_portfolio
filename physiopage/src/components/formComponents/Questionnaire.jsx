
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import { evaluateForm } from '../../utils/evaluateForm';
import { switcherActions } from '../../store/slices/switchers'

import { formEntries } from '../formEntries';
import { useSelector } from 'react-redux';
import mainStore from '../../store';
export default function Questionnaire() {

// const durationRef = useRef();
// const bodyPartRef = useRef();
// const offWorkRef = useRef();
// const treatmentRef = useRef(null);
// const treatmentModalityRef = useRef();
// const sourceRef = useRef();
// const exerciseRef = useRef();
// const apptFrequencyRef = useRef();

const [isCheckedObject, setIsCheckedObject] = useState({offwork: false, treatment: false, duration: true, diagnosis: true, bodypart: true}); 

const [submitted, setSubmitted] = useState(false);

const chatOpen = useSelector(state => state.switcherSlice.isChatBoxOpen);

// function handleCheck(event){
//     const stateName = event.target.id

//     setIsCheckedObject(prevState =>  ({...prevState, [stateName]: !prevState[stateName]}))
// }

function handleSubmit(event){
  
    event.preventDefault();
    const form = event.target;
    const fd = new FormData(form);

    
    const arrayData = fd.entries();
   
    const objData = Array.from(arrayData).map(([key, value]) => ({
        
        [key]: value
      }));

    evaluateForm(objData);
    
    setSubmitted(true);
    
}

  return (
    submitted ? <Navigate to='/results'/> : <div className='flex flex-col overflow-y-auto extra-padding   rounded-3xl'>
        <div className='questionnaire-box '>
            <form className='grid p-5 ~mt-5/20 border-2 ~text-xs/lg border-black rounded-3xl' onSubmit={handleSubmit}>
       
                {formEntries.map( entry => {
                    switch (entry.type){
                        case 'text':
                        //    console.log(entry.id, isCheckedObject[String(entry.parent)])
                            if (isCheckedObject[String(entry.parent)]){
                            return (<div key={entry.id} className='mt-2'><label htmlFor={entry.id} key={entry.id} >{entry.label}</label>
                <select name={entry.id} id={entry.id}         className="m-2 h-6 px-1 leading-tight bg-transparent text-center border border-slate-200 rounded  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">

                <option hidden disabled selected defaultValue={''} ></option>
                {entry.options.map(option => {return <option key={option} defaultValue={''} >{option}</option>})}   
                </select></div>)}
                            else{
                                break;
                            };
                        case 'radio':

                            if (isCheckedObject[String(entry.parent)]){
                                
                            return (<fieldset>  <div className='grid gap-4'>
                                <legend>{entry.label}</legend>
                                <div className='flex gap-2 '>
                                    {entry.options.map(option => {return <label key={option}><input type={entry.type} key={entry.options.indexOf(option)} id={entry.id} name={entry.id} value={option}></input>{' '+option}</label>})}
                                   </div></div></fieldset>)}
                                   else {
                                    break;
                                   };
                        case 'checkbox':
                            if (entry.parent){
                            return (
                                <div className='flex gap-2 m-2' key={entry.id}>
                <input type={entry.type} id={entry.id} name={entry.id} value={isCheckedObject[entry.id] ? "Yes" : "No"} onChange={() => entry.func(event, setIsCheckedObject, isCheckedObject)} checked={isCheckedObject[entry.id]}></input>
                <label htmlFor={entry.id} >{entry.label}</label>
                </div>
                            )}
                            else {
                            break};
                    
                    };

                })}
                <div><button className='submit-button my-2 ~xs/md:~p-1/4 ~text-xs/lg' type='submit' >Submit your form</button></div>

                          <Link to='/' className='mt-2'>Back to root</Link>
              </form>
    
        </div>
        
    </div>
  )
}
