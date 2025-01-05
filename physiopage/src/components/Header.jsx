import React from 'react'
import {Link} from 'react-router-dom';
import AuthBox from './AuthBox';
import { switcherActions } from '../store/slices/switchers';
import mainStore from '../store';
import ReactFreezeframe from 'react-freezeframe';


export default function Header() {



  const handleClick = (e) => {

    const currentButton = e.target;
    const currentParent = e.target.closest('div');

    document.querySelectorAll('.navbar-active-button, .navbar-left-button, .navbar-right-button').forEach(btn => {
      btn.classList.remove('navbar-active-button', 'navbar-left-button', 'navbar-right-button');
    });
  
    document.querySelectorAll('.side-button-wrapper').forEach(parent => {
      parent.classList.remove('side-button-wrapper');
    });

    const leftButtonWrapper = currentParent.previousElementSibling;
    const rightButtonWrapper = currentParent.nextElementSibling;


    // const leftButtonWrapper = buttonLeft.querySelector('div');
    // const rightButtonWrapper = buttonRight.querySelector('div');

    const leftButton = leftButtonWrapper?.querySelector('button');
    const rightButton = rightButtonWrapper?.querySelector('button');

    // const leftParent = leftButton.parentElement;
    // const rightParent = rightButton.parentElement;

    if (leftButton) {
      console.log('Left button:', leftButton.textContent);
      leftButton.classList.add('navbar-left-button');
      leftButtonWrapper.classList.add('side-button-wrapper'); 
    } else {
      console.log('No left button.');
    }

    if (rightButton) {
      console.log('Right button:', rightButton.textContent);
      rightButton.classList.add('navbar-right-button'); 
      rightButtonWrapper.classList.add('side-button-wrapper'); 
    } else {
      console.log('No right button.');
    }

    if (currentButton) {
      currentButton.classList.add('navbar-active-button'); 
    }
  };
  


  return (
    <header className='custom-header fixed z-20 flex  flex-end'>
      <div className='w-1/4 h-20 flex '>
      <div className='object-scale-down ml-4 h-20 w-20 fixed'>
      <ReactFreezeframe src='/whale2.gif' alt='moving whale'></ReactFreezeframe>
      </div></div>
      
    {/* <div className='md:pl-[25rem]'> */}
    <nav className='navbar-container flex place-items-end'>
    
    <div><button className='px-[0.25rem] py-[1.5rem] z-[30]'>
    </button></div>
      
    <div><button className='navbar-button bg-blue-4' onClick={handleClick}>
   Why us
    </button></div>
    <div> <button className='navbar-button' onClick={handleClick}>
    Importance of exercise
    </button></div>
    <div><button className='navbar-button' onClick={handleClick}>
   About the team
    </button></div>
    <div><button className='navbar-button' onClick={handleClick}>
   Contact
    </button></div>
    <div><button className='navbar-button' onClick={handleClick}>
  Resources
    </button ></div>
    
    <div><button className=' bg-blue-5 px-[0.25rem] py-[1.5rem] z-[30]'>
    </button></div>
    
    </nav>
    {/* </div> */}
    <AuthBox>Account</AuthBox>
    
    </header>
  )
}
