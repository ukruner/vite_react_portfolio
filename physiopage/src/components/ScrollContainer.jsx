import React, { useRef, useEffect } from 'react'
import { useSprings, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import clamp from 'lodash.clamp'


const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',

  'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]

function Viewpager() {
  const index = useRef(0)
  const [ref, { width }] = useMeasure()
  const [props, api] = useSprings(
    pages.length,
    i => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: 'block',
    }),
    [width]
  )

  const handleScroll = (e) => {
    const scrollX = e.target.scrollLeft
    const scrollFactor = 2 // Adjust this to make images stay longer (2x width in this case)
    const newIndex = clamp(Math.round(scrollX / (width * scrollFactor)), 0, pages.length - 1)
    if (newIndex !== index.current) {
      index.current = newIndex
      api.start(i => {
        if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
        const x = (i - index.current) * width
        return { x, scale: 1, display: 'block' }
      })
    }
  }

  useEffect(() => {
    api.start(i => ({
      x: i * width,
      scale: 1,
      display: 'block',
    }))
  }, [width, api])

  return (
    <div ref={ref} className='wrapper' onScroll={handleScroll} style={{ overflowX: 'scroll', display: 'flex' }}>
      {props.map(({ x, display, scale }, i) => (
        <animated.div className='page' key={i} style={{ display, transform: x.to(x => `translateX(${x}px)`) }}>
          <animated.div style={{ scale, backgroundImage: `url(${pages[i]})` }} />
        </animated.div>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <div className='container'>
      <Viewpager />
    </div>
  )
}
