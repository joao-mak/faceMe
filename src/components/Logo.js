import React from 'react';
import Tilt from 'react-tilt';
import robot from '../assets/bot-logo.png';

const Logo = (props) => {
  const { size } = props;
  return (
    <div className="logo">
      <Tilt
        className="Tilt"
        options={{ max: 30 }}
        style={{ height: size, width: size }}
      >
        <div className="Tilt-inner">
          <img alt="logo" width={size} height={size} src={robot}></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
