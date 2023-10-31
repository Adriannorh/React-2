// MembersView.jsx

import axios from 'axios';
import { useState, useEffect } from 'react';

function MembersView() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:3006/ga/members');
            setMembers(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="membersContainer">
            <h2>Members</h2>
    
            <ul className="memberList">
                {members.map(member => (
                    <li key={member.memberNumber} className="memberItem">
                        <div className="memberDetails">
                            <div>{member.firstName} {member.lastName}</div>
                            <div>({member.gender}, {member.birthYear})</div>
                            <div>{member.email}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MembersView;
