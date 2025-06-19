import React from 'react';
import './ReflectionScene.css'; // 样式直接用 ReflectionScene.css

export default function WhatIfShare({ character, sceneContext, onSeeWhatHappens, onSkipToTips }) {
  const { through, withWhom, info } = sceneContext;

  const cards = [
    { 
      name: through === "dm" ? "Direct Message" : through === "group" ? "Group Chat" : "Game Channel", 
      icon: `/icons/channel/${through}.png`, 
      color: "purple" 
    },
    { 
      name: withWhom === "friend" ? "Friend" : withWhom === "stranger" ? "Stranger" : "Unknown", 
      icon: `/icons/people/${withWhom}.png`, 
      color: "orange" 
    },
    { 
      name: info === "address" ? "My home address" : info === "city" ? "The city I live in" : info === "color" ? "My favorite color" : info === "ice" ? "I like ice cream" : info === "playground" ? "I go to playground after school" : info === "trip" ? "My last summer trip" : `My ${info}`, 
      icon: `/icons/info/${info}.png`, 
      color: "blue" 
    }
  ];

  return (
    <div className="reflection-container">
      <h2>What could happen if we share this?</h2>

      <div className="character-speech">
        <img className="avatar" src={`/avatars/${character.name.toLowerCase()}.png`} alt={character.name} />
        <div className="speech-bubble">
          <p>Hmm... I wonder what might happen if I share this with others.</p>
        </div>
      </div>

      <div className="card-row">
        {cards.map((card, i) => (
          <div className={`card ${card.color}`} key={i}>
            <img src={card.icon} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>

      <div className="decision-buttons">
        <button className="risky-button" onClick={onSeeWhatHappens}>See what happens</button>
        <button className="ok-button" onClick={onSkipToTips}>Skip to tips</button>
      </div>
    </div>
  );
}
