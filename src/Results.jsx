import { useState, useEffect } from "react";
import axios from "axios";

const Results = () => {
  const [results, setResults] = useState([]);
  const [selectedResultNumber, setSelectedResultNumber] = useState(null);
  const [resultData, setResultData] = useState({
    title: "",
    description: "",
    score: "",
    raceTime: ""
  });

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = () => {
    axios
      .get(`/ga/members/results`) 
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
      });
  };

  const handleDeleteResult = (resultNumber) => {
    const updatedResults = results.filter((r) => r.resultNumber !== resultNumber);
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
      resultNumber: results.length
        ? Math.max(...results.map((r) => r.resultNumber)) + 1
        : 1,
    };
    setResults([...results, newResult]);
    setResultData({
      title: "",
      description: "",
      score: "",
      raceTime: ""
    });
  };

  const sortedResults = results.sort((a, b) => parseFloat(a.raceTime) - parseFloat(b.raceTime));

  return (
    <div className="resultsContainer">
      <h1>Resultater</h1>

      {!selectedResultNumber && (
        <div className="resultForm">
          {/* ... [rest of the add form] */}
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

      <ul className="resultList">
        {sortedResults.map((result, index) => (
          <li key={result.resultNumber} className="resultItem">
            <div className="resultDetails">
              {index + 1}. {result.title} ({result.score} poeng, {result.raceTime} sekunder)
            </div>
            <div>
              <button
                className="button"
                onClick={() => handleSelectResult(result.resultNumber)}
              >
                Velg
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

      {selectedResultNumber && (
        <div className="resultForm">
          {/* ... [rest of the edit form] */}
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
    </div>
  );
};

export default Results;
