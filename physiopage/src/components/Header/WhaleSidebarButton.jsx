import React from 'react'
import { useState } from 'react'
import mainStore from '../../store'
import ReactFreezeframe from 'react-freezeframe'
import { switcherActions } from '../../store/slices/switchers'

export default function WhaleSidebarButton() {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    function openSideBar() {
        mainStore.dispatch(switcherActions.setIsSidebarOpen())
    }

    return (
        <button
            id="starterdiv"
            className="header-whale-container"
            onClick={openSideBar}
        >
            <div
                
                className={`header-sidebar-whale-button ${
                    isHovered &&
                    'rounded-tl-[9999px] rounded-tr-[9999px] bg-white'
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <ReactFreezeframe
                    src="/whale2.gif"
                    alt="moving whale"
                ></ReactFreezeframe>
            </div>
            <div
            
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
