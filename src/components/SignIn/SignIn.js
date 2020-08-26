import React, { useState } from 'react';
import './SignIn.css';

const SignIn = (props) => {
  const { handleUserChange } = props;
  const [registered, setRegistered] = useState(false);

  const handleRegister = (bool) => {
    setRegistered(bool);
  };

  return (
    <div className="login-page">
      <h1 className="faceMe-intro">
        FaceMe. A friendly robot, trained to detect faces. Nothing suspicious
        about it.
      </h1>
      <div className="form">
        {registered ? (
          <form className="login-form">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button onClick={() => handleUserChange('john')}>login</button>
            <p className="message">
              Not registered?
              <span onClick={() => handleRegister(false)}>
                Create an account
              </span>
            </p>
          </form>
        ) : (
          <form className="register-form">
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button onClick={() => handleUserChange('john')}>create</button>
            <p className="message">
              Already registered?
              <span onClick={() => handleRegister(true)}>Sign In</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
