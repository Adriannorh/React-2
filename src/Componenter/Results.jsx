import { useState, useEffect } from "react";
import '../css/Results.css'

const Results = () => {
  const [results, setResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [newResult, setNewResult] = useState({
    raceNr: "",
    memberNr: "",
    raceTime: "",
  });
  const [selectedRaceNr, setSelectedRaceNr] = useState("");

  // Hent resultater fra serveren
  useEffect(() => {
    fetch("/ga/results")
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setDisplayedResults(data); // Oppdaterer displayedResults med data fra serveren
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Oppdater displayedResults når selectedRaceNr endres
  useEffect(() => {
    const filteredResults = selectedRaceNr
      ? results.filter((result) => result.raceNr.toString() === selectedRaceNr)
      : results;
    setDisplayedResults(filteredResults);
  }, [selectedRaceNr, results]);

  // Håndter endring i input-feltene
  const handleChange = (event) => {
    setNewResult({ ...newResult, [event.target.name]: event.target.value });
  };

  // Håndter endring i select-elementet for raceNr
  const handleRaceNrChange = (event) => {
    setSelectedRaceNr(event.target.value);
  };

  // Registrer et nytt resultat
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/ga/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newResult),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server returned an error response");
        }
        return response.text(); // Først forsøk å lese teksten
      })
      .then((text) => {
        try {
          return JSON.parse(text); // Deretter forsøk å parse det som JSON
        } catch (err) {
          console.error("Server response was not JSON:", text);
          throw err; // Kast feilen videre for håndtering
        }
      })
      .then((data) => {
        setResults([...results, data]);
        setNewResult({ raceNr: "", memberNr: "", raceTime: "" }); // Nullstill inputfeltene etter suksess
        setSelectedRaceNr(""); // Nullstill også det valgte løpsnummeret
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Finn unike raceNr for å bruke i <select>-elementet
  const uniqueRaceNrs = Array.from(
    new Set(results.map((result) => result.raceNr.toString()))
  );

  return (
    <div className="results-container">
      <h1 className="results-title">Resultater</h1>
      <form onSubmit={handleSubmit} className="results-form">
        {/* Input-feltene for nytt resultat */}
        <input
          className="input-field"
          type="number"
          name="raceNr"
          value={newResult.raceNr}
          onChange={handleChange}
          placeholder="Race nummer"
        />
        <input
          className="input-field"
          type="number"
          name="memberNr"
          value={newResult.memberNr}
          onChange={handleChange}
          placeholder="Medlems nummer"
        />
        <input
          className="input-field"
          type="text" // Endret fra number til text for å tillate mer fleksible tidformater
          name="raceTime"
          value={newResult.raceTime}
          onChange={handleChange}
          placeholder="Race tid (HH:MM:SS)"
        />
        <button className="submit-button" type="submit">
          Registrer Resultat
        </button>
      </form>

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
    </div>
  );
};

export default Results;
