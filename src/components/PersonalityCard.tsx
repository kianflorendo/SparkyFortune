import type { PersonalityResult } from '../types';
import './PersonalityCard.css';
import sparkyFlying from '../assets/Sparky Flying 2.png';

interface PersonalityCardProps {
  result: PersonalityResult;
  onRestart: () => void;
}

export const PersonalityCard = ({ result, onRestart }: PersonalityCardProps) => {
  return (
    <>
      <div className="personality-card-backdrop" />
      <img src={sparkyFlying} alt="Sparky Flying" className="sparky-flying" />
      <div className="personality-card" style={{ borderColor: result.color }}>
        <div className="card-header" style={{ background: result.color }}>
          <h2>Your Personality Type</h2>
          <h1>{result.type}</h1>
        </div>
        
        <div className="card-body">
          <div className="message-section">
            <h3>Message for you:</h3>
            <p className="message">{result.message}</p>
          </div>

          <div className="traits-section">
            <h3>Your Key Traits:</h3>
            <ul className="traits-list">
              {result.traits.map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          </div>

          <button className="restart-button" onClick={onRestart}>
            Take the Test Again
          </button>
        </div>
      </div>
    </>
  );
};
