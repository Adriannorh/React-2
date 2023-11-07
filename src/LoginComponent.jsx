import { useState } from "react";
import PropTypes from "prop-types";
import "./css/LoginComponent.css";

const LoginComponent = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const hardcodedUsername = "admin";
  const hardcodedPassword = "admin";

  const handleLogin = async () => {
    if (
      username.trim() === hardcodedUsername &&
      password.trim() === hardcodedPassword
    ) {
      sessionStorage.setItem("authToken", "dummy-token");
      props.onSuccessfulLogin();
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="divBox">
        <input
          className={hasError ? "form_text-error" : ""}
          type="text"
          placeholder="Brukernavn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={hasError ? "form_text-error" : ""}
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Logg inn</button>
        {hasError && <p>Feil Brukernavn eller passord.</p>}
      </div>
    </div>
  );
};

LoginComponent.propTypes = {
  onSuccessfulLogin: PropTypes.func.isRequired,
};

export default LoginComponent;
