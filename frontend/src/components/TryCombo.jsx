import React, { useState } from 'react';
import './TryCombo.css';

export default function TryCombo({ sceneContext, onTryCombo }) {
  const throughOptions = ['game', 'group', 'dm'];
  const withWhomOptions = ['friend', 'stranger', 'unknown'];
  const infoOptions = ['address', 'birthday', 'city', 'color', 'dog', 'ice', 'playground', 'trip'];

  const [throughIndex, setThroughIndex] = useState(throughOptions.indexOf(sceneContext.through));
  const [withWhomIndex, setWithWhomIndex] = useState(withWhomOptions.indexOf(sceneContext.withWhom));
  const [infoIndex, setInfoIndex] = useState(infoOptions.indexOf(sceneContext.info));

  const handleTryCombo = () => {
    onTryCombo({
      through: throughOptions[throughIndex],
      withWhom: withWhomOptions[withWhomIndex],
      info: infoOptions[infoIndex]
    });
  };

  const handleThroughChange = (dir) => {
    setThroughIndex((throughIndex + dir + throughOptions.length) % throughOptions.length);
  };
  
  const handleWithChange = (dir) => {
    setWithWhomIndex((withWhomIndex + dir + withWhomOptions.length) % withWhomOptions.length);
  };
  
  const handleInfoChange = (dir) => {
    setInfoIndex((infoIndex + dir + infoOptions.length) % infoOptions.length);
  };

  return (
    <div className="combo-container">
      <h2>Make some differences!</h2>

      <div className="character-speech">
        <img className="avatar" src={`/avatars/${sceneContext.characterName?.toLowerCase() || 'mateo'}.png`} alt="avatar" />
        <div className="speech-bubble yellow">
          <p>Let’s switch the place and the person, and see if the answer stays the same or changes!</p>
        </div>
      </div>

      <div className="combo-row">
        <div className="combo-block">
            <h3 className="combo-title purple">Share through</h3>
            <div className="combo-card purple">
            <img src={`/icons/channel/${throughOptions[throughIndex]}.png`} alt="through" />
            <p>{throughOptions[throughIndex] === 'dm' ? 'Direct Message' : throughOptions[throughIndex] === 'group' ? 'Group Chat' : 'Game Channel'}</p>
            </div>
            <div className="combo-buttons">
            <button className="arrow purple" onClick={() => handleThroughChange(-1)}>
                <img src="/icons/left-arrow.svg" alt="left" />
            </button>
            <button className="arrow purple" onClick={() => handleThroughChange(1)}>
                <img src="/icons/right-arrow.svg" alt="right" />
            </button>
            </div>
        </div>

        <div className="combo-block">
            <h3 className="combo-title orange">Share with</h3>
            <div className="combo-card orange">
            <img src={`/icons/people/${withWhomOptions[withWhomIndex]}.png`} alt="with" />
            <p>{withWhomOptions[withWhomIndex].charAt(0).toUpperCase() + withWhomOptions[withWhomIndex].slice(1)}</p>
            </div>
            <div className="combo-buttons">
            <button className="arrow orange" onClick={() => handleWithChange(-1)}>
                <img src="/icons/left-arrow.svg" alt="left" />
            </button>
            <button className="arrow orange" onClick={() => handleWithChange(1)}>
                <img src="/icons/right-arrow.svg" alt="right" />
            </button>
            </div>
        </div>

        <div className="combo-block">
            <h3 className="combo-title blue">Information</h3>
            <div className="combo-card blue">
            <img src={`/icons/info/${infoOptions[infoIndex]}.png`} alt="info" />
            <p>My {infoOptions[infoIndex]}</p>
            </div>
            <div className="combo-buttons">
            <button className="arrow blue" onClick={() => handleInfoChange(-1)}>
                <img src="/icons/left-arrow.svg" alt="left" />
            </button>
            <button className="arrow blue" onClick={() => handleInfoChange(1)}>
                <img src="/icons/right-arrow.svg" alt="right" />
            </button>
            </div>
        </div>
        </div>



      <div className="combo-action">
        <button onClick={handleTryCombo}>Try This Combo!</button>
      </div>
    </div>
  );
}
