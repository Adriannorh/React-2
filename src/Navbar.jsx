import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Navbar({ loggedIn, onLogout }) {
    return (
        <nav className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            {!loggedIn ? (
                <Link to="/login">Logg inn</Link>
            ) : (
                <>
                    <Link to="/admin">Admin</Link>
                    <button onClick={onLogout}>Logg ut</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;
