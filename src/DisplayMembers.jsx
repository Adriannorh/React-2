import PropTypes from 'prop-types';
import './css/DisplayMembers.css';

export const DisplayMembers = ({ members }) => {
    return (
        <div className="membersContainer">
            <h1>Medlemmer</h1>

            <ul className="displayMemberList">
                {members.map((member) => (
                    <li key={member.memberNumber} className="displayMemberItem">
                        <div className="memberDetails">
                            {member.firstName} {member.lastName} ({member.email})
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

DisplayMembers.propTypes = {
    members: PropTypes.arrayOf(
        PropTypes.shape({
            memberNumber: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        })
    ).isRequired
};
