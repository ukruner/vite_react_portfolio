
import mainStore from '../../store'
import { switcherActions } from '../../store/slices/switchers'
import highlightButton from '../../utils/highlightButton'

export default function HeaderNavbar() {
    const navArray = ['Intro', 'Why', 'Challenges', 'Our mission', 'Outcome']

    const handleClick = (index) => {
        highlightButton(index)
        mainStore.dispatch(switcherActions.setScrollToValue(index))
    }

    return (
        <nav className="navbar-container">
            <div>
                <button className="side-button" aria-label='left-side'></button>
            </div>

            {navArray.map((label, index) => (
                <div key={index}>
                    <button
                        id={index}
                        className="navbar-button"
                        onClick={() => handleClick(index)}
                    >
                        {label}
                    </button>
                </div>
            ))}

            <div>
                <button className="side-button" aria-label='right-side'></button>
            </div>
        </nav>
    )
}
