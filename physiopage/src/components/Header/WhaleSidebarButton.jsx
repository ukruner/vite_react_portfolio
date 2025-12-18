
import { useState, useRef } from 'react'
import mainStore from '../../store'
import openSidebar from '../../utils/openSidebar'
import ReactFreezeframe from 'react-freezeframe'
import { switcherActions } from '../../store/slices/switchers'

export default function WhaleSidebarButton() {
    const [isHovered, setIsHovered] = useState(false)
    const freezeRef = useRef();

    const handleMouseEnter = () => {
        setIsHovered(true)
        freezeRef.current?.start();
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        freezeRef.current?.stop();
    }

  

    return (
        <button
            id="starterdiv"
            aria-label='grandparent-container'
            className="header-whale-container"
            onClick={()=>{openSidebar(); freezeRef.current.toggle();}}
             onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
        >
            <div
                aria-label='whale-parentcontainer'
                className={`header-sidebar-whale-button ${
                    isHovered &&
                    'rounded-tl-[9999px] rounded-tr-[9999px] bg-white'
                }`}
               
            >
                <ReactFreezeframe
                    src="/whale2.gif"
                    alt="moving whale"
                    className='w-[70rem]'
                    ref={freezeRef}
                    onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                    options={{
          trigger: 'hover'
    
        }}
                >


                    
                </ReactFreezeframe>
            </div>
            <div
                aria-label='text-parentcontainer'
                className={`header-sidebar-text-button ${
                    isHovered && 'rounded-tr-3xl bg-white'
                } `}
               onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Want to know more?
            </div>
        </button>
    )
}
