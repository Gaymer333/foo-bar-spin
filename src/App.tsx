import React, { useEffect, useState } from 'react';
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
      return <Spinner2 /> //loss
    case 3:
      return <Spinner3 /> //loss
    case 4:
      return <Spinner4 /> //won
    case 5:
      return <Spinner5 /> //won
    default:
      return <Spinner1 />
  }
}


const generateSpinnerNumber = () => {
  return Math.floor(Math.random() * 5) + 1;
}

const getCoolDown = () => {
  const coolDown = localStorage.getItem('coolDown');
  if (coolDown) {
    return parseInt(coolDown);
  } else {
    return new Date().getTime();
  }
}

const _setCoolDown = (coolDown: number) => {
  localStorage.setItem('coolDown', coolDown.toString());
}

const getStageFromLocalStorage = () => {
  const stage = localStorage.getItem('stage');
  if (stage) {
    return parseInt(stage);
  } else {
    return 0;
  }
}

const getRandomTime = () => {
  const min = 10 * 60 * 1000;
  const max = 20 * 60 * 1000;
  
  return Math.floor(Math.random() * (max - min + 1)) + min + new Date().getTime();
}

// Render secounds in mm:ss format
const renderTime = (secounds: number) => {
  const minutes = Math.floor(secounds / 60);
  const seconds = secounds - minutes * 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function App() {
  const loadText = '...Loading';

  const [stage, setStage] = useState(getStageFromLocalStorage());
  const [spinnerNumber, setSpinnerNumber] = useState(1);
  const [coolDown, setCoolDown] = useState(getCoolDown());
  const [secoundsLeft, setSecondsLeft] = useState<number | string>(loadText);
  const [spinnedThisSession, setSpinnedThisSession] = useState(false);

  const _setStage = (stage: number) => {
    localStorage.setItem('stage', stage.toString());
    setStage(stage);
  }

  const startCountdown = () => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const localSecondsLeft = Math.floor((coolDown - now) / 1000);
      setSecondsLeft(localSecondsLeft);
      if(localSecondsLeft <= 0) clearInterval(countdown)
    } , 1000);
  }

  const restartGame = () => {
    if(secoundsLeft <= 0)
    {
      _setStage(0);
      setSecondsLeft(loadText);
    }
  }

  const SpinnerWrapper = () => {
    if (stage === 0) {
      setSpinnerNumber(generateSpinnerNumber());
      setSpinnedThisSession(false);
      return <div>
        <p>Wanna spin?</p>
        <button onClick={() => _setStage(1)} >Yes sir!</button>
      </div>
    }
    if (stage === 1) {
      if(stage === 1) setTimeout(() => _setStage(2), 12000);
      return <div>
        <img src={arrow} className="arrow" alt="arrow" />
        <Spinner spinnerNumber={spinnerNumber} />
      </div>
    }
    if (stage === 2) {
      if(!spinnedThisSession) {
        if(coolDown <= new Date().getTime()) {
          const newCoolDown = getRandomTime();
          setCoolDown(newCoolDown);
          _setCoolDown(newCoolDown);
        }
        startCountdown();
        setSpinnedThisSession(true);
      }

      console.log("secoundsLeft:" + secoundsLeft);

      return <div>
        <p>{secoundsLeft > 0 || secoundsLeft === loadText ? typeof secoundsLeft === 'string' ? secoundsLeft : renderTime(secoundsLeft) : 'Time to spin again!'}</p>
        <p>{spinnerNumber < 4 ? 'You lost!' : 'You won!'}</p>
        <button disabled={secoundsLeft > 0 || secoundsLeft === loadText} onClick={restartGame} >Try again</button>
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
