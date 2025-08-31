import mainStore from '../store'
import { useSelector } from 'react-redux'
import { switcherActions } from '../store/slices/switchers'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthToken } from '../utils/auth'

export default function Sidebar() {
    const [offset, setOffset] = useState()
    const ref = useRef(null)

    const isSidebarOpen = useSelector(
        (state) => state.switcherSlice.isSidebarOpen
    )

    const token = getAuthToken()

    const navigate = useNavigate()

    useEffect(() => {
        function updateOffset() {
            if (ref.current) {
                const height = ref.current.offsetHeight
                const marginTop = 200
                setOffset(height - marginTop)
            }
        }

        updateOffset()

        window.addEventListener('resize', updateOffset)

        return () => window.removeEventListener('resize', updateOffset)
    }, [])

    useEffect(() => {
        const savedSidebarBool = sessionStorage.getItem('sidebarOpen')
        if (savedSidebarBool) {
            mainStore.dispatch(switcherActions.setIsSidebarOpen())

            setTimeout(() => {
                sessionStorage.removeItem('sidebarOpen')
            }, 0)
            console.log(isSidebarOpen)
        }
    }, [mainStore.dispatch])

    function openSideBar() {
        mainStore.dispatch(switcherActions.setIsSidebarOpen())
    }
    const isSidebarClicked = useSelector(
        (state) => state.switcherSlice.isSidebarOpen
    )

    function navigateAuth() {
        mainStore.dispatch(switcherActions.setRouteSidebar())
        navigate('/auth')
    }

    return (
        <div
            id="container"
            className={`sidebar-grandparent fixed ${
                isSidebarClicked ? 'h-full max-h-full' : 'h-0 max-h-0'
            }`}
        >
            <aside
                className={`sidebar-container ${
                    isSidebarClicked
                        ? 'h-full max-h-screen opacity-100'
                        : 'h-0 max-h-0 opacity-0'
                }`}
                style={{
                    transition: 'max-height 1s ease, opacity 0.4s ease',
                }}
            >
                <div className="sidebar-text flex-[0_0_90%]">
                    Want to learn more about your health?
                    <br></br>
                    <br></br>
                    {token ? (
                        <div></div>
                    ) : (
                        <button onClick={navigateAuth}>
                            Press here to log in or register with us
                        </button>
                    )}
                </div>
                <div className="sidebar-button-wrapper">
                    <button
                        className="sidebar-button"
                        type="button"
                        onClick={openSideBar}
                    >
                        x
                    </button>
                </div>
            </aside>
        </div>
    )
}
