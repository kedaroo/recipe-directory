import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

// components
import Searchbar from './Searchbar'

// styles
import './Navbar.css'

export default function Navbar() {

    const { color } = useTheme()
    
    return (
        <div className='navbar' style={{ background: color}}>
            <nav>
                <Link to='/' className='brand'>
                    <h1>recipe directory</h1>
                </Link>
                <Searchbar />
                <Link to='/create'>create recipe</Link>
            </nav>

        </div>
    )
}