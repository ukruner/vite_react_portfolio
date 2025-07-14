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
      const marginTop = 200; // ~5rem
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
       
            id="container"
            className='sidebar-grandparent fixed h-full '
        >
            <aside className={`sidebar-container ${isSidebarClicked ? 'opacity-100 max-h-screen h-full' : 'opacity-0 h-0 max-h-0'}`} style={{
                transition: 'max-height 1s ease, opacity 0.4s ease'
            }}>
             
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
