import React from 'react';

const FaceRec = (props) => {
  const { image, boxes } = props;
  return (
    <div className="face-rec">
      <img
        id="to-scan"
        className="to-scan"
        alt=""
        width="500px"
        height="auto"
        src={image}
      />
      {boxes.map((box) => (
        <div
          className="bounding_box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      ))}
    </div>
  );
};

export default FaceRec;
