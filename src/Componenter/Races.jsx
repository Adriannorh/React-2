import { useState, useEffect } from "react";
import axios from "axios";
import RaceList from "./RaceList";
import RaceForm from "./RaceForm";
import RaceDetails from "./RaceDetails";
import "../css/Races.css";

const Races = () => {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
  const [newRace, setNewRace] = useState({ raceDate: "", distance: 0 });

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

  const handleRaceSelect = (raceNr) => {
    axios
      .get(`/ga/races/${raceNr}`)
      .then((response) => {
        setSelectedRace(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching race ${raceNr}:`, error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRace({ ...newRace, [name]: value });
  };

  const submitNewRace = () => {
    const body = {
      raceDate: newRace.raceDate,
      distance: parseInt(newRace.distance, 10),
    };
    axios
      .post("/ga/races", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRaces([...races, response.data]);
        setNewRace({ raceDate: "", distance: 0 });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        console.error("Error config:", error.config);
      });
  };

  const updateRace = (raceNr, raceDetails) => {
    console.log("raceNr:", raceNr);
    console.log("raceDetails:", raceDetails);
    if (
      !raceDetails ||
      (typeof raceNr !== "string" && typeof raceNr !== "number")
    ) {
      console.error("Invalid raceId or raceDetails:", raceNr, raceDetails);
      return;
    }

    axios
      .put(`/ga/races/${raceNr}`, raceDetails)
      .then(() => {
        setRaces(
          races.map((race) =>
            race.raceNr === raceNr ? { ...race, ...raceDetails } : race
          )
        );
        if (selectedRace && selectedRace.raceNr === raceNr) {
          setSelectedRace({ ...selectedRace, ...raceDetails });
        }
      })
      .catch((error) => {
        console.error(`Error updating race! er Lame! ${raceNr}:`, error);
      });
  };

  const deleteRace = (raceNr) => {
    axios
      .delete(`/ga/races/${raceNr}`)
      .then(() => {
        setRaces(races.filter((race) => race.raceNr !== raceNr));
      })
      .catch((error) => {
        console.error(`Error deleting race ${raceNr}:`, error);
      });
  };

  return (
    <div className="races-container">
      <h1 className="races-header">Races</h1>
      <RaceForm
        newRace={newRace}
        handleInputChange={handleInputChange}
        submitNewRace={submitNewRace}
        className="race-form"
      />
      <RaceList
        races={races}
        handleRaceSelect={handleRaceSelect}
        deleteRace={deleteRace}
        className="race-list"
      />
      {selectedRace && (
        <RaceDetails
          selectedRace={selectedRace}
          updateRace={updateRace}
          className="race-details"
        />
      )}
    </div>
  );
};

export default Races;
