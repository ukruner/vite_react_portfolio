
import AuthBox from './AuthBox'
import WhaleSidebarButton from './whaleSidebarButton'


export default function HeaderBlank() {
    return (
        <header className="main-header px-4 justify-between">
                <WhaleSidebarButton></WhaleSidebarButton>
                
                <AuthBox>Account</AuthBox>
        </header>
    )
}
