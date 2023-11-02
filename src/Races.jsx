/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import RaceList  from './RaceList';

const Races = ({ loggedIn }) => {
  const [races, setRaces] = useState([]);
  const [selectedRaceNr, setSelectedRaceNr] = useState(null);
  const [racesData, setRacesData] = useState({
    raceNr: "",
    raceDate: "",
    distance: "",
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
    const updatedRaces = races.filter((race) => race.raceNr !== raceNr);
    setRaces(updatedRaces);
  };

  const handleUpdateRaces = () => {
    const updatedRaces = races.map((race) =>
      race.raceNr === selectedRaceNr ? racesData : race
    );
    setRaces(updatedRaces);
    setSelectedRaceNr(null);
  };

  const handleAddRace = () => {
    setRaces([...races, racesData]);
    setRacesData({
      raceNr: "",
      raceDate: "",
      distance: "",
    });
  };

  const handleSelectRaces = (raceNr) => {
    const race = races.find((r) => r.raceNr === raceNr);
    setSelectedRaceNr(raceNr);
    setRacesData(race);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRacesData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="racesContainer">
      <h1>Races</h1>

      {loggedIn && !selectedRaceNr && (
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

      <RaceList 
        races={races} loggedIn={loggedIn} 
        handleSelectRaces={handleSelectRaces} 
        handleDeleteRaces={handleDeleteRaces} 
      />

      {loggedIn && selectedRaceNr && (
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
