/* eslint-disable react/prop-types */
import { useState } from "react";
import "../css/AddMemberForm.css";

const AddMemberForm = ({ onAddMember }) => {
  const [newMember, setNewMember] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthYear: "",
    email: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberToSubmit = {
      ...newMember,
      birthYear: Number(newMember.birthYear),
    };

    fetch("/ga/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberToSubmit),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Problem adding member, status: ${response.status}`);
        }
        return response.json();
      })
      .then((memberData) => {
        onAddMember(memberData);
        setNewMember({
          firstName: "",
          lastName: "",
          gender: "",
          birthYear: "",
          email: "",
        });
        setShowForm(false);
      })
      .catch((error) => {
        console.error(`Failed to add member: ${error}`);
      });
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <>
      {!showForm && (
        <button onClick={handleShowForm} className="show-form-button">
          Add New Member
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={newMember.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={newMember.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <select
            className="form-select"
            name="gender"
            value={newMember.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <input
            className="form-input"
            type="number"
            name="birthYear"
            value={newMember.birthYear}
            onChange={handleChange}
            placeholder="Birth Year"
            required
          />
          <input
            className="form-input"
            type="email"
            name="email"
            value={newMember.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <button className="form-button" type="submit">
            Add Member
          </button>
        </form>
      )}
    </>
  );
};

export default AddMemberForm;
