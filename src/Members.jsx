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

    const fetchMembers = () => {
        axios.get('/ga/members')
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error("Error fetching members:", error);
            });
    };

    const handleDeleteMember = (memberNumber) => {
        const updatedMembers = members.filter(m => m.memberNumber !== memberNumber);
        setMembers(updatedMembers);
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

    const handleUpdateMember = () => {
        const updatedMembers = members.map(member => 
            member.memberNumber === selectedMemberNumber 
            ? {...member, ...memberData} 
            : member
        );
        setMembers(updatedMembers);
        setSelectedMemberNumber(null);
    };

    const handleAddMember = () => {
        const newMember = {
            ...memberData,
            memberNumber: Math.max(...members.map(m => m.memberNumber)) + 1 // Gir nytt medlem neste tilgjengelige medlemsnummer
        };
        setMembers([...members, newMember]);
        setMemberData({
            firstName: '',
            lastName: '',
            gender: '',
            birthYear: '',
            email: ''
        });
    };

    return (
        <div className="membersContainer">
            <h1>Medlemmer</h1>
    
            {!selectedMemberNumber && (
                <div className="memberForm">
                    <h2>Legg til nytt medlem</h2>
                    <input className="inputField" name="firstName" value={memberData.firstName} onChange={handleInputChange} placeholder="Fornavn" />
                    <input className="inputField" name="lastName" value={memberData.lastName} onChange={handleInputChange} placeholder="Etternavn" />
                    <input className="inputField" name="gender" value={memberData.gender} onChange={handleInputChange} placeholder="Kjønn (M/F)" maxLength="1" />
                    <input className="inputField" name="birthYear" value={memberData.birthYear} onChange={handleInputChange} placeholder="Fødselsår" type="number" />
                    <input className="inputField" name="email" value={memberData.email} onChange={handleInputChange} placeholder="E-post" />
                    <button className="button" onClick={handleAddMember}>Legg til</button>
                </div>
            )}
    
            <ul className="memberList">
                {members.map(member => (
                    <li key={member.memberNumber} className="memberItem">
                        <div className="memberDetails">
                            {member.firstName} {member.lastName} ({member.email})
                        </div>
                        <div>
                            <button className="button" onClick={() => handleSelectMember(member.memberNumber)}>Velg</button>
                            <button className="button" onClick={() => handleDeleteMember(member.memberNumber)}>Slett</button>
                        </div>
                    </li>
                ))}
            </ul>
    
            {selectedMemberNumber && (
                <div className="memberForm">
                    <h2>Rediger medlem #{selectedMemberNumber}</h2>
                    <input className="inputField" name="firstName" value={memberData.firstName} onChange={handleInputChange} placeholder="Fornavn" />
                    <input className="inputField" name="lastName" value={memberData.lastName} onChange={handleInputChange} placeholder="Etternavn" />
                    <input className="inputField" name="gender" value={memberData.gender} onChange={handleInputChange} placeholder="Kjønn (M/F)" maxLength="1" />
                    <input className="inputField" name="birthYear" value={memberData.birthYear} onChange={handleInputChange} placeholder="Fødselsår" type="number" />
                    <input className="inputField" name="email" value={memberData.email} onChange={handleInputChange} placeholder="E-post" />
                    <button className="button" onClick={handleUpdateMember}>Oppdater</button>
                    <button className="button" onClick={() => setSelectedMemberNumber(null)}>Avbryt</button>
                </div>
            )}
        </div>
    );
}    
export default Members;