import React, { useState } from 'react';
import spinnerImage from './spinner.png';
import arrow from './arrow.png';
import './App.css';

const Spinner1 = () => {
  return <img src={spinnerImage} className="passive-spin1" alt="logo" />
}

const Spinner2 = () => {
  return <img src={spinnerImage} className="passive-spin2" alt="logo" />
}

const Spinner3 = () => {
  return <img src={spinnerImage} className="passive-spin3" alt="logo" />
}

const Spinner4 = () => {
  return <img src={spinnerImage} className="passive-spin4" alt="logo" />
}

const Spinner5 = () => {
  return <img src={spinnerImage} className="passive-spin5" alt="logo" />
}

const Spinner = ({spinnerNumber}: {spinnerNumber: number}) => {
  switch (spinnerNumber) {
    case 1:
      return <Spinner1 /> //loss
    case 2:
      return <Spinner2 />
    case 3:
      return <Spinner3 />
    case 4:
      return <Spinner4 />
    case 5:
      return <Spinner5 />
    default:
      return <Spinner1 />
  }
}


const generateSpinnerNumber = () => {
  return Math.floor(Math.random() * 5) + 1;
}

function App() {
  const [stage, setStage] = useState(0);
  const [spinnerNumber, setSpinnerNumber] = useState(1);

  const SpinnerWrapper = () => {
    if (stage === 0) {
      setSpinnerNumber(generateSpinnerNumber());
      return <div>
        <p>Wanna spin?</p>
        <button onClick={() => setStage(1)} >Yes sir!</button>
      </div>
    }
    if (stage === 1) {
      return <div>
        <img src={arrow} className="arrow" alt="arrow" />
        <Spinner spinnerNumber={spinnerNumber} />
      </div>
    }
    return null
  }

  return (
    <div className="App">
      <div className='spinner'>
        <SpinnerWrapper />
      </div>
      <div className='henrik'>

      </div>
    </div>
  );
}

export default App;
