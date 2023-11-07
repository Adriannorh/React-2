/* eslint-disable react/prop-types */
import "../css/RaceForm.css";

const RaceForm = ({ newRace, handleInputChange, submitNewRace }) => {
  return (
    <div className="race-form-container">
      <input
        className="race-input race-date"
        type="date"
        name="raceDate"
        value={newRace.raceDate}
        onChange={handleInputChange}
        placeholder="Race Date (YYYY-MM-DD)"
      />
      <input
        className="race-input race-distance"
        type="number"
        name="distance"
        value={newRace.distance}
        onChange={handleInputChange}
        placeholder="Distance (meters)"
      />
      <button className="submit-button" onClick={submitNewRace}>
        Submit New Race
      </button>
    </div>
  );
};
export default RaceForm;
