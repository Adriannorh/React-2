import { useState, useEffect } from "react";
import axios from "axios";

const Results = () => {
  const [results, setResults] = useState([]);
  const [selectedResultNumber, setSelectedResultNumber] = useState(null);
  const [selectedRaceNr, setSelectedRaceNr] = useState(null);
  const [resultData, setResultData] = useState({
    memberNr: "",
    firstName: "",
    lastName: "",
    distance: "",
    raceTime: "",
  });

  useEffect(() => {
    fetchResults();
    console.log("useEffect called");
  }, []);

  const fetchResults = () => {
    axios
      .get(`/ga/results`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
      });
  };

  const handleDeleteResult = (resultNumber) => {
    console.log("Deleting result with number:", resultNumber);
    const updatedResults = results.filter(
      (r) => r.resultNumber !== resultNumber
    );
    setResults(updatedResults);
  };

  const handleSelectResult = (resultNumber) => {
    const result = results.find((r) => r.resultNumber === resultNumber);
    setSelectedResultNumber(resultNumber);
    setResultData(result);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResultData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateResult = () => {
    const updatedResults = results.map((result) =>
      result.resultNumber === selectedResultNumber
        ? { ...result, ...resultData }
        : result
    );
    setResults(updatedResults);
    setSelectedResultNumber(null);
  };

  const handleAddResult = () => {
    const newResult = {
      ...resultData,
      memberNr: Math.max(...results.map((r) => r.memberNr)) + 1,
    };
    setResults([...results, newResult]);
    setResultData({
      memberNr: "",
      firstName: "",
      lastName: "",
      distance: "",
      raceTime: "",
    });
  };

  const handleRaceNrChange = (e) => {
    setSelectedRaceNr(Number(e.target.value));
  };

  const filterResultsByRaceNr = () => {
    if (!selectedRaceNr) return [];
    return results.filter((result) => result.raceNr === selectedRaceNr);
  };

  const sortedResults = results
    .filter((result) => !selectedRaceNr || result.raceNr === selectedRaceNr)
    .sort((a, b) => parseFloat(a.raceTime) - parseFloat(b.raceTime));

  // Unique race numbers for the dropdown
  const uniqueRaceNrs = [...new Set(results.map((result) => result.raceNr))];

  const displayedResults = filterResultsByRaceNr();
  return (
    <div className="resultsContainer">
      <h1>Resultater</h1>
      <select value={selectedRaceNr || ''} onChange={handleRaceNrChange}>
        <option value="">Velg et raceNr</option>
        {uniqueRaceNrs.map((raceNr) => (
          <option key={raceNr} value={raceNr}>
            {raceNr}
          </option>
        ))}
      </select>
      <ul>
        {displayedResults.map(result => (
          <li key={result.memberNr}>
            {result.firstName} {result.lastName} - {result.distance} - {result.raceTime}
          </li>
        ))}
      </ul>

      {!selectedResultNumber && (
        <div className="resultForm">
          <h2>Legg til nytt resultat</h2>
          <input
            className="inputField"
            name="memberNr"
            value={resultData.memberNr}
            onChange={handleInputChange}
            placeholder="Medlemsnummer"
            type="number"
          />
          <input
            className="inputField"
            name="firstName"
            value={resultData.firstName}
            onChange={handleInputChange}
            placeholder="Fornavn"
          />
          <input
            className="inputField"
            name="lastName"
            value={resultData.lastName}
            onChange={handleInputChange}
            placeholder="Etternavn"
          />
          <input
            className="inputField"
            name="distance"
            value={resultData.distance}
            onChange={handleInputChange}
            placeholder="Distanse (m)"
            type="number"
          />
          <input
            className="inputField"
            name="raceTime"
            value={resultData.raceTime}
            onChange={handleInputChange}
            placeholder="Race Tid (sekunder)"
            type="number"
          />
          <button className="button" onClick={handleAddResult}>
            Legg til
          </button>
        </div>
      )}

      {selectedResultNumber && (
        <div className="resultForm">
          <h2>Rediger resultat #{selectedResultNumber}</h2>
          <input
            className="inputField"
            name="memberNr"
            value={resultData.memberNr}
            onChange={handleInputChange}
            placeholder="Medlemsnummer"
            type="number"
          />
          <input
            className="inputField"
            name="firstName"
            value={resultData.firstName}
            onChange={handleInputChange}
            placeholder="Fornavn"
          />
          <input
            className="inputField"
            name="lastName"
            value={resultData.lastName}
            onChange={handleInputChange}
            placeholder="Etternavn"
          />
          <input
            className="inputField"
            name="distance"
            value={resultData.distance}
            onChange={handleInputChange}
            placeholder="Distanse (m)"
            type="number"
          />
          <input
            className="inputField"
            name="raceTime"
            value={resultData.raceTime}
            onChange={handleInputChange}
            placeholder="Race Tid (sekunder)"
            type="number"
          />
          <button className="button" onClick={handleUpdateResult}>
            Oppdater
          </button>
          <button
            className="button"
            onClick={() => setSelectedResultNumber(null)}
          >
            Avbryt
          </button>
        </div>
      )}

      <ul className="resultList">
        {sortedResults.map((result) => (
          <li
            key={`${result.resultNumber}-${result.memberNr}`}
            className="resultItem"
          >
            <div className="resultDetails">
              <strong>Medlemsnummer:</strong> {result.memberNr}
              <br />
              <strong>Navn:</strong> {result.firstName} {result.lastName}
              <br />
              <strong>Rase Nummer:</strong> {result.raceNr}
              <br />
              <strong>Distanse:</strong> {result.distance}m<br />
              <strong>Tid:</strong> {result.raceTime} sekunder
              <br />
              <strong>Relaterte Lenker:</strong>
              <ul>
                {result.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.rel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button
                className="button"
                onClick={() => handleSelectResult(result.resultNumber)}
              >
                Rediger
              </button>
              <button
                className="button"
                onClick={() => handleDeleteResult(result.resultNumber)}
              >
                Slett
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
