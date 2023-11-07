/* eslint-disable react/prop-types */
import '../css/MembersList.css';

const MembersList = ({ members, onDeleteMember }) => {
    const handleDelete = async (memberNumber) => {
      try {
        const response = await fetch(`/ga/members/${memberNumber}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Problem deleting member');
        onDeleteMember(memberNumber); // Updates the state in the parent component
      } catch (error) {
        console.error('Failed to delete member:', error);
      }
    };
  
    return (
      <div className="members-list">
        {members.map((member) => (
          <div className="member-item" key={member.memberNumber}>
                    <h2>{member.firstName} {member.lastName}</h2>
                    <p>Gender: {member.gender}</p>
                    <p>Birth Year: {member.birthYear}</p>
                    <p>Email: {member.email}</p>
                    {/* Render additional member details here */}
                    {/* Links rendering has been removed */}
                    <button onClick={() => handleDelete(member.memberNumber)}>Delete</button>
                </div>
        ))}
      </div>
    );
  };
  
  export default MembersList;
  