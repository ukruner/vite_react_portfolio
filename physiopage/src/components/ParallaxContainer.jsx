import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useSelector } from 'react-redux';
import HeaderNavbar from './HeaderNavbar';

import { useState, useRef, useEffect } from 'react';

export default function ParallaxContainer() {

  

    const marginTop = useSelector(state => state.marqueeSign.marqueeSign) ? '7rem' : '5rem';


    const parallaxRef = useRef(null); // Ref to the Parallax component
    const [activeLayer, setActiveLayer] = useState(0);
  
    // useEffect(() => {
    //   const parallaxContainer = parallaxRef.current.container; // Direct access to container
  
    //   const handleScroll = () => {
    //     if (parallaxContainer) {
    //       const scrollPosition = parallaxContainer.scrollTop;
    //       const currentPage = Math.round(scrollPosition / window.innerHeight);
    //       setActiveLayer(currentPage);
    //     }
    //   };
  
    //   if (parallaxContainer) {
    //     parallaxContainer.addEventListener('scroll', handleScroll);
    //   }
  
    //   // Cleanup
    //   return () => {
    //     if (parallaxContainer) {
    //       parallaxContainer.removeEventListener('scroll', handleScroll);
    //     }
    //   };
    // }, []);
  
    const scrollToLayer = (index) => {
      if (parallaxRef.current) {
        parallaxRef.current.scrollTo(index);
      }
    };
  
  return (
    <div style={{top: marginTop}} className='h-screen'> 
        <HeaderNavbar asd='mt-[10rem] z-50 ml-[15rem]' selectedId={activeLayer} scrollToLayer={scrollToLayer}></HeaderNavbar>
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
            <ParallaxLayer speed={0.5} offset={0} className='main-body-container' >
                    <h1 className='main-body-text' >Health is the most important thing.</h1></ParallaxLayer>
   
                
            <ParallaxLayer speed={0.5} offset={1} className='main-body-container' >
                <h1 className='main-body-text'>Musculoskeletal issues are extremely prevalent</h1></ParallaxLayer>
            <ParallaxLayer speed={0.5} offset={2} className='main-body-container' >
                <h1 className='main-body-text'>Yet, after seeing a Physio, a lot of people struggle with consistency of exercising</h1></ParallaxLayer>
            <ParallaxLayer speed={0.5} offset={3}  className='main-body-container' >
                <h1 className='main-body-text'>We created a tool that rates the exercises given to you</h1></ParallaxLayer>
            <ParallaxLayer speed={0.5} offset={4}  className='main-body-container' >
                <h1 className='main-body-text'>So, you can see how other people perceive it, and feel you are not alone</h1></ParallaxLayer>
       </Parallax>
    </div>
  )
}
