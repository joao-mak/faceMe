import React from 'react';

const Rank = (props) => {
  const { name, entries } = props;
  return (
    <div className="rank">
      <p className="rank-text-1">{`${name}, your current rank is...`}</p>
      <p className="rank-text-2">{`${entries}`}</p>
    </div>
  );
};

export default Rank;
