import React from 'react'
import { Link } from 'react-router-dom'
// import AuthBox from '../AuthBox'
import AuthBox from './AuthBox'
// import { switcherActions } from '../../store/slices/switchers'
import mainStore from '../../store'

import { useRef } from 'react'
import WhaleSidebarButton from './whaleSidebarButton'
import HeaderNavbar from './HeaderNavbar'

export default function HeaderBlank() {
    return (
        <header className="main-header px-4 justify-between">
                <WhaleSidebarButton></WhaleSidebarButton>
                
                <AuthBox>Account</AuthBox>
        </header>
    )
}
