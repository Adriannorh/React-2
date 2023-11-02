/* eslint-disable react/prop-types */
import './css/RaceResults.css';

const RaceResults = ({ results, selectedRaceNr, handleRaceNrChange }) => {
  const uniqueRaceNrs = [...new Set(results.map(result => String(result.raceNr)))];
  const displayedResults = selectedRaceNr
    ? results.filter(result => String(result.raceNr) === String(selectedRaceNr))
    : [];
  return (
    <div className="resultsContainer">
      <h1 className="resultsHeader">Resultater</h1>
      <div className="resultsDropdown">
        <select value={selectedRaceNr || ''} onChange={handleRaceNrChange}>
          <option value="">Velg et raceNr</option>
          {uniqueRaceNrs.map((raceNr) => (
            <option key={raceNr} value={raceNr}>
              {raceNr}
            </option>
          ))}
        </select>
      </div>
      <ul className="displayResultsList">
        {displayedResults.map((result, index) => (
          <li key={index} className="displayResultItem">
            <span className="resultDetails">
              {result.firstName} {result.lastName} - {result.distance} - {result.raceTime}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RaceResults;
