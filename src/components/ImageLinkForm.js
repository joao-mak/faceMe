import React from 'react';

const ImageLinkForm = (props) => {
  const { handleInputChange, handleScan } = props;
  return (
    <div className="image-form">
      <p>{`Enter a picture for me to scan.`}</p>
      <div className="input-box">
        <input
          className="text-input"
          type="text"
          onChange={handleInputChange}
        />
        <button className="scan-button" onClick={handleScan}>
          scan!
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
