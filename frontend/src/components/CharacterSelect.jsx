import './CharacterSelect.css';
import { logClick } from '../utils/logger';

export default function CharacterSelect({ characters, selected, onSelect, onNext }) {
  return (
    <div>
      <h2>Hello! Choose your friend!</h2>
      <div className="character-grid">
        {characters.map((char) => (
          <button
            key={char.id}
            className={`character-button ${char.id === selected.id ? 'selected' : ''}`}
            onClick={() => {
              logClick("click", "character-button", 0, char.name, { characterId: char.id });
              onSelect(char);
            }}
          >
            <p style={{ opacity: char.id === selected.id ? 1 : 0.4 }}>{char.name}</p>
            {/* <img src={char.avatar} alt={char.name} /> */}
            <img src={`${import.meta.env.BASE_URL}${char.avatar.slice(1)}`} alt={char.name} />
          </button>
        ))}
      </div>
      <button className="fixed-next-button" 
        onClick={() => {
          logClick("click", "character-next-button", 0, selected.name);
          onNext();
        }}
      >Next</button>
    </div>
  );
}
