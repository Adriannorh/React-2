import { useState, useEffect } from "react";
import axios from "axios";

const Races = () => {
  const [races, setRaces] = useState([]);
  const [selectedRaceNr, setSelectedRaceNr] = useState(null);
  const [racesData, setracesData] = useState({
    raceNr: "",
    raceDate: "",
    distance: "",
    link: "",
  });

  useEffect(() => {
    fetchRaces();
  }, []);

  const fetchRaces = () => {
    axios
      .get("/ga/races")
      .then((response) => {
        setRaces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching races:", error);
      });
  };

  const handleDeleteRaces = (raceNr) => {
    const updatedRaces = races.filter((r) => r.raceNr !== raceNr);
    setRaces(updatedRaces);
  };

  const handleSelectRaces = (raceNr) => {
    const race = races.find((r) => r.raceNr === raceNr);
    setSelectedRaceNr(raceNr);
    setracesData(race);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setracesData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateRaces = () => {
    const updatedRaces = races.map((race) =>
      race.raceNr === selectedRaceNr ? { ...race, ...racesData } : race
    );
    setRaces(updatedRaces);
    setSelectedRaceNr(null);
  };

  const handleAddRace = () => {
    const newRace = {
      ...racesData,
      raceNr: Math.max(...races.map((r) => r.raceNr)) + 1,
    };
    setRaces([...races, newRace]);
    setracesData({
      raceNr: "",
      raceDate: "",
      distance: "",
      link: "",
    });
  };

  return (
    <div className="racesContainer">
      <h1>Races</h1>

      {!selectedRaceNr && (
        <div className="racesForm">
          <h2>Legg til nytt race</h2>
          <input
            className="inputField"
            name="raceNr"
            value={racesData.raceNr}
            onChange={handleInputChange}
            placeholder="raceNumber"
          />
          <input
            className="inputField"
            name="raceDate"
            value={racesData.raceDate}
            onChange={handleInputChange}
            placeholder="racesDate"
          />
          <input
            className="inputField"
            name="distance"
            value={racesData.distance}
            onChange={handleInputChange}
            placeholder="distance"
          />
          <button className="button" onClick={handleAddRace}>
            Legg til
          </button>
        </div>
      )}

      <ul className="racesList">
        {races.map((race) => (
          <li key={race.raceNr} className="raceItem">
            <div className="raceDetails">
              {race.raceNr} {race.raceDate} ({race.distance})
            </div>
            <div>
              <button
                className="button"
                onClick={() => handleSelectRaces(race.raceNr)}
              >
                Velg
              </button>
              <button
                className="button"
                onClick={() => handleDeleteRaces(race.raceNr)}
              >
                Slett
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedRaceNr && (
        <div className="raceForm">
          <h2>Rediger race #{selectedRaceNr}</h2>
          <input
            className="inputField"
            name="raceNr"
            value={racesData.raceNr}
            onChange={handleInputChange}
            placeholder="raceNumber"
          />
          <input
            className="inputField"
            name="raceDate"
            value={racesData.raceDate}
            onChange={handleInputChange}
            placeholder="racesDate"
          />
          <input
            className="inputField"
            name="distance"
            value={racesData.distance}
            onChange={handleInputChange}
            placeholder="distance"
          />
          <button className="button" onClick={handleUpdateRaces}>
            Oppdater
          </button>

          <button className="button" onClick={() => setSelectedRaceNr(null)}>
            Avbryt
          </button>
        </div>
      )}
    </div>
  );
};

export default Races;
