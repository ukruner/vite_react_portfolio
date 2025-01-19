import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useSelector } from 'react-redux';
import { switcherActions } from '../store/slices/switchers';
import { useState, useRef, useEffect, useCallback, forwardRef } from 'react';
import mainStore from '../store';
import highlightButton from '../utils/highlightButton';
export default function ParallaxContainer() {

    const marginTop = useSelector(state => state.marqueeSign.marqueeSign) ? '7rem' : '5rem';

    const scrollToValue = useSelector(state => state.switcherSlice.scrollToValue);

    const parallaxRef = useRef(null);

    const totalPages = 5;
    
    const handleScroll = useCallback(() => {
    if (parallaxRef.current) {
    const container = parallaxRef.current.container.current;
    const scrollYProgress =
    container.scrollTop /
    (container.scrollHeight - container.clientHeight);
    const pageOffset = scrollYProgress * totalPages;
    const pageOffsetFormat = Math.floor(pageOffset)

    mainStore.dispatch(switcherActions.setNavBarLayer(pageOffsetFormat));

    highlightButton(pageOffsetFormat);
    
    }
    }, [totalPages]);
    
    useEffect(() => {
    if (parallaxRef.current) {
        const container = parallaxRef.current.container.current;
        container.addEventListener("scroll", handleScroll);
    return () => {
        container.removeEventListener("scroll", handleScroll);
    };
    }
    }, [handleScroll]);

    useEffect(()=>{
        if (parallaxRef.current && scrollToValue >= 0){
            parallaxRef.current.scrollTo(scrollToValue)
        }
    }
, [scrollToValue])
  
  return (
    <div style={{top: marginTop}} className='h-screen'> 
       <Parallax pages={5} ref={parallaxRef}>
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

