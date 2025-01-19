import React from 'react'
import { useState, useEffect } from 'react';
import mainStore from '../store';
import { switcherActions } from '../store/slices/switchers';
import highlightButton from '../utils/highlightButton';

export default function HeaderNavbar({asd, children}) {


    const handleClick = (index) => {
        
        highlightButton(index);
        mainStore.dispatch(switcherActions.setScrollToValue(index));

        
    
      };

  return (
    <nav className={`flex  place-items-end ${asd}`}>
    
    <div><button className='px-[1rem] py-[1.5rem] '>
      
    </button></div>
      
    {['Intro', 'Why', 'Challenges', 'Our mission', 'Outcome'].map(
        (label, index) => (
          <div key={index}>
            <button
              id={index}
              className="navbar-button"
              onClick={() => handleClick(index)}
            >
              {label}
            </button>
          </div>
        )
      )}

    
    <div><button className=' px-[1rem] py-[1.5rem] '>
    </button>{children}</div>
    
    </nav>
  )
}
