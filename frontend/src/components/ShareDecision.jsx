import { useState, useEffect } from 'react';
import './ShareDecision.css';

export default function ShareDecision({
  shareThrough,
  shareWith,
  shareChoices,
  onChange,
  onNext,
  onBack,
  characterName,
  logClick
}) {
  const [throughIndex, setThroughIndex] = useState(() => {
    const index = shareThrough.findIndex(item => item.name === shareChoices.through);
    return index >= 0 ? index : 0;
  });
  
  const [withIndex, setWithIndex] = useState(() => {
    const index = shareWith.findIndex(item => item.name === shareChoices.with);
    return index >= 0 ? index : 0;
  });

  // 初始化 shareChoices，仅执行一次
  useEffect(() => {
    onChange({
      through: shareThrough[throughIndex].name,
      with: shareWith[withIndex].name
    });
  }, []);

  const handleThroughChange = (dir) => {
    const newIndex = (throughIndex + dir + shareThrough.length) % shareThrough.length;
    setThroughIndex(newIndex);
    const newName = shareThrough[newIndex].name;
    onChange({ through: newName });

    logClick("click", `through-${dir > 0 ? 'right' : 'left'}`, {
      newThrough: newName
    });
  };

  const handleWithChange = (dir) => {
    const newIndex = (withIndex + dir + shareWith.length) % shareWith.length;
    setWithIndex(newIndex);
    const newName = shareWith[newIndex].name;
    onChange({ with: newName });

    logClick("click", `with-${dir > 0 ? 'right' : 'left'}`, {
      newWith: newName
    });
  };

  const currentThrough = shareThrough[throughIndex];
  const currentWith = shareWith[withIndex];

  return (
    <div className="share-container">
      <h2>Let’s help {characterName || '[Name]'} make a decision!</h2>

      <div className="character-speech">
        <img
          className="avatar"
          src={`${import.meta.env.BASE_URL}avatars/${characterName.toLowerCase()}.png`}
          alt={characterName}
        />
        <div className="speech-bubble">
          <p>Ready? Let’s choose a scene to explore!</p>
        </div>
      </div>

      <div className="carousel-row">
        <div className="carousel-block">
          <h3 className="carousel-title purple-text">Share through</h3>
          <div className="carousel">
            <button className="arrow purple" onClick={() => handleThroughChange(-1)}>
              <img src={`${import.meta.env.BASE_URL}icons/left-arrow.svg`} alt="left" />
            </button>
            <div className="share-card purple">
              <img
                src={`${import.meta.env.BASE_URL}${(currentThrough.icon || '/icons/icon-placeholder.png').slice(1)}`}
                alt={currentThrough.name}
              />
              <p>{currentThrough.name}</p>
            </div>
            <button className="arrow purple" onClick={() => handleThroughChange(1)}>
              <img src={`${import.meta.env.BASE_URL}icons/right-arrow.svg`} alt="right" />
            </button>
          </div>
        </div>

        <div className="carousel-block">
          <h3 className="carousel-title orange-text">Share with</h3>
          <div className="carousel">
            <button className="arrow orange" onClick={() => handleWithChange(-1)}>
              <img src={`${import.meta.env.BASE_URL}icons/left-arrow.svg`} alt="left" />
            </button>
            <div className="share-card orange">
              <img
                src={`${import.meta.env.BASE_URL}${(currentWith.icon || '/icons/icon-placeholder.png').slice(1)}`}
                alt={currentWith.name}
              />
              <p>{currentWith.name}</p>
            </div>
            <button className="arrow orange" onClick={() => handleWithChange(1)}>
              <img src={`${import.meta.env.BASE_URL}icons/right-arrow.svg`} alt="right" />
            </button>
          </div>
        </div>
      </div>

      <button className="fixed-back-button" onClick={() => {
        logClick("click", "sharedecision-back");
        onBack();
      }}>
        Back
      </button>

      <button className="fixed-next-button" onClick={() => {
        logClick("click", "sharedecision-next", {
          finalThrough: currentThrough.name,
          finalWith: currentWith.name
        });
        onNext();
      }}>
        Next
      </button>
    </div>
  );
}
