import { Link } from "react-router-dom";
import "./css/Navbar.css";

// eslint-disable-next-line react/prop-types
function Navbar({ loggedIn, onLogout }) {
  return (
    <nav className="navbar">
      {loggedIn && <Link to="/members">Members</Link>}
      {loggedIn && <Link to="/races">Races</Link>}
      {loggedIn && <Link to="/results">Results</Link>}
      {!loggedIn && <Link to="/">Home</Link>}
      {!loggedIn && <Link to="/about">About</Link>}
      {!loggedIn && <Link to="/contact">Contact</Link>}
      {!loggedIn ? (
        <Link to="/login">Logg inn</Link>
      ) : (
        <>
          <button onClick={onLogout}>Logg ut</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
