import React from 'react'
import { useState, useEffect } from 'react';

export default function HeaderNavbar({asd, selectedId, scrollToLayer}) {

    // const [activeLayer, setActiveLayer] = useState(0);
    
    // useEffect((activeLayer)=>{

    // }, activeLayer)
    

    const handleClick = (e) => {
        scrollToLayer(e.target.id);
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
    
            
    
            // Get the computed style of the source element
            // const sourceBackgroundColor = window.getComputedStyle(sourceElement).backgroundImage;
    
            // Assign the background color to the button
            
            
    
    
        // const leftParent = leftButton.parentElement;
        // const rightParent = rightButton.parentElement;
    
        if (leftButton) {
          console.log('Left button:', leftButton.textContent);
          leftButton.classList.add('navbar-left-button');
          leftButtonWrapper.classList.add('side-button-wrapper'); 
          // leftButton.style.backgroundImage = sourceBackgroundColor;
        } else {
          console.log('No left button.');
        }
    
        if (rightButton) {
          console.log('Right button:', rightButton.textContent);
          rightButton.classList.add('navbar-right-button'); 
          rightButtonWrapper.classList.add('side-button-wrapper'); 
          // rightButton.style.backgroundImage = sourceBackgroundColor;
        } else {
          console.log('No right button.');
        }
    
        if (currentButton) {
          currentButton.classList.add('navbar-active-button'); 
        }
      };
  return (
    <nav className={`flex  place-items-end ${asd}`}>
    
    <div><button className='px-[1rem] py-[1.5rem] '>
      
    </button></div>
      
    {['Intro', 'Why', 'Challenges', 'Our mission', 'Outcome', 'To the form'].map(
        (label, index) => (
          <div key={index}>
            <button
              id={index}
              className={`navbar-button ${
                selectedId === index ? 'navbar-active-button' : ''
              }`}
              onClick={handleClick}
            >
              {label}
            </button>
          </div>
        )
      )}

    
    <div><button className=' px-[1rem] py-[1.5rem] '>
    </button></div>
    
    </nav>
  )
}
