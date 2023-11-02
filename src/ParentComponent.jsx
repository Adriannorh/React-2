import { useState, useEffect } from "react";
import axios from "axios";
import { Members } from './Members'; 
import { DisplayMembers } from './DisplayMembers';
import RaceList from './RaceList';
import RaceResults from './RaceResults'; 
import './css/ParentComponent.css';

// eslint-disable-next-line react/prop-types
function ParentComponent({ loggedIn }) {
    const [members, setMembers] = useState([]);
    const [races, setRaces] = useState([]);
    const [results, setResults] = useState([]); 
    const [selectedRaceNr, setSelectedRaceNr] = useState(''); 

    const fetchMembers = () => {
        axios
            .get("/ga/members")
            .then((response) => {
                setMembers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching members:", error);
            });
    };

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

    const fetchResults = () => {  
        axios
            .get("/ga/results")  
            .then((response) => {
                setResults(response.data);
            })
            .catch((error) => {
                console.error("Error fetching results:", error);
            });
    };

    const handleRaceNrChange = (event) => { 
        setSelectedRaceNr(event.target.value);
    };

    useEffect(() => {
        fetchMembers();
        fetchRaces();
        fetchResults(); 
    }, []);

    if (loggedIn) {
        return (
            <div className="parentContainer">
                <div className="membersSection">
                    <Members members={members} fetchMembers={fetchMembers} setMembers={setMembers} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="parentContainer">
                <div className="raceResultsSection">
                    <RaceResults results={results} selectedRaceNr={selectedRaceNr} handleRaceNrChange={handleRaceNrChange} />
                </div>
                <div className="displayMembersSection">
                    <DisplayMembers members={members} />
                </div>
                <div className="raceListSection">
                    <RaceList races={races} />
                </div>
            </div>
        );
    }
}


export default ParentComponent;
