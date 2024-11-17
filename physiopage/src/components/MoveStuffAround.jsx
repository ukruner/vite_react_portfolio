import React from 'react'
import Marquee from "react-fast-marquee";
import { useSelector } from 'react-redux';

const MoveStuffAround = () => {

    const marquee = useSelector(state => state.marqueeSign.marqueeSign);


   return <Marquee className='bg-gradient-to-r from-sky-700 to-sky-300' autoFill='true'>
        {marquee === "admin" && <img src='./public/phone.webp' style={{background: 'transparent'}} width='35rem' height='auto' alt="animated gif"></img>}
       {marquee === "exercise" && <img src='./public/exercise.gif' width='35rem' height='auto' alt="animated gif"></img>}
       {marquee === "info" && <img src='./public/info.jpg' width='35rem' height='auto' alt="animated gif"></img>}
    </Marquee>
}

export default MoveStuffAround