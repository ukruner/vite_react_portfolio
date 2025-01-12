import React from 'react'
import mainStore from '../store';
import { useSelector } from 'react-redux';
import { switcherActions } from '../store/slices/switchers';
import { Fragment } from 'react';
export default function Sidebar() {

  

  function openSideBar(){
    mainStore.dispatch(switcherActions.setIsSidebarOpen());
  }
  const isSidebarClicked = useSelector(state => state.switcherSlice.isSidebarOpen)
  const marginTop = useSelector(state => state.marqueeSign.marqueeSign) ? '7rem' : '5rem';
  
  
  return (
 <div id='container' className='fixed flex z-[100]' style={{top: marginTop, height: `calc(100vh - ${marginTop})`}}><aside className={` ${isSidebarClicked ? 'h-full' : 'h-0' } sidebar`}>
      {isSidebarClicked && <div className='flex h-auto w-72 justify-end'><div className='flex m-auto h-full mt-10 text-stone-50 px-8 '>Sidebar
        Want to learn about
        Want to learn boutddddddsdfsdfsdfsddsg
</div><button type="button" onClick={openSideBar} class="bg-white rounded-md p-2 h-5 w-5 mt-3 mr-3 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-1">x</button></div>}
    
      </aside>
    {/* <button onClick={openSideBar} className={`${isSidebarClicked ? 'left-72' : 'left-0' } sidebar-button `}>{isSidebarClicked ? '<' : '>'}</button> */}
    
    </div>
)}
