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
    const marginTop = useSelector((state) => state.marqueeSign.marqueeSign)
        ? '7rem'
        : '5rem'

    return (
        <div
            id="container"
            className="fixed z-[100] flex"
            style={{ top: marginTop, height: `calc(100vh - ${marginTop})` }}
        >
            <aside
                className={` ${isSidebarClicked ? 'h-full' : 'h-0'} sidebar`}
            >
                {isSidebarClicked && (
                    <div className="flex h-auto w-72 justify-end">
                        <div className="m-auto mt-10 flex h-full px-8 text-stone-50 ">
                            Sidebar Want to learn about Want to learn
                            boutddddddsdfsdfsdfsddsg
                        </div>
                        <button
                            className="mr-3 mt-3 inline-flex h-5 w-5 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-1"
                            type="button"
                            onClick={openSideBar}
                        >
                            x
                        </button>
                    </div>
                )}
            </aside>
            {/* <button onClick={openSideBar} className={`${isSidebarClicked ? 'left-72' : 'left-0' } sidebar-button `}>{isSidebarClicked ? '<' : '>'}</button> */}
        </div>
    )
}
