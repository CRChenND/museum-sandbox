import { useState, useEffect } from 'react';

export default function ShareDecision({
    shareThrough,
    shareWith,
    shareChoices,
    onChange,
    onNext,
    onBack,
    characterName
}) {
  const [throughIndex, setThroughIndex] = useState(0);
  const [withIndex, setWithIndex] = useState(0);

  // 初始化选项（只在组件首次加载时设置）
  useEffect(() => {
    onChange({
      through: shareThrough[0]?.name || '',
      with: shareWith[0]?.name || ''
    });
  }, []);

  const handleThroughChange = (direction) => {
    const newIndex = (throughIndex + direction + shareThrough.length) % shareThrough.length;
    setThroughIndex(newIndex);
    onChange({ through: shareThrough[newIndex].name });
  };

  const handleWithChange = (direction) => {
    const newIndex = (withIndex + direction + shareWith.length) % shareWith.length;
    setWithIndex(newIndex);
    onChange({ with: shareWith[newIndex].name });
  };

  const currentThrough = shareThrough[throughIndex];
  const currentWith = shareWith[withIndex];

  return (
    <div>
      <h2>Let’s help {characterName || 'your friend'} make a decision!</h2>
      <div className="character-message">
        <img src={`/avatars/${characterName.toLowerCase()}.png`} alt={characterName} />
        <div className="speech-bubble">
          <p>Hi! I'm Mateo. Sometimes when I use my phone, I get a little confused because I’m not sure what I can share and what I shouldn’t share. Can you help me?</p>
        </div>
      </div>

      <div className="carousel-row">
        <div>
          <h3>Share through</h3>
          <div className="carousel">
            <button onClick={() => handleThroughChange(-1)}>&lt;</button>
            <div className="share-card purple">
              <img src={currentThrough.icon} alt={currentThrough.name} />
              <p>{currentThrough.name}</p>
            </div>
            <button onClick={() => handleThroughChange(1)}>&gt;</button>
          </div>
        </div>

        <div>
          <h3>Share with</h3>
          <div className="carousel">
            <button onClick={() => handleWithChange(-1)}>&lt;</button>
            <div className="share-card orange">
              <img src={currentWith.icon} alt={currentWith.name} />
              <p>{currentWith.name}</p>
            </div>
            <button onClick={() => handleWithChange(1)}>&gt;</button>
          </div>
        </div>
      </div>

      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
}
