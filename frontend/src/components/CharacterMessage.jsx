export default function CharacterMessage({ character, onNext, onBack }) {
  return (
    <div className="character-container">
      <h2>What should we do?</h2>
      <div className="character-message">
        <img src={character.avatar} alt={character.name} />
        <div className="speech-bubble">
          <p>{character.message}</p>
          <p>Can you help me?</p>
        </div>
      </div>
      <div className="button-row">
        <button className="back-button" onClick={onBack}>Back</button>
        <button className="next-button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}
