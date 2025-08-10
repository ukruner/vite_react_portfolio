
import AuthBox from './AuthBox'
import WhaleSidebarButton from './WhaleSidebarButton'
import HeaderNavbar from './HeaderNavbar'

export default function Header() {
    return (
        <header className="main-header px-4 justify-between">
                <WhaleSidebarButton></WhaleSidebarButton>
                <HeaderNavbar></HeaderNavbar>
                <AuthBox>Account</AuthBox>
        </header>
    )
}
