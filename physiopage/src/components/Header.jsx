import React from 'react'
import { Link } from 'react-router-dom'
import AuthBox from './AuthBox'
import { switcherActions } from '../store/slices/switchers'
import mainStore from '../store'

import { useRef } from 'react'
import WhaleSidebarButton from './whaleSidebarButton'
import HeaderNavbar from './HeaderNavbar'

export default function Header() {
    return (
        <header className="flex w-screen bg-blue-4">
            <div id="mainheader" className="header-container px-4">
                <WhaleSidebarButton></WhaleSidebarButton>
                <HeaderNavbar></HeaderNavbar>
                <AuthBox>Account</AuthBox>
            </div>
        </header>
    )
}
