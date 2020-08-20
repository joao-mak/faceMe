import React from 'react';
import Tilt from 'react-tilt';
import robot from '../assets/bot-logo.png';

const Logo = (props) => {
  return (
    <div className="logo">
      <Tilt
        className="Tilt"
        options={{ max: 30 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          {' '}
          <img alt="logo" src={robot}></img>{' '}
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
