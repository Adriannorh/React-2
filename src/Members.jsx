import { useState, useEffect } from 'react';
import axios from 'axios';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [selectedMemberNumber, setSelectedMemberNumber] = useState(null);
    const [memberData, setMemberData] = useState({
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
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    const handleDeleteMember = async (memberNumber) => {
        try {
            await axios.delete(`http://localhost:3006/ga/members/${memberNumber}`);
            fetchMembers();
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    const handleSelectMember = (memberNumber) => {
        const member = members.find(m => m.memberNumber === memberNumber);
        setSelectedMemberNumber(memberNumber);
        setMemberData(member);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMemberData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div>
            <h1>Medlemmer</h1>
            <ul>
                {members.map(member => (
                    <li key={member.memberNumber}>
                        {member.firstName} {member.lastName} ({member.email})
                        <button onClick={() => handleSelectMember(member.memberNumber)}>Velg</button>
                        <button onClick={() => handleDeleteMember(member.memberNumber)}>Slett</button>
                    </li>
                ))}
            </ul>

            {selectedMemberNumber && (
                <div>
                    <h2>Rediger medlem #{selectedMemberNumber}</h2>
                    <input name="firstName" value={memberData.firstName} onChange={handleInputChange} placeholder="Fornavn" />
                    <input name="lastName" value={memberData.lastName} onChange={handleInputChange} placeholder="Etternavn" />
                    <input name="gender" value={memberData.gender} onChange={handleInputChange} placeholder="Kjønn (M/F)" maxLength="1" />
                    <input name="birthYear" value={memberData.birthYear} onChange={handleInputChange} placeholder="Fødselsår" type="number" />
                    <input name="email" value={memberData.email} onChange={handleInputChange} placeholder="E-post" />
                    {/* Legg til knapper for å lagre endringer, avbryte osv. */}
                </div>
            )}
        </div>
    );
};

export default Members;
