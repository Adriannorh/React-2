/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import '../css/Members.css';
import AddMemberForm from './AddMemberForm'; // Component for adding members

const Member = ({ member, onDelete }) => {
  // Each member now displays all details including the links
  return (
    <div className="member" key={member.memberNumber}>
      <h2>{member.firstName} {member.lastName}</h2>
      <p>Gender: {member.gender}</p>
      <p>Birth Year: {member.birthYear}</p>
      <p>Email: {member.email}</p>
      <button onClick={() => onDelete(member.memberNumber)}>Delete</button>
    </div>
  );
};


const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    setLoading(true); // Set loading to true when the fetch starts
    setError(null);   // Reset error state before starting new fetch
  
    fetch('/ga/members')
      .then(response => {
        if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
          return response.json();
        }
        // If response is not okay or not JSON, throw an error
        throw new Error(`Non-JSON response, status: ${response.status}`);
      })
      .then(data => {
        setMembers(data); // Assuming the data is an array of members
      })
      .catch(error => {
        console.error("Error fetching members:", error);
        setError(error.toString()); // Set the error state to display the error message
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the fetch completes
      });
  };
  
  

  const addMember = (newMember) => {
    fetch('/ga/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        gender: newMember.gender,
        birthYear: newMember.birthYear,
        email: newMember.email
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); 
    })
    .then(data => {
      setMembers(prevMembers => [...prevMembers, data]);
    })
    .catch(error => {
      console.error("Failed to add new member:", error);
    });
  };
  
  
  

  const deleteMember = (memberNumber) => {
    fetch(`/ga/members/${memberNumber}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + yourAuthToken, // Uncomment and replace with your actual auth token if needed
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text || 'Unknown error'); });
      }
      // Only try to parse the JSON if the response's status is ok and content is JSON
      if (response.headers.get("content-type")?.includes("application/json")) {
        return response.json();
      }
      return response.text(); // or simply return if you don't need the response text
    })
    .then(() => {
      // Assuming 'data' is the response from your server after deletion
      // Update the state accordingly
      setMembers(prevMembers => prevMembers.filter(member => member.memberNumber !== memberNumber));
    })
    .catch(error => {
      console.error("Failed to delete member:", error);
    });
  };
  
  
  
  

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <>
      <AddMemberForm onAddMember={addMember} />
      <ul className="members-list">
        {members.map((member) => (
          <Member key={member.memberNumber} member={member} onDelete={deleteMember} />
        ))}
      </ul>
    </>
  );
};

export default Members;
