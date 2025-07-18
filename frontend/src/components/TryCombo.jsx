import React, { useState, useEffect } from 'react';
import './TryCombo.css';

export default function TryCombo({ character, sceneContext, onTryCombo, logClick }) {
  const throughOptions = ['game', 'group', 'dm'];
  const withWhomOptions = ['friend', 'stranger', 'unknown'];
  const infoOptionsAll = ['address', 'birthday', 'city', 'color', 'dog', 'ice', 'playground', 'trip'];
  const infoOptionsUnknown = ['address', 'birthday'];

  const [throughIndex, setThroughIndex] = useState(throughOptions.indexOf(sceneContext.through));
  const [withWhomIndex, setWithWhomIndex] = useState(withWhomOptions.indexOf(sceneContext.withWhom));
  const [infoIndex, setInfoIndex] = useState(infoOptionsAll.indexOf(sceneContext.info));

  const currentInfoOptions = withWhomOptions[withWhomIndex] === 'unknown' ? infoOptionsUnknown : infoOptionsAll;
  const currentInfo = currentInfoOptions[infoIndex % currentInfoOptions.length];

  const handleTryCombo = () => {
    const combo = {
      through: throughOptions[throughIndex],
      withWhom: withWhomOptions[withWhomIndex],
      info: currentInfo
    };

    logClick("click", "try-combo", combo);
    onTryCombo(combo);
  };

  const handleThroughChange = (dir) => {
    const newIndex = (throughIndex + dir + throughOptions.length) % throughOptions.length;
    setThroughIndex(newIndex);
  };

  const handleWithChange = (dir) => {
    const newIndex = (withWhomIndex + dir + withWhomOptions.length) % withWhomOptions.length;
    setWithWhomIndex(newIndex);
  };

  const handleInfoChange = (dir) => {
    setInfoIndex((infoIndex + dir + currentInfoOptions.length) % currentInfoOptions.length);
  };

  useEffect(() => {
    if (withWhomOptions[withWhomIndex] === 'unknown') {
      const currentInfo = infoOptionsUnknown[infoIndex % infoOptionsUnknown.length];
      if (!infoOptionsUnknown.includes(infoOptionsAll[infoIndex])) {
        setInfoIndex(infoOptionsUnknown.indexOf('address'));
      }
    }
  }, [withWhomIndex]);

  useEffect(() => {
    const currentInfo = currentInfoOptions[infoIndex % currentInfoOptions.length];
    if (!infoOptionsUnknown.includes(currentInfo) && withWhomOptions[withWhomIndex] === 'unknown') {
      setWithWhomIndex(withWhomOptions.indexOf('friend'));
    }
  }, [infoIndex]);

  return (
    <div className="combo-container">
      <h2>Make some differences!</h2>

      <div className="character-speech">
        <img className="avatar" src={`${import.meta.env.BASE_URL}avatars/${character.id || 'alpha'}.png`} alt="avatar" />
        <div className="speech-bubble yellow">
          <p>Let’s switch the place and the person, and see if the answer stays the same or changes!</p>
        </div>
      </div>

      <div className="combo-row">
        <div className="combo-block">
          <h3 className="combo-title purple">Share through</h3>
          <div className="combo-card purple">
            <img src={`${import.meta.env.BASE_URL}icons/channel/${throughOptions[throughIndex]}.png`} alt="through" />
            <p>{throughOptions[throughIndex] === 'dm' ? 'Direct Message' : throughOptions[throughIndex] === 'group' ? 'Group Chat' : 'Game Channel'}</p>
          </div>
          <div className="combo-buttons">
            <button className="arrow purple" onClick={() => handleThroughChange(-1)}>
              <img src={`${import.meta.env.BASE_URL}icons/left-arrow.svg`} alt="left" />
            </button>
            <button className="arrow purple" onClick={() => handleThroughChange(1)}>
              <img src={`${import.meta.env.BASE_URL}icons/right-arrow.svg`} alt="right" />
            </button>
          </div>
        </div>

        <div className="combo-block">
          <h3 className="combo-title orange">Share with</h3>
          <div className="combo-card orange">
            <img src={`${import.meta.env.BASE_URL}icons/people/${withWhomOptions[withWhomIndex]}.png`} alt="with" />
            <p>{withWhomOptions[withWhomIndex].charAt(0).toUpperCase() + withWhomOptions[withWhomIndex].slice(1)}</p>
          </div>
          <div className="combo-buttons">
            <button className="arrow orange" onClick={() => handleWithChange(-1)}>
              <img src={`${import.meta.env.BASE_URL}icons/left-arrow.svg`} alt="left" />
            </button>
            <button className="arrow orange" onClick={() => handleWithChange(1)}>
              <img src={`${import.meta.env.BASE_URL}icons/right-arrow.svg`} alt="right" />
            </button>
          </div>
        </div>

        <div className="combo-block">
          <h3 className="combo-title blue">Information</h3>
          <div className="combo-card blue">
            <img src={`${import.meta.env.BASE_URL}icons/info/${currentInfo}.png`} alt="info" />
            {/* <p>My {currentInfo}</p> */}
            <p>{
              currentInfo === 'address' ? 'My home address' : 
              currentInfo === 'city' ? 'The city I live in' : 
              currentInfo === 'color' ? 'My favorite color' : 
              currentInfo === 'ice' ? 'Dessert I like' : 
              currentInfo === 'playground' ? 'After-school spot' : 
              currentInfo === 'trip' ? 'My trip' :
              `My ${currentInfo}`
            }
            </p>
          </div>
          <div className="combo-buttons">
            <button className="arrow blue" onClick={() => handleInfoChange(-1)}>
              <img src={`${import.meta.env.BASE_URL}icons/left-arrow.svg`} alt="left" />
            </button>
            <button className="arrow blue" onClick={() => handleInfoChange(1)}>
              <img src={`${import.meta.env.BASE_URL}icons/right-arrow.svg`} alt="right" />
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
