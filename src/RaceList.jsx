/* eslint-disable react/prop-types */
import './css/RaceList.css';


const RaceList = ({ races, handleSelectRaces, handleDeleteRaces, loggedIn }) => {
    return (
      <div className="raceList-container">
        {races.map(race => (
          <div key={race.raceNr} className="raceItem">
            <p>Race Number: {race.raceNr}</p>
            <p>Race Date: {race.raceDate}</p>
            <p>Distance: {race.distance}</p>
            
            {loggedIn && (
              <>
                <button className="raceItem-button" onClick={() => handleSelectRaces(race.raceNr)}>Velg</button>
                <button className="raceItem-button" onClick={() => handleDeleteRaces(race.raceNr)}>Slett</button>
              </>
            )}
          </div>
        ))}
      </div>
    );
};

export default RaceList;
