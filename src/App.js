import React, { useState } from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import ImageLinkForm from './components/ImageLinkForm';
import FaceRec from './components/FaceRec';
import Rank from './components/Rank';
import Particles from 'react-particles-js';

const App = () => {
  const [input, setInput] = useState('');

  const [boxes, setBoxes] = useState([]);

  const [user, setUser] = useState(null);

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

  const handleUserChange = (user) => {
    setUser(user);
    setInput('');
    setBoxes([]);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleScan = () => {
    fetch('http://localhost:3001/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: user.user_id,
            }),
          })
            .then((response) => response.json())
            .then((count) => setUser({ ...user, entries: count }))
            .catch((err) => console.log(err));
        }
        calcBoxesBoundaries(response);
      })
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
      {!user ? (
        <>
          <SignIn handleUserChange={handleUserChange} />
          <Particles className="particles" params={particlesParams} />
        </>
      ) : (
        <>
          <Particles className="particles" params={particlesParams} />
          <header>
            <Logo size={100} />
            <Navigation handleUserChange={handleUserChange} />
          </header>
          <Rank name={user.user_name} entries={user.entries} />
          <ImageLinkForm
            handleInputChange={handleInputChange}
            handleScan={handleScan}
          />
          <FaceRec boxes={boxes} image={input} />
        </>
      )}
    </div>
  );
};

export default App;
