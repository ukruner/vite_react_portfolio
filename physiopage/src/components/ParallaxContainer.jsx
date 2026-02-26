
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { switcherActions } from '../store/slices/switchers'
import { useRef, useEffect, useCallback } from 'react'
import mainStore from '../store'
import highlightButton from '../utils/highlightButton'
import { parallaxEntries } from './parallaxEntries'

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
        mainStore.dispatch(switcherActions.setRouteParallax(true));
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
                {parallaxEntries.map((entry, index) => {
                     return <ParallaxLayer speed={0.5} offset={index}>
                    <div className="main-body-container">
                        <h1 className="main-body-text">
                            {entry}
                            {index === 4 && <button aria-label='to-questionnaire' onClick={navigateQuestionnaire} className='main-body-button underline'>Get started</button>}
                        </h1>
                    </div>
                </ParallaxLayer>
                })}
               
            </Parallax>
        </div>
    )
}
