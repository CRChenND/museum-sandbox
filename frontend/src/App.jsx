import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import data from './data/data.json';
import { logClick } from './utils/logger.js';
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
  const [showResetPopup, setShowResetPopup] = useState(false);  // ➡️ 控制 popup

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

  const currentStepName = stepNameMap[step];
  const currentCharacterName = selectedChar?.name || "unknown";

  const logEventWithContext = (event, element, extra = {}) => {
    logClick(event, element, currentStepName, currentCharacterName, { ...extra, userId: sessionId });
  };

  const generateNewSessionId = () => {
    const newId = uuidv4();
    localStorage.setItem('sessionId', newId);
    setSessionId(newId);
  };

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

  useEffect(() => {
    if (sessionId) {
      logEventWithContext("start", "app-init");
    }
  }, [sessionId]);

  useEffect(() => {
    let existingId = localStorage.getItem('sessionId');
    if (!existingId) {
      generateNewSessionId();
    } else {
      setSessionId(existingId);
    }
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

  const resetApp = () => {
    logEventWithContext("click", "reset-app");
  
    generateNewSessionId();  // ✅ 重新生成 ID
  
    setStep(0);
    setFinalChoice(null);
    setSceneContext({ through: '', withWhom: '', info: '' });
    setShareChoices({ through: '', with: '' });
    setReflectionIndex(0);
    setFromStep(null);
    setShowResetPopup(false);
  };

  return (
    <div className="app">

      {/* 右上角小圆点 */}
      <button 
        className="reset-button" 
        onClick={() => setShowResetPopup(true)}
        title="Reset"
      ></button>

      {/* 弹窗 */}
      {showResetPopup && (
        <div className="reset-popup">
          <div className="reset-popup-content">
            <p>Are you sure you want to refresh and start over?</p>
            <button onClick={resetApp}>Yes</button>
            <button onClick={() => setShowResetPopup(false)}>No</button>
          </div>
        </div>
      )}

    {step === 0 && (
      <CharacterSelect
        characters={data.characters}
        selected={selectedChar}
        onSelect={setSelectedChar}
        onNext={next}
        logClick={logEventWithContext}
      />
    )}
    {step === 1 && (
      <CharacterMessage
        character={selectedChar}
        onNext={next}
        onBack={prev}
        logClick={logEventWithContext}
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
        logClick={logEventWithContext}
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
        logClick={logEventWithContext}
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
        logClick={logEventWithContext}
      />
    )}
    {step === 5 && finalChoice === "share" && (
      <WhatWillHappen
        character={selectedChar}
        sceneContext={sceneContext}
        onNext={() => setStep(7)}
        onBack={prev}
        logClick={logEventWithContext}
      />
    )}

    {step === 5 && finalChoice === "non-share" && (
      <NonShareOutcome
        character={selectedChar}
        sceneContext={sceneContext}
        onNext={() => setStep(6)}   // 👉 进入 WhatIfShare
        onBack={prev}
        logClick={logEventWithContext}
      />
    )}

    {step === 6 && (
      <WhatIfShare
        character={selectedChar}
        sceneContext={sceneContext}
        onSeeWhatHappens={() => setStep(8)}  // 👉 进入 WhatWillHappen
        onSkipToTips={() => setStep(7)}      // 👉 进入 TipsForYou
        onBack={prev}
        logClick={logEventWithContext}
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
        logClick={logEventWithContext}
      />
    )}

    {step === 8 && (
      <WhatWillHappen
        character={selectedChar}
        sceneContext={sceneContext}
        onNext={() => setStep(7)}   // 👉 看完后继续去 Tips
        onBack={prev}
        logClick={logEventWithContext}
      />
    )}

    {step === 9 && (
      <TryCombo
        character={selectedChar}
        sceneContext={sceneContext}
        onTryCombo={(newContext) => {
          setSceneContext(newContext);
          setShareChoices({ through: newContext.through, with: newContext.withWhom });
          setFromStep(9);
          setStep(3);
        }}
        logClick={logEventWithContext}
      />
    )}

  </div>

  );
}

export default App;
