import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import data from './data/data.json';
import CharacterSelect from './components/CharacterSelect.jsx';
import CharacterMessage from './components/CharacterMessage.jsx';
import ShareDecision from './components/ShareDecision.jsx';
import PhoneScene from './components/PhoneScene.jsx';
import ReflectionScene from './components/ReflectionScene.jsx';
import WhatWillHappen from './components/WhatWillHappen.jsx';
import TipsForYou from './components/TipsForYou.jsx';
import TryCombo from './components/TryCombo.jsx';
import WhatIfShare from './components/WhatIfShare.jsx';
import NonShareOutcome from './components/NonShareOutcome.jsx';
import './App.css';

function App() {
  const [sessionId, setSessionId] = useState('');
  const [step, setStep] = useState(0);
  const [selectedChar, setSelectedChar] = useState(data.characters[0]);
  const [shareChoices, setShareChoices] = useState({ through: '', with: '' });
  const [sceneContext, setSceneContext] = useState({
    through: '',
    withWhom: '',
    info: ''
  });
  const [finalChoice, setFinalChoice] = useState(null);
  const [reflectionIndex, setReflectionIndex] = useState(0);
  const [fromStep, setFromStep] = useState(null);

  const prev = () => {
    setStep((s) => {
      if (s === 3) {
        return fromStep !== null ? fromStep : 2; // 默认回 2
      } else {
        return Math.max(s - 1, 0);
      }
    });
  };
  const next = () => setStep((s) => s + 1);
  const setChoice = (c) => setShareChoices({ ...shareChoices, ...c });

  const handleReflectionNext = (decision) => {
    console.log("Final decision:", decision);
    setFinalChoice(decision);
    next();
  };

  const stepNameMap = {
    0: 'CharacterSelect',
    1: 'CharacterMessage',
    2: 'ShareDecision',
    3: 'PhoneScene',
    4: 'ReflectionScene',
    5: finalChoice === 'share' ? 'WhatWillHappen' : 'NonShareOutcome',
    6: 'WhatIfShare',
    7: 'TipsForYou',
    8: 'WhatWillHappen (from WhatIfShare)',
    9: 'TryCombo',
  };

  useEffect(() => {
    let existingId = localStorage.getItem('sessionId');
    if (!existingId) {
      existingId = uuidv4();
      localStorage.setItem('sessionId', existingId);
    }
    setSessionId(existingId);
  }, []);

  useEffect(() => {
    const name = stepNameMap[step];
    console.log(`🟢 Step ${step}: ${name}`);
    console.log('  shareChoices:', shareChoices);
    console.log('  sceneContext:', sceneContext);
    console.log('  finalChoice:', finalChoice);
    console.log('  reflectionIndex:', reflectionIndex);
    console.log('  fromStep:', fromStep);
  }, [step, shareChoices, sceneContext, finalChoice, reflectionIndex, fromStep]);

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
        onNext={() => {
          setFromStep(2);
          next();
        }}
        onBack={prev}
        characterName={selectedChar.name}
      />
    )}
    {step === 3 && (
      <PhoneScene
        character={selectedChar}
        shareChoices={shareChoices}
        onNext={next}
        onBack={prev}
        setSceneContext={setSceneContext}
        presetInfo={fromStep === 9 ? sceneContext.info : null}
      />
    )}
    {step === 4 && (
      <ReflectionScene
        character={selectedChar}
        onNext={handleReflectionNext}
        onBack={prev}
        sceneContext={sceneContext}
        index={reflectionIndex}
        setIndex={setReflectionIndex}
      />
    )}
    {step === 5 && finalChoice === "share" && (
      <WhatWillHappen
        character={selectedChar}
        sceneContext={sceneContext}
        onNext={() => setStep(6)}
        onBack={prev}
      />
    )}

    {step === 5 && finalChoice === "non-share" && (
      <NonShareOutcome
        character={selectedChar}
        sceneContext={sceneContext}
        onNext={() => setStep(6)}   // 👉 进入 WhatIfShare
        onBack={prev}
      />
    )}

    {step === 6 && (
      <WhatIfShare
        character={selectedChar}
        sceneContext={sceneContext}
        onSeeWhatHappens={() => setStep(8)}  // 👉 进入 WhatWillHappen
        onSkipToTips={() => setStep(7)}      // 👉 进入 TipsForYou
        onBack={prev}
      />
    )}

    {step === 7 && (
      <TipsForYou
        character={selectedChar}
        sceneContext={sceneContext}
        onPickAnother={() => {
          setStep(0);
          setFinalChoice(null);
        }}
        onRetry={() => {
          setStep(9);  // TryCombo
        }}
      />
    )}

    {step === 8 && (
      <WhatWillHappen
        character={selectedChar}
        sceneContext={sceneContext}
        onNext={() => setStep(7)}   // 👉 看完后继续去 Tips
        onBack={prev}
      />
    )}

    {step === 9 && (
      <TryCombo
        sceneContext={sceneContext}
        onTryCombo={(newContext) => {
          setSceneContext(newContext);
          setShareChoices({ through: newContext.through, with: newContext.withWhom });
          setFromStep(9);
          setStep(3);
        }}
      />
    )}

  </div>

  );
}

export default App;
