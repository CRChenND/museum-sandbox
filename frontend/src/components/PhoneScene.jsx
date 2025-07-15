import React, { useMemo } from 'react';
import './PhoneScene.css';

export default function PhoneScene({ character, shareChoices, onBack, onNext, setSceneContext, presetInfo, logClick }) {
  const normalize = (value) => {
    if (!value) return 'unknown';
    const lower = value.toLowerCase();
    if (lower.includes('direct')) return 'dm';
    if (lower.includes('dm')) return 'dm';
    if (lower.includes('game')) return 'game';
    if (lower.includes('group')) return 'group';
    if (lower.includes('friend')) return 'friend';
    if (lower.includes('stranger')) return 'stranger';
    if (lower.includes('unknown')) return 'unknown';
    return 'unknown';
  };

  const infoOptionsAll = ['address', 'birthday', 'city', 'color', 'dog', 'ice', 'playground', 'trip'];
  const infoOptionsUnknown = ['address', 'birthday'];

  const normalizedThrough = normalize(shareChoices.through);
  const normalizedWith = normalize(shareChoices.with);

  const info = useMemo(() => {
    if (presetInfo) return presetInfo;
    const isUnknown = normalizedWith === 'unknown';
    const pool = isUnknown ? infoOptionsUnknown : infoOptionsAll;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [presetInfo, normalizedWith]);

  const gifPath = `gifs/${character.id}/${info}/${normalizedThrough}_${normalizedWith}_${info}_ask.gif`;

  const getMessage = (throughRaw, withWhomRaw) => {
    const through = normalize(throughRaw);
    const withWhom = normalize(withWhomRaw);
    const key = `${withWhom}_${through}`;

    const messages = {
      "stranger_group": "I'm chatting in a group. Someone I don't know is in the chat. Should I tell them this?",
      "stranger_dm": "I'm messaging someone I don’t know directly. Should I tell them this?",
      "stranger_game": "I'm chatting in a game room. A stranger is in there with me. Should I tell them this?",

      "friend_group": "I'm chatting in a group. A friend is in the chat. Should I tell them this?",
      "friend_dm": "I'm messaging a friend directly. Should I tell them this?",
      "friend_game": "I'm chatting in a game room. A friend is playing with me. Should I tell them this?",

      "unknown_group": "I'm chatting in a group. I'm not sure who is in there. Should I tell them this?",
      "unknown_dm": "I'm messaging someone, but I’m not sure who they are. Should I tell them this?",
      "unknown_game": "I'm chatting in a game room, but I don’t really know who else is there. Should I tell them this?",
    };

    return messages[key] || "I'm chatting online. Should I share this information?";
  };

  const message = getMessage(shareChoices.through, shareChoices.with);

  const handleNext = () => {
    setSceneContext({
      through: normalizedThrough,
      withWhom: normalizedWith,
      info: info 
    });

    logClick("click", "phonescene-next", {
      through: normalizedThrough,
      with: normalizedWith,
      info
    });

    onNext();
  };

  return (
    <div className="phone-scene-container">
      <h2>Let’s help {character.name} make a decision!</h2>
      <div className="character-speech">
        <img
          className="avatar"
          src={`${import.meta.env.BASE_URL}avatars/${character.name.toLowerCase()}.png`}
          alt={character.name}
        />
        <div className="speech-bubble">
          <p>{message}</p>
        </div>
      </div>

      <div className="gif-wrapper">
        <img src={`${import.meta.env.BASE_URL}${gifPath}`} alt="Phone Scene" />
      </div>

      <button
        className="fixed-back-button"
        onClick={() => {
          logClick("click", "phonescene-back");
          onBack();
        }}
      >
        Back
      </button>

      <button
        className="fixed-next-button"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}
