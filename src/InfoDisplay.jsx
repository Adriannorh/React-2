import ParentComponent from "./ParentComponent";
import './css/InfoDisplay.css';

// eslint-disable-next-line react/prop-types
function InfoDisplay({ loggedIn }) {
  if (loggedIn) {
    return null;
  }


  return (
    <div  className="iDisplay">
      <h2>Friidrett Informasjon!</h2>
      <p>Her finner du informasjonen du trenger. Hvis du vil redigere listene, vennligst logg inn.</p>
      { !loggedIn && <ParentComponent /> }
    </div>
  );
}

export default InfoDisplay;
