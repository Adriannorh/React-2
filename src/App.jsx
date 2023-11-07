import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginComponent from './LoginComponent';
import Navbar from './Navbar';
import About from './pages/About'
import Contact from './pages/Contact'
import AddMemberForm from './Componenter/AddMemberForm'; // Assuming you've created this component
import MembersList from './Componenter/MembersList';
import Races from './Componenter/Races'; 
import Results from './Componenter/Results';
import ReadOnlyView from './Componenter/ReadOnlyView';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [members, setMembers] = useState([]); // State for members data
  const fetchMembers = async () => {
    try {
      const response = await fetch('/ga/members');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  useEffect(() => {
    if (loggedIn) {
        fetchMembers();
    }
  }, [loggedIn]);

  const handleSuccessfulLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken'); // Clear the session storage or any auth tokens
    setLoggedIn(false);
  };

  const addMember = (newMember) => {
    setMembers([...members, newMember]);
  };

  const deleteMember = (memberId) => {
    setMembers(members.filter(member => member.memberNumber !== memberId));
  };

  return (
    <Router>
      <div>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<ReadOnlyView />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={!loggedIn ? <LoginComponent onSuccessfulLogin={handleSuccessfulLogin} /> : <Navigate replace to="/members" />} />
          
          {/* Protected routes */}
          <Route path="/members" element={loggedIn ? (
            <>
              <AddMemberForm onAddMember={addMember} />
              <MembersList members={members} onDeleteMember={deleteMember} />
            </>
          ) : <Navigate replace to="/login" />} />
          <Route path="/races" element={loggedIn ? <Races /> : <Navigate replace to="/login" />} />
          
          {/* Results Route */}
          <Route path="/results" element={loggedIn ? <Results /> : <Navigate replace to="/login" />} />
          
          {/* If no other route matches, fall back to the home page */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => <h1>Home Page</h1>;

export default App;
