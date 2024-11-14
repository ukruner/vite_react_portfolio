import React from 'react'
import Marquee from "react-fast-marquee";
import { useSelector } from 'react-redux';

const MoveStuffAround = () => {

    const marquee = useSelector(state => state.marqueeSign.marqueeSign);


   return <Marquee className=' bg-gradient-to-r from-sky-300 to-sky-600' autoFill='true'>
    TestText
        {marquee === "admin" && <img src='./public/phone.webp' style={{background: 'transparent'}} width='50rem' height='auto' alt="animated gif"></img>}
       {marquee === "exercise" && <img src='./public/exercise.gif' width='50rem' height='50rem' alt="animated gif"></img>}
       {marquee === "info" && <img src='./public/info.jpg' width='50rem' height='50rem' alt="animated gif"></img>}
    </Marquee>
}

export default MoveStuffAround