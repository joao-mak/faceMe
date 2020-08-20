import React from 'react';

const FaceRec = (props) => {
  const { image, box } = props;
  return (
    <div className="face-rec">
      <img
        id="scanned"
        className="scanned"
        alt=""
        width="500px"
        height="auto"
        src={image}
      />
      <div
        className="bounding_box"
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    </div>
  );
};

export default FaceRec;
