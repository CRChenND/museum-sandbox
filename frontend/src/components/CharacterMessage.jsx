import './CharacterMessage.css';

export default function CharacterMessage({ character, onNext, onBack, logClick }) {
  return (
    <div className="character-container">
      <h2>What should we do?</h2>
      <div className="character-main">
        <div className="character-message">
          <div className="character-avatar">
            <div className="character-name">{character.name}</div>
            <img src={`${import.meta.env.BASE_URL}${character.avatar.slice(1)}`} alt={character.name} />
          </div>
          <div className="speech-bubble">
            <p>{character.message}</p>
            <p>Can you help me?</p>
          </div>
        </div>
      </div>
      <button
        className="fixed-back-button"
        onClick={() => {
          logClick("click", "character-message-back");
          onBack();
        }}
      >
        Back
      </button>
      <button
        className="fixed-next-button"
        onClick={() => {
          logClick("click", "character-message-next");
          onNext();
        }}
      >
        Next
      </button>
    </div>
  );
}
