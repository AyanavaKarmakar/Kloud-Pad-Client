import { Link, useLocation } from "react-router-dom";


const Navbar = () => {

    let location = useLocation();

    //  useEffect(() => {
    //      console.log(location.pathname);
    //  }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/home">Kloud Pad</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>+
                            </li>
                        </ul>
                    </div>
                    <Link onClick={handleLogout} className="btn btn-lg btn-outline-danger" to="/" role="button">Logout</Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar