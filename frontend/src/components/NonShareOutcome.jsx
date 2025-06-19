import React, { useState } from 'react';
import stepData from '../data/nonShareSteps.json';  // 🚀 读新的 JSON
import './WhatWillHappen.css'; // 样式可以复用，不用新写

export default function NonShareOutcome({ character, sceneContext, onBack, onNext }) {
  const { through, withWhom, info } = sceneContext;
  const [stepIndex, setStepIndex] = useState(0);
  
  const safeInfo = info || 'unknown';
  const safeWithWhom = withWhom || 'unknown';
  const safeThrough = through || 'unknown';
  const key = `${safeThrough}_${safeWithWhom}_${safeInfo}`;

  const steps = Array.isArray(stepData[key]) ? stepData[key] : (stepData["default"] || []);
  const current = steps[stepIndex];

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="consequence-container">
      <h2>What will happen?</h2>

      <div className="character-speech">
        <img className="avatar" src={`/avatars/${character.name.toLowerCase()}.png`} alt={character.name} />
        <div className="speech-bubble yellow">
          <p>{current.speech}</p>
        </div>
      </div>

      <div className="phone-image">
        <img src={current.image} alt="Consequence Scene" />
      </div>

      <div className="navigation-buttons">
        <button className="fixed-back-button" onClick={handleBack}>Back</button>
        <button className="fixed-next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
