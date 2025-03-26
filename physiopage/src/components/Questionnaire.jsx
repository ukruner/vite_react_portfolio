import React from 'react'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react';
export default function Questionnaire() {

const durationRef = useRef();
const bodyPartRef = useRef();
const offWorkRef = useRef();
const treatmentRef = useRef(null);
const sourceRef = useRef();
const exerciseRef = useRef();
const apptFrequencyRef = useRef();

const [isCheckedObject, setIsCheckedObject] = useState({offwork: false, treatment: false}); 

function handleCheck(event){
    const stateName = event.target.id
    setIsCheckedObject(prevState =>  ({...prevState, [stateName]: !prevState[stateName]}))
    console.log("state changed", isCheckedObject)
}

  return (
    <div className='h-screen w-screen grid items-center justify-center'>
        <div className='questionnaire-box mt-[7rem] w-[35rem] grid gap-4'>
            <form className='grid gap-4'>
                <label htmlFor="body-site">What is the body part affected?</label>
                <select ref={bodyPartRef}>
                <option hidden disabled selected value></option>
                    <option value='headneck'>Head/Neck</option>
                    <option value='shoulder'>Shoulder</option>
                    <option value='elbowforearm'>Elbow/Forearm</option>
                    <option value='wristhand'>Wrist/Hand</option>
                    <option value='upperback'>Upper back</option>
                    <option value='lowerback'>Lower back</option>
                    <option value='hipgrointhigh'>Hip/Groin/Thigh</option>
                    <option value='kneeshin'>Knee/Shin</option>
                    <option value='footankle'>Foot/Ankle</option>
                </select>
                <label htmlFor="duration">How long have you had your problem for?</label>
                <select ref={durationRef}>
                <option hidden disabled selected value></option>
                    <option value='1-2weeks'>1-2 weeks</option>
                    <option value='3-12weeks'>3-12 weeks</option>
                    <option value='3-6months'>3-6 months</option>
                    <option value='over6months'>Over 6 months</option>
                </select>
                <div className='flex gap-2'>
                <input type='checkbox' id="offwork" onChange={handleCheck} checked={isCheckedObject.offwork}></input>
                <label htmlFor="offwork" >Are you currently off work because of this issue?</label>
                </div>
                {isCheckedObject.offwork && <div className='grid gap-4'>
                    <label htmlFor='offworkduration'>For how long?</label>
                    <select ref={offWorkRef} id='offworkduration'>
                    <option hidden disabled selected value></option>
                    <option value='1-2weeks'>1-2 weeks</option>
                    <option value='3-12weeks'>3-12 weeks</option>
                    <option value='3-6months'>3-6 months</option>
                    <option value='over6months'>Over 6 months</option>
                </select></div>}
                <div className='flex gap-2'><input type='checkbox' id="treatment" checked={isCheckedObject.treatment} onChange={handleCheck}></input>
                <label htmlFor="treatment" id='treatmentlabel'>Are you currently receiving any treatment?</label></div>
                    {isCheckedObject.treatment && <div className='grid gap-4'>
                    <label htmlFor='caremodality'>Who is it with, and who provides it?</label>
                    <select ref={treatmentRef} id='caremodality'>
                    <option hidden disabled selected value></option>
                    <option value='Osteopathy'>Osteopath</option>
                    <option value='Chiropractor'>Chiropractor</option>
                    <option value='Physiotherapy'>Physiotherapist</option>
                    <option value='Massage'>Massage</option>
                    <option value='Alternative'>Alternative</option>
                </select>
                <fieldset><div id='sourcecheckboxes' className='flex gap-2'>
                    
                    <input type='radio' id='nhs'></input>
                    <label htmlFor='nhs'>NHS</label>
                    <input type='radio' id='private'></input>
                    <label htmlFor='private'>Private</label>
                    <input type='radio' id='other'></input>
                    <label htmlFor='other'>Other</label>
                </div></fieldset>
                <label htmlFor='exercisenumber'>How many exercises were you given to do</label>
                    <select ref={exerciseRef} id='exercisenumber'>
                    <option hidden disabled selected value></option>
                    <option value='1-3'>1-3</option>
                    <option value='2-6'>2-6</option>
                    <option value='6more'>6 or more</option>
                    <option value='multiple'>Multiple routines</option>
                    <option value='none'>None</option></select>
                <label htmlFor='apptfrequency'>How often do you see your therapist?</label>
                    <select ref={apptFrequencyRef} id='apptfrequency'>
                    <option hidden disabled selected value></option>
                    <option value='1'>Once a week</option>
                    <option value='2-3'>Once every 2-3 weeks</option>
                    <option value='3-6'>Once every 3-6 weeks</option>
                    <option value='6plus'>More than 6 weeks between appointments</option>
                    <option value='discharge'>Only had 1 and got discharged</option></select>
               <fieldset>  <div className='grid gap-4'>
                    <legend>Have you been given/sent any educational content or information?</legend>
                    <div className='flex gap-2'><label>
    <input type="radio" name="option" value="yes"/> Yes
  </label>
  <label>
    <input type="radio" name="option" value="no"/> No
  </label></div></div></fieldset>
                </div>
                }
                <div className='my-5'><button className='submit-button' type='submit'>Submit your form</button></div>
                </form>
        <Link to="/">Back to root</Link></div>
    </div>
  )
}
