import { useTheme } from '../hooks/useTheme'
import modeIcon from '../assets/mode-icon.svg'

// styles
import './ThemeSelector.css'

const themeColors = ['#ed5b42', '#f4aa85', '#c3dae0']

export default function ThemeSelector() {

    const { changeColor, mode, changeMode } = useTheme()

    const toggleMode = () => {
        if (mode === 'dark') {
            changeMode('light')
        } else {
            changeMode('dark')
        }
    }

    return (
        <div className='theme-selector'>
            <div className='mode-toggle'>
                <img 
                    src={modeIcon} 
                    alt='dark/light toggle icon'
                    style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
                    onClick={toggleMode}
                />
            </div>

            <div className='theme-buttons'>
                {themeColors.map(color => (
                    <div 
                        key={color} 
                        onClick={() => changeColor(color)}
                        style={{ background: color}}
                    />
                ))}
            </div>
        </div>
    )
}