import React from 'react';
import tipsData from '../data/tipsData.json';
import './TipsForYou.css';

export default function TipsForYou({ character, sceneContext, onPickAnother, onRetry }) {
  const { through, withWhom, info } = sceneContext;

  const safeInfo = info || 'unknown';
  const safeWithWhom = withWhom || 'unknown';
  const safeThrough = through || 'unknown';
  const key = `${safeThrough}_${safeWithWhom}_${safeInfo}`;

  const tips = tipsData[key] || tipsData["default"];

  return (
    <div className="tips-container">
        <h2>Tips for you</h2>

        <div className="tips-content">
            <div className="tips-row">
            <div className="tip-card">
                <h3>{tips.left.title}</h3>
                <p>{tips.left.content}</p>
            </div>
            <div className="tip-card">
                <h3>{tips.right.title}</h3>
                <p>{tips.right.content}</p>
            </div>
            </div>
        </div>

        <div className="tips-buttons">
            <button onClick={onPickAnother}>Pick another friend</button>
            <button onClick={onRetry}>Try again with {character.name || '[Name]'}</button>
        </div>
        
    </div>
  );
}
