import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginComponent = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false)


    const handleLogin = async () => {
        setHasError(false)
        const response = await fetch('http://localhost:3006/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        if (response.status === 200) {
            const data = await response.json();
            sessionStorage.setItem('authToken', data.token);
            props.onSuccessfulLogin();
        } else {
            setHasError(true);
        }
    };

    return (
        <div className='loginContainer'>
            <div className='divBox'>
                <input 
                    className={hasError === true ? 'form_text-error' : ''}
                    type="text" 
                    placeholder="Brukernavn" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    className={hasError === true ? 'form_text-error' : ''}
                    type="password" 
                    placeholder="Passord" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Logg inn</button>
                {hasError === true && (
                    <p>Feil Brukernavn eller passord.</p>
                )}
            </div>
        </div>
    );
};

LoginComponent.propTypes = {
    onSuccessfulLogin: PropTypes.func.isRequired
};

export default LoginComponent;
