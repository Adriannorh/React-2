/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";
import InfoDisplay from "./InfoDisplay";


const MembersList = ({ members, onSelect, onDelete }) => (
  <ul className="memberList">
    {members.map((member) => (
      <li key={member.memberNumber} className="memberItem">
        <div className="memberDetails">
          {member.firstName} {member.lastName} ({member.email})
        </div>
        <div>
          <button className="button" onClick={() => onSelect(member.memberNumber)}>
            Velg
          </button>
          <button className="button" onClick={() => onDelete(member.memberNumber)}>
            Slett
          </button>
        </div>
      </li>
    ))}
  </ul>
);

const MemberForm = ({ memberData, onInputChange, onSubmit, onCancel, title, btnText }) => (
  <div className="memberForm">
    <h2>{title}</h2>
    {['firstName', 'lastName', 'gender', 'birthYear', 'email'].map((field, index) => (
      <input
        key={index}
        className="inputField"
        name={field}
        value={memberData[field]}
        onChange={onInputChange}
        placeholder={
          field === 'gender'
            ? "Kjønn (M/F)"
            : field.charAt(0).toUpperCase() + field.slice(1)
        }
        type={field === 'birthYear' ? 'number' : 'text'}
        maxLength={field === 'gender' ? 1 : undefined}
      />
    ))}
    <button className="button" onClick={onSubmit}>
      {btnText}
    </button>
    {onCancel && <button className="button" onClick={onCancel}>Avbryt</button>}
  </div>
);

export const Members = ({ members, setMembers, isLoggedIn }) => {
  const [selectedMemberNumber, setSelectedMemberNumber] = useState(null);
  const [memberData, setMemberData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthYear: "",
    email: "",
  });

  const handleDeleteMember = (memberNumber) => {
    const updatedMembers = members.filter((m) => m.memberNumber !== memberNumber);
    setMembers(updatedMembers);
  };

  const handleSelectMember = (memberNumber) => {
    const member = members.find((m) => m.memberNumber === memberNumber);
    setSelectedMemberNumber(memberNumber);
    setMemberData(member);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateMember = () => {
    const updatedMembers = members.map((member) =>
      member.memberNumber === selectedMemberNumber
        ? { ...member, ...memberData }
        : member
    );
    setMembers(updatedMembers);
    setSelectedMemberNumber(null);
  };

  const handleAddMember = () => {
    const newMember = {
      ...memberData,
      memberNumber: Math.max(...members.map((m) => m.memberNumber)) + 1,
    };
    setMembers([...members, newMember]);
    setMemberData({
      firstName: "",
      lastName: "",
      gender: "",
      birthYear: "",
      email: "",
    });
  };

  return (
    <div className="membersContainer">
      <h1>Medlemmer</h1>
      {!selectedMemberNumber ? (
        <MemberForm
          memberData={memberData}
          onInputChange={handleInputChange}
          onSubmit={handleAddMember}
          title="Legg til nytt medlem"
          btnText="Legg til"
        />
      ) : (
        <MemberForm
          memberData={memberData}
          onInputChange={handleInputChange}
          onSubmit={handleUpdateMember}
          onCancel={() => setSelectedMemberNumber(null)}
          title={`Rediger medlem #${selectedMemberNumber}`}
          btnText="Oppdater"
        />
      )}
      <MembersList members={members} onSelect={handleSelectMember} onDelete={handleDeleteMember} />
      <InfoDisplay loggedIn={isLoggedIn} />
    </div>
);

}
Members.propTypes = {
  members: PropTypes.array.isRequired,
  setMembers: PropTypes.func.isRequired,
};
