import React from 'react';

const Navigation = (props) => {
  const { handleUserChange } = props;
  return (
    <nav className="navigation">
      <p onClick={() => handleUserChange()} className="nav-link">
        sign out
      </p>
    </nav>
  );
};

export default Navigation;
