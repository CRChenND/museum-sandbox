import React, { useState } from 'react';
import stepData from '../data/nonShareSteps.json';  // 读取非分享路径的数据
import './WhatWillHappen.css'; // 复用样式

export default function NonShareOutcome({ character, sceneContext, onBack, onNext, logClick }) {
  const { through, withWhom, info } = sceneContext;
  const [stepIndex, setStepIndex] = useState(0);

  const safeInfo = info || 'unknown';
  const safeWithWhom = withWhom || 'unknown';
  const safeThrough = through || 'unknown';
  const key = `${safeThrough}_${safeWithWhom}_${safeInfo}`;

  const steps = Array.isArray(stepData[character.id]?.[key])
    ? stepData[character.id][key]
    : stepData[character.id]?.["default"] || [];

  const current = steps[stepIndex];

  const handleNext = () => {
    logClick("click", "nonshareoutcome-next", {
      stepIndex,
      through: safeThrough,
      withWhom: safeWithWhom,
      info: safeInfo
    });

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    logClick("click", "nonshareoutcome-back", {
      stepIndex,
      through: safeThrough,
      withWhom: safeWithWhom,
      info: safeInfo
    });

    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else {
      onBack();
    }
  };

  // 🚨 fallback UI if no steps available
  if (!current) {
    return (
      <div className="consequence-container">
        <h2>What will happen?</h2>
        <div className="character-speech">
          <img
            className="avatar"
            src={`${import.meta.env.BASE_URL}avatars/${character.name.toLowerCase()}.png`}
            alt={character.name}
          />
          <div className="speech-bubble yellow">
            <p>Hmm... I’m not sure what happens if we don’t share here. Maybe let’s explore another option.</p>
          </div>
        </div>
        <div className="navigation-buttons">
          <button className="fixed-back-button" onClick={handleBack}>Back</button>
          <button className="fixed-next-button" onClick={onNext}>Skip</button>
        </div>
      </div>
    );
  }

  return (
    <div className="consequence-container">
      <h2>What will happen?</h2>

      <div className="character-speech">
        <img
          className="avatar"
          src={`${import.meta.env.BASE_URL}avatars/${character.name.toLowerCase()}.png`}
          alt={character.name}
        />
        <div className="speech-bubble yellow">
          <p>{current.speech}</p>
        </div>
      </div>

      <div className="phone-image">
        <img
          src={`${import.meta.env.BASE_URL}${current.image.slice(1)}`}
          alt="Consequence Scene"
        />
      </div>

      <div className="navigation-buttons">
        <button className="fixed-back-button" onClick={handleBack}>Back</button>
        <button className="fixed-next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
