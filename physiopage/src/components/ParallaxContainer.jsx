
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { switcherActions } from '../store/slices/switchers'
import { useRef, useEffect, useCallback } from 'react'
import mainStore from '../store'
import highlightButton from '../utils/highlightButton'


export default function ParallaxContainer() {
  
    const scrollToValue = useSelector(
        (state) => state.switcherSlice.scrollToValue
    )

    const parallaxRef = useRef(null)

    const totalPages = 5

    const navigate = useNavigate();

    

    const handleScroll = useCallback(() => {
        if (parallaxRef.current) {
            const container = parallaxRef.current.container.current
            const scrollYProgress =
                container.scrollTop /
                ((container.scrollHeight + 1) - container.clientHeight)
            const pageOffset = scrollYProgress * totalPages
            const pageOffsetFormat = Math.floor(pageOffset)

            mainStore.dispatch(switcherActions.setNavBarLayer(pageOffsetFormat))

            highlightButton(pageOffsetFormat)
    
        }
    }, [totalPages])

    useEffect(() => {
        if (parallaxRef.current) {
            const container = parallaxRef.current.container.current
            container.addEventListener('scroll', handleScroll)
            return () => {
                container.removeEventListener('scroll', handleScroll)
            }
        }
    }, [handleScroll])

    useEffect(() => {
        if (parallaxRef.current && scrollToValue >= 0) {
            parallaxRef.current.scrollTo(scrollToValue)
        }
    }, [scrollToValue])

    function navigateQuestionnaire(){
        mainStore.dispatch(switcherActions.setRouteParallax());
        navigate('/questionnaire')
    }

    

    return (
        <div className="parallax">
            <Parallax pages={5} ref={parallaxRef}>
                <ParallaxLayer
                    offset={0}
                    speed={0}
                    factor={5}
                    className='background'
                    style={{
                        backgroundSize: 'cover', 
                    }}
                ></ParallaxLayer>
                <ParallaxLayer speed={0.5} offset={0}>
                    <div className="main-body-container">
                        <h1 className="main-body-text">
                            Health is the most important thing.
                        </h1>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer speed={0.5} offset={1}>
                    <div className="main-body-container">
                        <h1 className="main-body-text">
                            Musculoskeletal issues are extremely prevalent
                        </h1>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer speed={0.5} offset={2}>
                    <div className="main-body-container">
                        <h1 className="main-body-text">
                            Yet, after seeing a Physio, a lot of people struggle
                            with consistency of exercising
                        </h1>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer speed={0.5} offset={3}>
                    <div className="main-body-container">
                        <h1 className="main-body-text">
                            We created a tool that provides a little extra information and guidance.
                        </h1>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer speed={0.5} offset={4}>
                    <div className="main-body-container">
                        <h1 className="main-body-text">
                            So, you can see how other people perceive it, and
                            feel you are not alone<br></br>
                            Press <button onClick={navigateQuestionnaire} className='main-body-button underline'>here</button> for evaluation form
                        </h1>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}
