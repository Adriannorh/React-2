import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import LoginComponent from './LoginComponent';
import About from './pages/About';
import Contact from './pages/Contact';
import MembersAdmin from './MembersAdmin';
import MembersView from './MembersView';

function MainContent() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      navigate("/admin");
    }
  }, [loggedIn, navigate]);

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/"); 
  };

  return (
    <div>
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<MembersView />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {loggedIn ? (
            <Route path="/login" element={<Navigate to="/admin" />} />
        ) : (
            <Route path="/login" element={<LoginComponent onSuccessfulLogin={() => setLoggedIn(true)} />} />
        )}

        <Route path="/admin" element={loggedIn ? <MembersAdmin /> : <Navigate to="/login" />} /> 
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;