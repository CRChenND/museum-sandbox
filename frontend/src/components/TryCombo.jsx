import React, { useState, useEffect } from 'react';
import './TryCombo.css';

export default function TryCombo({ character, sceneContext, onTryCombo }) {
  const throughOptions = ['game', 'group', 'dm'];
  const withWhomOptions = ['friend', 'stranger', 'unknown'];
  const infoOptionsAll = ['address', 'birthday', 'city', 'color', 'dog', 'ice', 'playground', 'trip'];
  const infoOptionsUnknown = ['address', 'birthday'];

  const [throughIndex, setThroughIndex] = useState(throughOptions.indexOf(sceneContext.through));
  const [withWhomIndex, setWithWhomIndex] = useState(withWhomOptions.indexOf(sceneContext.withWhom));
  const [infoIndex, setInfoIndex] = useState(infoOptionsAll.indexOf(sceneContext.info));

  const handleTryCombo = () => {
    const currentInfoOptions = withWhomOptions[withWhomIndex] === 'unknown' ? infoOptionsUnknown : infoOptionsAll;

    onTryCombo({
      through: throughOptions[throughIndex],
      withWhom: withWhomOptions[withWhomIndex],
      info: currentInfoOptions[infoIndex % currentInfoOptions.length]
    });
  };

  const handleThroughChange = (dir) => {
    setThroughIndex((throughIndex + dir + throughOptions.length) % throughOptions.length);
  };

  const handleWithChange = (dir) => {
    const newIndex = (withWhomIndex + dir + withWhomOptions.length) % withWhomOptions.length;
    setWithWhomIndex(newIndex);
  };

  const handleInfoChange = (dir) => {
    const currentInfoOptions = withWhomOptions[withWhomIndex] === 'unknown' ? infoOptionsUnknown : infoOptionsAll;
    setInfoIndex((infoIndex + dir + currentInfoOptions.length) % currentInfoOptions.length);
  };

  // 联动控制：当 withWhom 改成 unknown，infoIndex 也同步
  useEffect(() => {
    if (withWhomOptions[withWhomIndex] === 'unknown') {
      const currentInfo = infoOptionsUnknown[infoIndex % infoOptionsUnknown.length];
      if (!infoOptionsUnknown.includes(infoOptionsAll[infoIndex])) {
        setInfoIndex(infoOptionsUnknown.indexOf('address')); // 默认改 address
      }
    }
  }, [withWhomIndex]);

  // 联动控制：当 info 改成不是 address/birthday，withWhom 改掉 unknown
  useEffect(() => {
    const currentInfoOptions = withWhomOptions[withWhomIndex] === 'unknown' ? infoOptionsUnknown : infoOptionsAll;
    const currentInfo = currentInfoOptions[infoIndex % currentInfoOptions.length];

    if (!infoOptionsUnknown.includes(currentInfo) && withWhomOptions[withWhomIndex] === 'unknown') {
      setWithWhomIndex(withWhomOptions.indexOf('friend')); // 自动改 friend
    }
  }, [infoIndex]);

  const currentInfoOptions = withWhomOptions[withWhomIndex] === 'unknown' ? infoOptionsUnknown : infoOptionsAll;
  const currentInfo = currentInfoOptions[infoIndex % currentInfoOptions.length];

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
            <p>My {currentInfo}</p>
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