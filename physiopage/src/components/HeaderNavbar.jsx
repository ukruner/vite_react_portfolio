import React from 'react'
import mainStore from '../store';
import { switcherActions } from '../store/slices/switchers';
import highlightButton from '../utils/highlightButton';

export default function HeaderNavbar() {

    const navArray = ['Intro', 'Why', 'Challenges', 'Our mission', 'Outcome'];

    const handleClick = (index) => {
        
        highlightButton(index);
        mainStore.dispatch(switcherActions.setScrollToValue(index));

        
    
      };

  return (
    <nav className='flex  place-items-end'>
    
    <div><button className='px-[1rem] py-[1.5rem] '>
      
    </button></div>
      
    {navArray.map(
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
    </button>
    </div>
    </nav>
  )
}
