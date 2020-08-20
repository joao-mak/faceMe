import React, { useState } from 'react';
import './App.css';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import ImageLinkForm from './components/ImageLinkForm';
import FaceRec from './components/FaceRec';
import Rank from './components/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const App = () => {
  const app = new Clarifai.App({
    apiKey: 'e17fc639c24446d6a08a848de5fc0e54',
  });

  const [input, setInput] = useState('');

  const [boxes, setBoxes] = useState([]);

  const calcBoxesBoundaries = (response) => {
    const boxesData = response.outputs[0].data.regions;
    const image = document.getElementById('to-scan');
    const imgWidth = image.width;
    const imgHeight = image.height;
    const newBoxes = boxesData.map((box) => ({
      leftCol: box.region_info.bounding_box.left_col * imgWidth,
      topRow: box.region_info.bounding_box.top_row * imgHeight,
      rightCol: imgWidth - box.region_info.bounding_box.right_col * imgWidth,
      bottomRow:
        imgHeight - box.region_info.bounding_box.bottom_row * imgHeight,
    }));
    setBoxes(newBoxes);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleScan = () => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => calcBoxesBoundaries(response))
      .catch((err) => console.log(err));
  };

  const particlesParams = {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 800,
        },
      },
    },
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesParams} />
      <header>
        <Logo />
        <Navigation />
      </header>
      <Rank />
      <ImageLinkForm
        handleInputChange={handleInputChange}
        handleScan={handleScan}
      />
      <FaceRec boxes={boxes} image={input} />
    </div>
  );
};

export default App;
