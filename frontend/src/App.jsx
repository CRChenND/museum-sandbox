import React, { useState } from 'react';
import data from './data/data.json';
import CharacterSelect from './components/CharacterSelect.jsx';
import CharacterMessage from './components/CharacterMessage.jsx';
import ShareDecision from './components/ShareDecision.jsx';
import './App.css';

function App() {
  const [step, setStep] = useState(0);
  const [selectedChar, setSelectedChar] = useState(data.characters[0]);
  const [shareChoices, setShareChoices] = useState({ through: '', with: '' });

  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const next = () => setStep((s) => s + 1);
  const setChoice = (c) => setShareChoices({ ...shareChoices, ...c });

  return (
    <div className="app">
      {step === 0 && (
        <CharacterSelect
          characters={data.characters}
          selected={selectedChar}
          onSelect={setSelectedChar}
          onNext={next}
        />
      )}
      {step === 1 && (
        <CharacterMessage
          character={selectedChar}
          onNext={next}
          onBack={prev}
        />
      )}
      {step === 2 && (
        <ShareDecision
          shareThrough={data.shareThrough}
          shareWith={data.shareWith}
          shareChoices={shareChoices}
          onChange={setChoice}
          onNext={next}
          onBack={prev}
          characterName={selectedChar.name}
        />
      
      )}
    </div>
  );
}

export default App;
