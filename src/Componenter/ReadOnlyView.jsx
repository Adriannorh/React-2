import { useState, useEffect } from "react";
import "../css/ReadOnlyView.css";

const ReadOnlyView = () => {
  const [members, setMembers] = useState([]);
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedRaceNr, setSelectedRaceNr] = useState("");
  const [displayedResults, setDisplayedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/ga/members").then((res) => res.json()),
      fetch("/ga/races").then((res) => res.json()),
      fetch("/ga/results").then((res) => res.json()),
    ])
      .then(([membersData, racesData, resultsData]) => {
        setMembers(membersData);
        setRaces(
          racesData.map((race) => ({
            ...race,
            raceNr: String(race.raceNr), // Assuming race numbers are strings
          }))
        );
        setResults(resultsData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || 'An error occurred');
        setLoading(false);
      });
  }, []);

  // When selectedRaceNr changes, filter the results accordingly
  useEffect(() => {
    // When selectedRaceNr changes, filter the results accordingly
    const filteredResults = selectedRaceNr
      ? results.filter(result => String(result.raceNr) === selectedRaceNr)
      : results;
    setDisplayedResults(filteredResults);
  }, [selectedRaceNr, results]);

  const handleRaceNrChange = (event) => {
    setSelectedRaceNr(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Extract unique race numbers from races data
  const uniqueRaceNrs = [...new Set(races.map((race) => race.raceNr))];

  return (
    <>
      <h1 className="view-title">Oversikt over Friidrett</h1>

      <div className="filter-container">
        <label htmlFor="raceNr-select" className="filter-label">
          Filtrer etter Race Nummer:
        </label>
        <select
          id="raceNr-select"
          value={selectedRaceNr}
          onChange={handleRaceNrChange}
          className="race-nr-select"
        >
          <option value="">Vis alle</option>
          {uniqueRaceNrs.map((raceNr) => (
            <option key={raceNr} value={raceNr}>
              Race {raceNr}
            </option>
          ))}
        </select>
      </div>

      <section className="results-section">
        <h2 className="results-list-title">Allerede registrerte resultater</h2>
        <ul className="results-list">
          {displayedResults.map((result, index) => (
            <li key={index} className="results-list-item">
              Race Nr: {result.raceNr}, Medlems Nr: {result.memberNr}, Race Tid:{" "}
              {result.raceTime}
            </li>
          ))}
        </ul>
      </section>

      <section className="members-section">
        <h2 className="section-title">Members</h2>
        {members.map((member) => (
          <div key={member.memberNumber} className="member-item">
            <p>
              {member.firstName} {member.lastName}
            </p>
            {/* Add other member details you want to show */}
          </div>
        ))}
      </section>

      <section className="races-section">
        <h2 className="section-title">Races</h2>
        {races.map((race) => (
          <div key={race.raceNr} className="race-item">
            <p>
              Race Nr: {race.raceNr} - Date: {race.raceDate} - Distance:{" "}
              {race.distance}
            </p>
            {/* Add other race details you want to show */}
          </div>
        ))}
      </section>

      <section className="results-section">
        <h2 className="section-title">Results</h2>
        {results.map((result, index) => (
          <div key={index} className="result-item">
            {" "}
            {/* Ideally, use a unique identifier from result instead of index */}
            <p>
              Member Nr: {result.memberNr} - Time: {result.raceTime} - Name:{" "}
              {result.firstName} {result.lastName}
            </p>
            {/* Add other result details you want to show */}
          </div>
        ))}
      </section>
    </>
  );
};

export default ReadOnlyView;
