import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import LoginComponent from "./LoginComponent";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ParentComponent from "./ParentComponent";
import Races from "./Races.jsx";
import Results from "./Results.jsx";
import InfoDisplay from "./InfoDisplay.jsx";

function MainContent() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  /*   useEffect(() => {
    if (loggedIn) {
      navigate("/admin");
    }
  }, [loggedIn, navigate]); */

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/");
  };
  const handleLoginSuccess = () => {
    setLoggedIn(true);
    navigate("/members");
  };

  return (
    <div>
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<InfoDisplay />} />
        <Route
          path="/races"
          element={
            loggedIn ? <Races loggedIn={loggedIn} /> : <Navigate to="/login" />
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/results"
          element={loggedIn ? <Results /> : <Navigate to="/login" />}
        />
        <Route
          path="/members"
          element={
            loggedIn ? (
              <ParentComponent loggedIn={loggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {loggedIn ? (
          <Route path="/login" element={<Navigate to="/admin" />} />
        ) : (
          <Route
            path="/login"
            element={<LoginComponent onSuccessfulLogin={handleLoginSuccess} />}
          />
        )}

        <Route
          path="/admin"
          element={loggedIn ? <About /> : <Navigate to="/login" />}
        />
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
