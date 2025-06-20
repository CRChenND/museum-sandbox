import React, { useState } from 'react';
import './ReflectionScene.css';

export default function ReflectionScene({ character, onBack, onNext, sceneContext, index: indexProp, setIndex }) {
  const { through, withWhom, info } = sceneContext;
  const steps = [
    {
      message: "Whew… Let’s think about what just happened together!",
      cards: []
    },
    {
      message: `Where did I share that info? Oh yeah… it was in the ${through}. And lots of people were there.`,
      cards: [
        { name: through === "dm" ? "Direct Message" : through === "group" ? "Group Chat" : "Game Channel", icon: `/icons/channel/${through}.png`, color: "purple" }
      ]
    },
    {
      message: `Who was I talking to? Hmm… ${withWhom === "friend" ? "a friend" : withWhom === "stranger" ? "a stranger" : "someone I don’t really know"}!`,
      cards: [
        { name: through === "dm" ? "Direct Message" : through === "group" ? "Group Chat" : "Game Channel", icon: `/icons/channel/${through}.png`, color: "purple" },
        { name: withWhom === "friend" ? "Friend" : withWhom === "stranger" ? "Stranger" : "Unknown", icon: `/icons/people/${withWhom}.png`, color: "orange" }
      ]
    },
    {
      message: `What would I tell them? They asked for my ${info}!`,
      cards: [
        { name: through === "dm" ? "Direct Message" : through === "group" ? "Group Chat" : "Game Channel", icon: `/icons/channel/${through}.png`, color: "purple" },
        { name: withWhom === "friend" ? "Friend" : withWhom === "stranger" ? "Stranger" : "Unknown", icon: `/icons/people/${withWhom}.png`, color: "orange" },
        { name: info === "address" ? "My home address" : info === "city" ? "The city I live in" : info === "color" ? "My favorite color" : info === "ice" ? "I like ice cream" : info === "playground" ? "I go to playground after school" : info === "trip" ? "My last summer trip" : `My ${info}`, icon: `/icons/info/${info}.png`, color: "blue" }
      ]
    }
  ];

  const [index, setIndexLocal] = useState(indexProp); // indexProp 从 props 传进来

  const goNext = () => {
    if (index < steps.length - 1) {
      setIndexLocal(index + 1);
      setIndex(index + 1); // 更新 App.jsx 里的 state
    } else {
      onNext();
    }
  };

  const goBack = () => {
    if (index > 0) {
      setIndexLocal(index - 1);
      setIndex(index - 1);
    } else {
      onBack();
    }
  };

  const current = steps[index];

  return (
    <div className="reflection-container">
      <h2>Let’s help {character.name} make a decision!</h2>

      <div className="character-speech">
      <img className="avatar" src={`${import.meta.env.BASE_URL}avatars/${character.name.toLowerCase()}.png`} alt={character.name} />
        <div className="speech-bubble">
          <p>{current.message}</p>
        </div>
      </div>

      <div className="card-row">
        {current.cards.map((card, i) => (
          <div className={`card ${card.color}`} key={i}>
            <img src={`${import.meta.env.BASE_URL}${card.icon.slice(1)}`} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>

      {index < steps.length - 1 ? (
        <div>
            <button className="fixed-back-button" onClick={goBack}>Back</button>
            <button className="fixed-next-button" onClick={goNext}>Next</button>
        </div>
        ) : (
        <div className="decision-buttons">
            <button className="ok-button" onClick={() => onNext("non-share")}>No, keep it private!</button>
            <button className="risky-button" onClick={() => onNext("share")}>Yes, Share</button>
        </div>
        )}
    </div>
  );
}
