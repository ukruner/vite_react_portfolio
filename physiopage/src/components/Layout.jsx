import React from 'react'
import { marqueeActions } from '../store/slices/marqueeSlice'
import mainStore from '../store'

import { switcherActions } from '../store/slices/switchers';

export default function Layout() {

  

  function changeMarquee(value){

    mainStore.dispatch(marqueeActions.setMarqueeSign(value));
    mainStore.dispatch(switcherActions.setMarqueeActive())
  }
  


  return (
    <div className='relative inline-block z-50 left-10 '>
      <p className='mx-7 my-2'>Layoutdesfsdgd</p>
    <button className='light-button' onClick={()=>changeMarquee("exercise")}>Dumbbell</button>
    <button className='light-button' onClick={()=>changeMarquee("info")}>Info</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>

    </div>
  )
}
