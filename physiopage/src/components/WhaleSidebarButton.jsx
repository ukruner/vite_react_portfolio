import React from 'react'
import { useState } from 'react';
import mainStore from '../store';
import ReactFreezeframe from 'react-freezeframe';
import { switcherActions } from '../store/slices/switchers';

export default function WhaleSidebarButton() {

    const [isHovered, setIsHovered] = useState(false);


    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    function openSideBar(){
        mainStore.dispatch(switcherActions.setIsSidebarOpen());
      }
      


  return (
    <div id='starterdiv' className='flex ml-4 h-20 w-[10rem] place-items-end bg-blue-4'>
          
    <button  onClick={openSideBar} className={`object-scale-down  h-full flex-shrink-0 w-20 flex ${isHovered && 'bg-white rounded-tl-[9999px] rounded-tr-[9999px]'}`} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <ReactFreezeframe src='/whale2.gif' alt='moving whale'></ReactFreezeframe></button>
      <button onClick={openSideBar} className={`flex-shrink-0 flex text-nowrap py-3 px-3  ${isHovered && 'bg-white rounded-tr-3xl'} `} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
     Want to know more?</button>
    </div>
  )
}
