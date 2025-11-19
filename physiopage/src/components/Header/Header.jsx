
import AuthBox from './AuthBox'
import WhaleSidebarButton from './WhaleSidebarButton'
import HeaderNavbar from './HeaderNavbar'

export default function Header() {
    return (
        <header className="main-header">
                <WhaleSidebarButton></WhaleSidebarButton>
                <HeaderNavbar></HeaderNavbar>
                <AuthBox>Account</AuthBox>
        </header>
    )
}
