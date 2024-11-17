import React from 'react'
import { marqueeActions } from '../store/slices/marqueeSlice'
import mainStore from '../store'
import marqueeSlice from '../store/slices/marqueeSlice';
import {useSelector} from 'react-redux';

export default function Layout() {

  

  function changeMarquee(value){
    mainStore.dispatch(marqueeActions.setMarqueeSign(value));
  }
  


  return (
    <div className='inline-block'>
      <p className='mx-7 my-2'>Layoutdesfsdgd</p>
    <button className='light-button' onClick={()=>changeMarquee("exercise")}>Dumbbell</button>
    <button className='light-button' onClick={()=>changeMarquee("info")}>Info</button>
    <button className='light-button' onClick={()=>changeMarquee("admin")}>Admin</button>
    </div>
  )
}
