import React from 'react'
import mainStore from '../store'
import { useSelector } from 'react-redux'
import { switcherActions } from '../store/slices/switchers'
import { Fragment } from 'react'
export default function Sidebar() {
    function openSideBar() {
        mainStore.dispatch(switcherActions.setIsSidebarOpen())
    }
    const isSidebarClicked = useSelector(
        (state) => state.switcherSlice.isSidebarOpen
    )
    const marginTop = useSelector((state) => state.switcherSlice.isMarqueeActive)
        ? '7rem'
        : '5rem'

    return (
        <div
            id="container"
            className={`sidebar-grandparent top-[${marginTop}] mt-[${marginTop}] ${
                isSidebarClicked
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-full opacity-100'
            } `}
        >
            <aside className={`sidebar-container top-[${marginTop}]`}>
                <div className="sidebar-text">
                    Sidebar Want to learn about Want to learn
                    boutddddddsdfsdfsdfsddsg
                </div>
                <button
                    className="sidebar-button"
                    type="button"
                    onClick={openSideBar}
                >
                    x
                </button>
            </aside>
        </div>
    )
}
