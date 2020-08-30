import React, { useState } from 'react';
import './SignIn.css';

const SignIn = (props) => {
  const { handleUserChange } = props;
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [registered, setRegistered] = useState(false);

  const handleRegister = (bool) => {
    setRegistered(bool);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSignIn = () => {
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.user_id) {
          handleUserChange(user);
        }
      });
  };

  const onRegister = () => {
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.user_id) {
          handleUserChange(user);
        }
      });
  };

  return (
    <div className="login-page">
      <h1 className="faceMe-intro">
        {`FaceMe. A friendly robot, trained to detect faces. Nothing suspicious
        about it.`}
      </h1>
      <div className="form">
        {!registered ? (
          <div className="login-form">
            <input
              type="text"
              placeholder="e-mail"
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="password"
              onChange={handlePasswordChange}
            />
            <button onClick={() => onSignIn()}>{`login`}</button>
            <p className="message">
              {`Not registered?`}
              <span onClick={() => handleRegister(true)}>
                {`Create an account`}
              </span>
            </p>
          </div>
        ) : (
          <div className="register-form">
            <input type="text" placeholder="name" onChange={handleNameChange} />
            <input
              type="password"
              placeholder="password"
              onChange={handlePasswordChange}
            />
            <input
              type="text"
              placeholder="e-mail"
              onChange={handleEmailChange}
            />
            <button onClick={onRegister}>{`create`}</button>
            <p className="message">
              {`Already registered?`}
              <span onClick={() => handleRegister(false)}>{`Sign in`}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
