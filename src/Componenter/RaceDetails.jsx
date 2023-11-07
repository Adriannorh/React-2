/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../css/RaceDetails.css";

const RaceDetails = ({ selectedRace, updateRace }) => {
  const [editRace, setEditRace] = useState(selectedRace);

  useEffect(() => {
    setEditRace(selectedRace);
  }, [selectedRace]);

  if (!selectedRace) return <div>Please select a race to see the details.</div>;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditRace({ ...editRace, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { raceNr, ...details } = editRace;
    updateRace(raceNr, details);
  };

  return (
    <div className="race-details">
      {selectedRace && (
        <form onSubmit={handleSubmit} className="race-form">
          <div className="form-group">
            <label className="form-label">Race Name:</label>
            <input
              type="text"
              name="raceName"
              value={editRace.raceName || ""}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Race Date:</label>
            <input
              type="date"
              name="raceDate"
              value={editRace.raceDate}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Distance:</label>
            <input
              type="number"
              name="distance"
              value={editRace.distance}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Race
          </button>
        </form>
      )}
    </div>
  );
};
export default RaceDetails;
