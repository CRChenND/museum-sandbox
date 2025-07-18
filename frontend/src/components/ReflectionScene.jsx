import React, { useState } from 'react';
import './ReflectionScene.css';

export default function ReflectionScene({ character, onBack, onNext, sceneContext, index: indexProp, setIndex, logClick }) {
  const { through, withWhom, info } = sceneContext;

  const steps = [
    {
      message: "Whew... Let's think about what just happened!",
      cards: []
    },
    {
      message: `Where did I share that info? Oh yeah… it was in the ${through}.`,
      cards: [
        {
          name:
            through === "dm"
              ? "Direct Message"
              : through === "group"
              ? "Group Chat. And lots of people were there"
              : "Game Channel. And lots of people were there.",
          icon: `/icons/channel/${through}.png`,
          color: "purple"
        }
      ]
    },
    {
      message: `Who was I talking to? Hmm… ${
        withWhom === "friend"
          ? "a friend"
          : withWhom === "stranger"
          ? "a stranger"
          : "someone I don’t really know"
      }!`,
      cards: [
        {
          name:
            through === "dm"
              ? "Direct Message"
              : through === "group"
              ? "Group Chat"
              : "Game Channel",
          icon: `/icons/channel/${through}.png`,
          color: "purple"
        },
        {
          name:
            withWhom === "friend"
              ? "Friend"
              : withWhom === "stranger"
              ? "Stranger"
              : "Unknown",
          icon: `/icons/people/${withWhom}.png`,
          color: "orange"
        }
      ]
    },
    {
      message: (() => {
        switch (info) {
          case "address":
            return "What would I tell them? They asked for my home address?";
          case "city":
            return "What would I tell them? They wanted to know which city I live in!";
          case "color":
            return "What would I tell them? They asked for my favorite color.";
          case "ice":
            return "What would I tell them? They asked about my favorite dessert!";
          case "playground":
            return "What would I tell them? They wanted to know where I hang out after school.";
          case "trip":
            return "What would I tell them? They asked about my last summer trip.";
          case "dog":
            return "What would I tell them? They asked about my dog.";
          default:
            return `What would I tell them? They asked for my ${info}!`;
        }
      })(),
      cards: [
        {
          name:
            through === "dm"
              ? "Direct Message"
              : through === "group"
              ? "Group Chat"
              : "Game Channel",
          icon: `/icons/channel/${through}.png`,
          color: "purple"
        },
        {
          name:
            withWhom === "friend"
              ? "Friend"
              : withWhom === "stranger"
              ? "Stranger"
              : "Unknown",
          icon: `/icons/people/${withWhom}.png`,
          color: "orange"
        },
        {
          name:
            info === "address"
              ? "My home address"
              : info === "city"
              ? "The city I live in"
              : info === "color"
              ? "My favorite color"
              : info === "ice"
              ? "My favorite dessert"
              : info === "playground"
              ? "I go to playground after school"
              : info === "trip"
              ? "My last summer trip"
              : `My ${info}`,
          icon: `/icons/info/${info}.png`,
          color: "blue"
        }
      ]
    }
  ];

  const [index, setIndexLocal] = useState(indexProp);

  const goNext = () => {
    if (index < steps.length - 1) {
      logClick("click", "reflection-next", { index });
      setIndexLocal(index + 1);
      setIndex(index + 1);
    } else {
      // last step handled by decision buttons
      setIndexLocal(0);
      setIndex(0);
    }
  };

  const goBack = () => {
    if (index > 0) {
      logClick("click", "reflection-back", { index });
      setIndexLocal(index - 1);
      setIndex(index - 1);
    } else {
      logClick("click", "reflection-back-to-phonescene");
      onBack();
    }
  };

  const handleDecision = (decision) => {
    logClick("click", `reflection-decision-${decision}`, {
      index,
      through,
      withWhom,
      info
    });
    onNext(decision);
  };

  const current = steps[index];

  return (
    <div className="reflection-container">
      <h2>Let’s help {character.name} make a decision!</h2>

      <div className="character-speech">
        <img
          className="avatar"
          src={`${import.meta.env.BASE_URL}avatars/${character.name.toLowerCase()}.png`}
          alt={character.name}
        />
        <div className="speech-bubble">
          <p>{current.message}</p>
        </div>
      </div>

      <div className="card-row">
        {current.cards.map((card, i) => (
          <div className={`card ${card.color}`} key={i}>
            <img
              src={`${import.meta.env.BASE_URL}${card.icon.slice(1)}`}
              alt={card.name}
            />
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
          <button className="ok-button" onClick={() => handleDecision("nonshare")}>
            No, keep it private!
          </button>
          <button className="risky-button" onClick={() => handleDecision("share")}>
            Yes, Share
          </button>
        </div>
      )}
    </div>
  );
}
