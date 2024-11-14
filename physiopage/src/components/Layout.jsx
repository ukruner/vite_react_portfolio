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
    <>Layout
    <button onClick={()=>changeMarquee("exercise")}>Dumbbell</button>
    <button onClick={()=>changeMarquee("info")}>Info</button>
    <button onClick={()=>changeMarquee("admin")}>Admin</button>
    </>
  )
}
