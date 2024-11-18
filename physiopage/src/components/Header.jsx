import React from 'react'
import {Link} from 'react-router-dom';
import AuthBox from './AuthBox';
import { switcherActions } from '../store/slices/switchers';
import mainStore from '../store';

export default function Header() {

  function openSidebar(){
    mainStore.dispatch(switcherActions.setIsSidebarOpen());
  }

  return (

    <main className='custom-header flex flex-row'>
     
      <div className='p-4 absolute'>
    <button onClick={openSidebar}>NavBar placeholder</button></div>
    <div className='md:ml-80 static'>
    <nav className='flex flex-row'>
    <div className='p-4'>
    <Link >Why us</Link>
    </div>
    <div className='p-4'>
    <Link >Importance of exercise</Link>
    </div>
    <div className='p-4'>
    <Link >About the team</Link>
    </div>
    <div className='p-4'>
    <Link >Contact</Link>
    </div>
    <div className='p-4'>
    <Link >Resources</Link>
    </div>
    </nav>
    </div>
    <AuthBox>Account</AuthBox>
    
    </main>
  )
}
