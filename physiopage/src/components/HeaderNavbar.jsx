import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import mainStore from '../store';
import { switcherActions } from '../store/slices/switchers';

export default function HeaderNavbar({asd, children}) {

    const parallaxRef = useSelector((state) => state.parallaxRef);


    

    // const [activeLayer, setActiveLayer] = useState(0);
    
    // useEffect((activeLayer)=>{

    // }, activeLayer)
    
    // useEffect(()=>{
    //     console.log(selectedId);
    // }, [selectedId])

    // const handleClick = (e) => {
    //     // scrollToLayer(e.target.id);
    //     const currentButton = e.target;
        
    //     const currentParent = e.target.closest('div');
    
    //     document.querySelectorAll('.navbar-active-button, .navbar-left-button, .navbar-right-button').forEach(btn => {
    //       btn.classList.remove('navbar-active-button', 'navbar-left-button', 'navbar-right-button');
    //     });
      
    //     document.querySelectorAll('.side-button-wrapper').forEach(parent => {
    //       parent.classList.remove('side-button-wrapper');
    //     });
    
    //     const leftButtonWrapper = currentParent.previousElementSibling;
    //     const rightButtonWrapper = currentParent.nextElementSibling;
    
    
    //     // const leftButtonWrapper = buttonLeft.querySelector('div');
    //     // const rightButtonWrapper = buttonRight.querySelector('div');
    
    //     const leftButton = leftButtonWrapper?.querySelector('button');
    
    //     const rightButton = rightButtonWrapper?.querySelector('button');
    
            
    
    //         // Get the computed style of the source element
    //         // const sourceBackgroundColor = window.getComputedStyle(sourceElement).backgroundImage;
    
    //         // Assign the background color to the button
            
            
    
    
    //     // const leftParent = leftButton.parentElement;
    //     // const rightParent = rightButton.parentElement;
    
    //     if (leftButton) {
    //       console.log('Left button:', leftButton.textContent);
    //       leftButton.classList.add('navbar-left-button');
    //       leftButtonWrapper.classList.add('side-button-wrapper'); 
    //       // leftButton.style.backgroundImage = sourceBackgroundColor;
    //     } else {
    //       console.log('No left button.');
    //     }
    
    //     if (rightButton) {
    //       console.log('Right button:', rightButton.textContent);
    //       rightButton.classList.add('navbar-right-button'); 
    //       rightButtonWrapper.classList.add('side-button-wrapper'); 
    //       // rightButton.style.backgroundImage = sourceBackgroundColor;
    //     } else {
    //       console.log('No right button.');
    //     }
    
    //     if (currentButton) {
    //       currentButton.classList.add('navbar-active-button'); 
    //     }
    //   };

    const handleClick = (index) => {
        
        mainStore.dispatch(switcherActions.setScrollToValue(index));

        document.querySelectorAll('.navbar-active-button, .navbar-left-button, .navbar-right-button').forEach(btn => {
          btn.classList.remove('navbar-active-button', 'navbar-left-button', 'navbar-right-button');
        });
      
        document.querySelectorAll('.side-button-wrapper').forEach(parent => {
          parent.classList.remove('side-button-wrapper');
        });


        const buttonList = document.querySelectorAll('.navbar-button');

        const buttonToChange = buttonList[index];

        const buttonParent = buttonToChange.closest('div');

        const leftButtonWrapper = buttonParent.previousElementSibling;
        const rightButtonWrapper = buttonParent.nextElementSibling;
    
    
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
    
        if (buttonToChange) {
          buttonToChange.classList.add('navbar-active-button'); 
        }
        
       
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
