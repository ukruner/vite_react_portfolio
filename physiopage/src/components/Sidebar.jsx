import React from 'react'
import mainStore from '../store';
import { useSelector } from 'react-redux';
import { switcherActions } from '../store/slices/switchers';
import { Fragment } from 'react';
export default function Sidebar() {

  

  const isSidebarClicked = useSelector(state => state.switcherSlice.isSidebarOpen)
  const marginTop = useSelector(state => state.marqueeSign.marqueeSign) ? '7rem' : '5rem';
  function openSideBar(){
    mainStore.dispatch(switcherActions.setIsSidebarOpen());
  }
  
  return (
 <div id='container' className='fixed flex z-[100]' style={{top: marginTop, height: `calc(100vh - ${marginTop})`}}><aside className={` ${isSidebarClicked ? 'w-72' : 'w-0' } sidebar`}>
      {isSidebarClicked && <div className='text-stone-50 px-8 py-20'>Sidebar</div>}
    
      </aside>
    <button onClick={openSideBar} className={`${isSidebarClicked ? 'left-72' : 'left-0' } sidebar-button `}>{isSidebarClicked ? '<' : '>'}</button></div>
)}
