import React from 'react'
import mainStore from '../store';
import { useSelector } from 'react-redux';

export default function Sidebar() {

  const isSidebarClicked = useSelector(state => state.switcherSlice.isSidebarOpen)
  
  return (
    <aside className={` ${isSidebarClicked ? 'w-72' : 'w-0' } transition-all duration-100 font-poppins h-screen opacity-80 shadow-[rgba(0,0,0,0.2)_5px_2px_4px_0px] flex  bg-gradient-to-r from-blue-1 to-blue-3  rounded-r-xl`}>
      {isSidebarClicked && <nav className='text-stone-50 pl-8 py-20'>Sidebar</nav>}
    
    
    </aside>
)}
