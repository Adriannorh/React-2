import axios from 'axios';
import { useState, useEffect } from 'react';

function MembersAdmin() {
    const [members, setMembers] = useState([]);
    const [tempMembers, setTempMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [memberDetails, setMemberDetails] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        birthYear: '',
        email: ''
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:3006/ga/members');
            setMembers(response.data);
            setTempMembers([...response.data]); // Create a shallow copy for frontend manipulations
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleAddMember = async () => {
        try {
            const response = await axios.post('http://localhost:3006/ga/members', memberDetails);
            setTempMembers([...tempMembers, response.data]);
            setMemberDetails({
                firstName: '',
                lastName: '',
                gender: '',
                birthYear: '',
                email: ''
            });
        } catch (error) {
            setError('Error adding member: ' + error.message);
        }
    };

    const handleDeleteMember = (memberNumber) => {
        setTempMembers(tempMembers.filter(member => member.id !== memberNumber));
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="membersContainer">
            <h2>Admin: Members</h2>

            {/* Add Member Form */}
            <div className="memberForm">
                <input
                    placeholder="First Name"
                    value={memberDetails.firstName}
                    onChange={(e) => setMemberDetails({ ...memberDetails, firstName: e.target.value })}
                />
                <input
                    placeholder="Last Name"
                    value={memberDetails.lastName}
                    onChange={(e) => setMemberDetails({ ...memberDetails, lastName: e.target.value })}
                />
                <input
                    placeholder="Gender (M/F)"
                    maxLength="1"
                    value={memberDetails.gender}
                    onChange={(e) => setMemberDetails({ ...memberDetails, gender: e.target.value })}
                />
                <input
                    placeholder="Birth Year (yyyy)"
                    maxLength="4"
                    value={memberDetails.birthYear}
                    onChange={(e) => setMemberDetails({ ...memberDetails, birthYear: e.target.value })}
                />
                <input
                    placeholder="Email"
                    value={memberDetails.email}
                    onChange={(e) => setMemberDetails({ ...memberDetails, email: e.target.value })}
                />
                <button onClick={handleAddMember}>Add Member</button>
            </div>

            <ul className="memberList">
                {members.map(member => (
                    <li key={member.memberNumber} className="memberItem">
                        <div className="memberDetails">
                            <div>{member.firstName} {member.lastName}</div>
                            <div>({member.gender}, {member.birthYear})</div>
                            <div>{member.email}</div>
                        </div>
                        <button onClick={() => { console.log('Attempting to delete:', member.memberNumber); handleDeleteMember(member.memberNumber); }}>Delete</button>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MembersAdmin;
