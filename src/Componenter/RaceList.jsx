/* eslint-disable react/prop-types */
import '../css/RaceList.css'

const RaceList = ({ races, handleRaceSelect, deleteRace }) => {
    return (
      <div className="race-list-container list-wrapper"> 
        {races.map(race => (
          <div key={race.raceNr} className="race-item">
            {race.distance}m - {new Date(race.raceDate).toLocaleDateString()}
            <button onClick={() => handleRaceSelect(race.raceNr)} className="details-button">Details</button>
            <button onClick={() => deleteRace(race.raceNr)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    );
};

export default RaceList;

