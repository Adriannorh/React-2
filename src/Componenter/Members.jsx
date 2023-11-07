/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../css/Members.css";
import AddMemberForm from "./AddMemberForm";

const Member = ({ member, onDelete }) => {
  return (
    <div className="member" key={member.memberNumber}>
      <h2>
        {member.firstName} {member.lastName}
      </h2>
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
    setLoading(true);
    setError(null);

    fetch("/ga/members")
      .then((response) => {
        if (
          response.ok &&
          response.headers.get("Content-Type").includes("application/json")
        ) {
          return response.json();
        }

        throw new Error(`Non-JSON response, status: ${response.status}`);
      })
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
        setError(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addMember = (newMember) => {
    fetch("/ga/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        gender: newMember.gender,
        birthYear: newMember.birthYear,
        email: newMember.email,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMembers((prevMembers) => [...prevMembers, data]);
      })
      .catch((error) => {
        console.error("Failed to add new member:", error);
      });
  };

  const deleteMember = (memberNumber) => {
    fetch(`/ga/members/${memberNumber}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || "Unknown error");
          });
        }
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          return response.json();
        }
        return response.text();
      })
      .then(() => {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.memberNumber !== memberNumber)
        );
      })
      .catch((error) => {
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
          <Member
            key={member.memberNumber}
            member={member}
            onDelete={deleteMember}
          />
        ))}
      </ul>
    </>
  );
};

export default Members;
