import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" >
            <div className="container-fluid">
                
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    
                    <img 
                        src="/public/logo.png" 
                        alt="Logo do Aplicativo" 
                        width="30" 
                        height="30" 
                        className="d-inline-block align-top me-2" 
                    />
                    <span className="text-logo-color">Shingeki no Kyojin</span>

                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                
                    <ul className="navbar-nav ms-auto"> 
                        <li className="nav-item ms-4">
                            <Link className="nav-link" to='/'>Sobre</Link>
                        </li>
                        
                        <li className="nav-item ms-4">
                            <Link className="nav-link" to='/Characters'>Personagens</Link>
                        </li>
                        
                        <li className="nav-item ms-4">
                            <Link className="nav-link" to='/Episodes'>Episódios</Link>
                        </li>
                        
                        <li className="nav-item ms-4">
                            <Link className="nav-link" to='/Titans'>Titans</Link>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    )
}