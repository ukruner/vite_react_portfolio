import React from 'react'
import Marquee from "react-fast-marquee";
import { useSelector } from 'react-redux';

const MoveStuffAround = () => {

    const marquee = useSelector(state => state.marqueeSign.marqueeSign);
    // const marqueeActive = useSelector(state => state.swi)

   return <Marquee autoFill='true'>
        {marquee === "admin" && <img src='./public/robot.webp'  style={{width: '2rem', height: 'auto'}} alt="animated gif"></img>}
       {marquee === "exercise" && <img src='./public/exercise.gif' style={{width: '2rem', height: 'auto'}} alt="animated gif"></img>}
       {marquee === "info" && <img src='./public/info.jpg' style={{width: '2rem', height: 'auto'}} alt="animated gif"></img>}
    </Marquee>
}

export default MoveStuffAround