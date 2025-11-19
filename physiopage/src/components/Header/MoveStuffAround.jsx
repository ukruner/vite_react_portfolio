
import Marquee from 'react-fast-marquee'
import { useSelector } from 'react-redux'
import MarqueeImage from './MarqueeImage';

const MoveStuffAround = () => {
    const marqueeActive = useSelector((state) => state.switcherSlice.isMarqueeActive);
    const marqueeName = useSelector((state) => state.marqueeSign.marqueeSign)

    return (
        <div className=''>{marqueeActive && <Marquee autoFill="true">
            {marqueeName === 'admin' && (
                <MarqueeImage picPath={'./robot.webp'}/>
            )}
            {marqueeName === 'exercise' && (
                <MarqueeImage picPath='./exercise.gif'/>
            )}
            {marqueeName === 'info' && (
                <MarqueeImage picPath={'./info.jpg'}/>
            )}
        </Marquee>}</div>
    )
}

export default MoveStuffAround
