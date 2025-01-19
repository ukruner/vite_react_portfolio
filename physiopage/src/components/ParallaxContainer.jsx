import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useSelector } from 'react-redux';
import { switcherActions } from '../store/slices/switchers';
import { useState, useRef, useEffect, useCallback, forwardRef } from 'react';
import mainStore from '../store';

export default function ParallaxContainer() {

    const marginTop = useSelector(state => state.marqueeSign.marqueeSign) ? '7rem' : '5rem';

    const navBarLayerNumber = useSelector(state => state.switcherSlice.navBarLayer);

    const scrollToValue = useSelector(state => state.switcherSlice.scrollToValue);

    // const ref = useRef(null); // Ref to the Parallax component

    const parallaxRef = useRef(null);

    const totalPages = 5;

    // const [currentPage, setCurrentPage] = useState(0);
    
    const handleScroll = useCallback(() => {
    if (parallaxRef.current) {
    const container = parallaxRef.current.container.current;
    const scrollYProgress =
    container.scrollTop /
    (container.scrollHeight - container.clientHeight);
    const pageOffset = scrollYProgress * totalPages;
    const pageOffsetFormat = Math.floor(pageOffset)

    mainStore.dispatch(switcherActions.setNavBarLayer(pageOffsetFormat));
    handleClick(pageOffsetFormat);
    }
    }, [totalPages]);
    
    useEffect(() => {
    if (parallaxRef.current) {
    const container = parallaxRef.current.container.current;
    container.addEventListener("scroll", handleScroll);
        console.log(navBarLayerNumber);
    return () => {
    container.removeEventListener("scroll", handleScroll);
    };
    }
    }, [handleScroll]);

    useEffect(()=>{
        
        if (parallaxRef.current && scrollToValue >= 0){

            
            parallaxRef.current.scrollTo(scrollToValue)
            console.log("scrolling to", scrollToValue)
            console.log("ref body is", parallaxRef)
        }
    }
   
, [scrollToValue])






    // const [activeLayer, setActiveLayer] = useState(0);
    


    // const parallaxLayers = document.querySelectorAll(".main-body-container")
 
    const handleClick = (index) => {
        
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

    // const observer = new IntersectionObserver (entries => {
    //     entries.forEach( entry => {
    //         if (entry.isIntersecting) {
    //             handleClick(entry.target.current.offset);
    //             console.log(entry.target.current.offset);
    //             observer.unobserve(entry.target)
    //         }
    //         else{
    //             console.log('no element')
    //         }
    //     })
    // }, {threshold: 0.5})

    // parallaxLayers.forEach(
    //     (layer => observer.observe(layer))
    // )
    

  
  
    



  
  
  return (
    <div style={{top: marginTop}} className='h-screen'> 
       <Parallax pages={5} ref={parallaxRef} 
        
    //     onScroll={(e) => {
    // const currentPage = Math.round(e.target.scrollTop / window.innerHeight);
    // console.log(currentPage);
    // setActiveLayer(currentPage)}}
    >
            <ParallaxLayer offset={0} speed={0} factor={5}
            style={{
            backgroundImage: 'url(/patches_of_clouds_and_light_blue_sky_4k_5k_hd_light_blue.jpg)',
            backgroundSize: 'cover',
            opacity: 0.3,
           }}/>
            <ParallaxLayer speed={0.5} offset={0}  >
                <div className='main-body-container'>
                    <h1 className='main-body-text' >Health is the most important thing.</h1></div></ParallaxLayer>
   
                
            <ParallaxLayer speed={0.5} offset={1}  >
                <div className='main-body-container'><h1 className='main-body-text'>Musculoskeletal issues are extremely prevalent</h1></div></ParallaxLayer>
            <ParallaxLayer speed={0.5} offset={2} >
                <div className="main-body-container"><h1 className='main-body-text'>Yet, after seeing a Physio, a lot of people struggle with consistency of exercising</h1></div></ParallaxLayer>
            <ParallaxLayer speed={0.5} offset={3}   >
            <div className="main-body-container"><h1 className='main-body-text'>We created a tool that rates the exercises given to you</h1></div></ParallaxLayer>
            <ParallaxLayer speed={0.5} offset={4} >
            <div className="main-body-container"><h1 className='main-body-text'>So, you can see how other people perceive it, and feel you are not alone</h1></div></ParallaxLayer>
       </Parallax>

    </div>
  )
};

