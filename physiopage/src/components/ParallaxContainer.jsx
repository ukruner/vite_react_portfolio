import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useSelector } from 'react-redux';
export default function ParallaxContainer() {

    const marginTop = useSelector(state => state.marqueeSign.marqueeSign) ? '7rem' : '5rem';

  return (
    <div style={{top: marginTop}}  className='h-[100vh] w-[30rem]'>
        <Parallax pages={5}>
        <ParallaxLayer>
            <div style={{top: marginTop}} className='h-full w-full flex place-items-center align-middle'>
          <h1>Health is the most important thing.</h1></div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}>
          <h1>Musculoskeletal issues are extremely prevalent</h1>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.5}>
          <h1>Yet, after seeing a Physio, a lot of people struggle with consistency of exercising</h1>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.5}>
          <h1>We created a tool that rates the exercises given to you</h1>
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={0.5}>
          <h1>So, you can see how other people perceive it, and feel you are not alone</h1>
          </ParallaxLayer></Parallax>
    </div>
  )
}
