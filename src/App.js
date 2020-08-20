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
  const [box, setBox] = useState({});

  const calcBoxBoundaries = (response) => {
    const boxData =
      response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('scanned');
    const imgWidth = image.width;
    const imgHeight = image.height;
    const newBox = {
      leftCol: boxData.left_col * imgWidth,
      topRow: boxData.top_row * imgHeight,
      rightCol: imgWidth - boxData.right_col * imgWidth,
      bottomRow: imgHeight - boxData.bottom_row * imgHeight,
    };
    setBox(newBox);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleScan = () => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => calcBoxBoundaries(response))
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
      <FaceRec box={box} image={input} />
    </div>
  );
};

export default App;
