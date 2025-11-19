
import AuthBox from './AuthBox'
import WhaleSidebarButton from './WhaleSidebarButton'


export default function HeaderBlank() {
    return (
        <header className="main-header">
                <WhaleSidebarButton></WhaleSidebarButton>
                
                <AuthBox>Account</AuthBox>
        </header>
    )
}
