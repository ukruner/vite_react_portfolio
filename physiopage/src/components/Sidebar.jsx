import React from 'react'
import mainStore from '../store'
import { useSelector } from 'react-redux'
import { switcherActions } from '../store/slices/switchers'
import { Fragment } from 'react'
import { useRef, useState, useEffect } from 'react'

export default function Sidebar() {

    const [offset, setOffset] = useState();
const ref = useRef(null);

useEffect(() => {
  function updateOffset() {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      const marginTop = 72; // ~5rem
      setOffset(height - marginTop);
    }
  }

  // Run once on mount
  updateOffset();

  // Run on resize
  window.addEventListener('resize', updateOffset);

  // Clean up on unmount
  return () => window.removeEventListener('resize', updateOffset);
}, []);


    function openSideBar() {
        mainStore.dispatch(switcherActions.setIsSidebarOpen())
    }
    const isSidebarClicked = useSelector(
        (state) => state.switcherSlice.isSidebarOpen
    )
    const marginTop = useSelector((state) => state.switcherSlice.isMarqueeActive)
        ? 112
        : 80

    return (
        <div
        ref={ref}
            id="container"
            className='sidebar-grandparent absolute h-[100dvh]'
                
            style={{
        transform: isSidebarClicked
          ? `translateY(-${offset}px)` // visible
          : `translateY(-200dvh)`, // hidden (mostly off-screen)
        opacity: isSidebarClicked ? 1 : 1,
        transition: 'transform 1s ease, opacity 1s ease',
      }}
            
        >
            <aside className='sidebar-container'>
             
                <div className="sidebar-text flex-[0_0_90%]">
                    Sidebar Want to learn about Want to learn
                    boutddddddsdfsdfsdfsddsg
                </div>
            <div className='side-button-wrapper'> 
                <button
                    className="sidebar-button"
                    type="button"
                    onClick={openSideBar}
                >
                    x
                </button></div>
            </aside>
        </div>
    )
}
