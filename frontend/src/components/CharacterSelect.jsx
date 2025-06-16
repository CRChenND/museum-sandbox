import './CharacterSelect.css';

export default function CharacterSelect({ characters, selected, onSelect, onNext }) {
  return (
    <div>
      <h2>Hello! Choose your friend!</h2>
      <div className="character-grid">
        {characters.map((char) => (
          <button
            key={char.id}
            className={`character-button ${char.id === selected.id ? 'selected' : ''}`}
            onClick={() => onSelect(char)}
          >
            <p style={{ opacity: char.id === selected.id ? 1 : 0.4 }}>{char.name}</p>
            <img src={char.avatar} alt={char.name} />
          </button>
        ))}
      </div>
      <button className="fixed-next-button" onClick={onNext}>Next</button>
    </div>
  );
}
