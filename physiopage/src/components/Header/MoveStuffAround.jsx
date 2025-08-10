
import Marquee from 'react-fast-marquee'
import { useSelector } from 'react-redux'

const MoveStuffAround = () => {
    const marqueeActive = useSelector((state) => state.switcherSlice.isMarqueeActive);
    const marqueeName = useSelector((state) => state.marqueeSign.marqueeSign)

    return (
        <div className='flex w-screen h-full'>{marqueeActive && <Marquee autoFill="true">
            {marqueeName === 'admin' && (
                <img
                    src="./robot.webp"
                    style={{ width: '2rem', height: 'auto' }}
                    alt="animated gif"
                ></img>
            )}
            {marqueeName === 'exercise' && (
                <img
                    src="./exercise.gif"
                    style={{ width: '2rem', height: 'auto' }}
                    alt="animated gif"
                ></img>
            )}
            {marqueeName === 'info' && (
                <img
                    src="./info.jpg"
                    style={{ width: '2rem', height: 'auto' }}
                    alt="animated gif"
                ></img>
            )}
        </Marquee>}</div>
    )
}

export default MoveStuffAround
