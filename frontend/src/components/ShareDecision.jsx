import { useState, useEffect } from 'react';
import './ShareDecision.css';

export default function ShareDecision({
    shareThrough,
    shareWith,
    shareChoices,
    onChange,
    onNext,
    onBack,
    characterName
}) {
  
  const [throughIndex, setThroughIndex] = useState(() => {
    const index = shareThrough.findIndex(item => item.name === shareChoices.through);
    return index >= 0 ? index : 0;
  });
  
  const [withIndex, setWithIndex] = useState(() => {
    const index = shareWith.findIndex(item => item.name === shareChoices.with);
    return index >= 0 ? index : 0;
  });

  // 主动同步初始选项到 shareChoices（只调用一次）
  useEffect(() => {
    onChange({
      through: shareThrough[throughIndex].name,
      with: shareWith[withIndex].name
    });
  }, []); // 只在初次加载时运行

  const handleThroughChange = (dir) => {
    const newIndex = (throughIndex + dir + shareThrough.length) % shareThrough.length;
    setThroughIndex(newIndex);
    onChange({ through: shareThrough[newIndex].name });
  };

  const handleWithChange = (dir) => {
    const newIndex = (withIndex + dir + shareWith.length) % shareWith.length;
    setWithIndex(newIndex);
    onChange({ with: shareWith[newIndex].name });
  };

  const currentThrough = shareThrough[throughIndex];
  const currentWith = shareWith[withIndex];

  return (
    <div className="share-container">
      <h2>Let’s help {characterName || '[Name]'} make a decision!</h2>

      <div className="character-speech">
        <img className="avatar" src={`/avatars/${characterName.toLowerCase()}.png`} alt={characterName} />
        <div className="speech-bubble">
          <p>Ready? Let’s choose a scene to explore!</p>
        </div>
      </div>

      <div className="carousel-row">
        <div className="carousel-block">
          <h3 className="carousel-title purple-text">Share through</h3>
          <div className="carousel">
            <button className="arrow purple" onClick={() => handleThroughChange(-1)}>
              <img src="/icons/left-arrow.svg" alt="left" />
            </button>
            <div className="share-card purple">
              <img src={currentThrough.icon || '/icons/icon-placeholder.png'} alt={currentThrough.name} />
              <p>{currentThrough.name}</p>
            </div>
            <button className="arrow purple" onClick={() => handleThroughChange(1)}>
              <img src="/icons/right-arrow.svg" alt="right" />
            </button>
          </div>
        </div>

        <div className="carousel-block">
          <h3 className="carousel-title orange-text">Share with</h3>
          <div className="carousel">
            <button className="arrow orange" onClick={() => handleWithChange(-1)}>
              <img src="/icons/left-arrow.svg" alt="left" />
            </button>
            <div className="share-card orange">
              <img src={currentWith.icon || '/icons/icon-placeholder.png'} alt={currentWith.name} />
              <p>{currentWith.name}</p>
            </div>
            <button className="arrow orange" onClick={() => handleWithChange(1)}>
              <img src="/icons/right-arrow.svg" alt="right" />
            </button>
          </div>
        </div>
      </div>

      <button className="fixed-back-button" onClick={onBack}>Back</button>
      <button className="fixed-next-button" onClick={onNext}>Next</button>
    </div>
  );
}
