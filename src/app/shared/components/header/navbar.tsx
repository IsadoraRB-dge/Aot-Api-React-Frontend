import {Link} from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav >
            <ul>
               
                 <li>
                    <Link to='/'>Home</Link>
                    <Link to='/Characters'>Characters</Link>
                    <Link to='/Episodes'>Episodes</Link>
                    <Link to='/Titans'>Titans</Link>
                </li>

            </ul>
        </nav>
    )
}