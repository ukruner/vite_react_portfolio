import { useRef, useState } from 'react'
import { useScroll } from '@react-hooks-library/core'

export default function Demo() {
  const box = useRef(null)
  const [scroll, setScroll] = useState({ x: 0, y: 0 })

  useScroll(box, ({ scrollX, scrollY }) =>
    setScroll({ x: scrollX, y: scrollY })
  )

  return (
    <div ref={box} className='bg-green-300'>
      <div>Scroll Vertically and Horizontally</div>
      <div style={{ width: '200rem', height: '200rem' }}></div>
    </div>
  )
}