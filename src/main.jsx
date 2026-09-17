import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, ChevronRight, RotateCcw, Sparkles, TreePine, X } from 'lucide-react';
import './styles.css';

const rounds = [
  { numerator: 3, denominator: 4, options: ['1/2', '3/4', '4/3'], hint: 'Three of the four slices are shaded.' },
  { numerator: 2, denominator: 5, options: ['2/5', '3/5', '5/2'], hint: 'Two of the five slices are shaded.' },
  { numerator: 5, denominator: 6, options: ['1/6', '5/6', '6/5'], hint: 'Five of the six slices are shaded.' },
  { numerator: 1, denominator: 3, options: ['3/1', '1/3', '2/3'], hint: 'One of the three slices is shaded.' },
];

function FractionShape({ numerator, denominator }) {
  return (
    <div className="fraction-shape" aria-label={`${numerator} out of ${denominator} pieces shaded`}>
      {Array.from({ length: denominator }, (_, index) => (
        <span className={index < numerator ? 'slice shaded' : 'slice'} key={index} />
      ))}
    </div>
  );
}

function App() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const round = rounds[roundIndex];
  const isCorrect = selected === `${round.numerator}/${round.denominator}`;

  function choose(option) {
    if (selected) return;
    setSelected(option);
    if (option === `${round.numerator}/${round.denominator}`) setScore((value) => value + 1);
  }

  function nextRound() {
    if (roundIndex === rounds.length - 1) {
      setCompleted(true);
      return;
    }
    setRoundIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() {
    setRoundIndex(0);
    setSelected(null);
    setScore(0);
    setCompleted(false);
  }

  return (
    <main className="app-shell">
      <div className="sky-dot dot-one" />
      <div className="sky-dot dot-two" />
      <header className="topbar">
        <div className="brand"><TreePine size={25} strokeWidth={3} /><span>Fraction Forest</span></div>
        <button className="reset-button" onClick={restart}><RotateCcw size={16} /> Start over</button>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow"><Sparkles size={15} /> Tiny steps, big discoveries</p>
          <h1>Can you find the<br /><span>forest fraction?</span></h1>
          <p className="intro">Look at the shaded slices, then pick the fraction that tells the story.</p>
        </div>
        <div className="mascot" aria-hidden="true">🦊<span>Hi!</span></div>
      </section>

      <section className="game-card">
        <div className="progress-row">
          <span>Trail stop {completed ? rounds.length : roundIndex + 1} of {rounds.length}</span>
          <span className="score-pill">⭐ {score} correct</span>
        </div>
        <div className="progress-track"><span style={{ width: `${((completed ? rounds.length : roundIndex + 1) / rounds.length) * 100}%` }} /></div>

        {completed ? (
          <div className="complete-state">
            <div className="trophy">🏆</div>
            <p className="eyebrow">Trail complete!</p>
            <h2>You found {score} of {rounds.length} fractions.</h2>
            <p>Every try helps your brain remember. Want to explore the trail again?</p>
            <button className="primary-button" onClick={restart}>Play again <RotateCcw size={18} /></button>
          </div>
        ) : (
          <>
            <div className="prompt">
              <div className="prompt-copy">
                <span className="question-number">Question {roundIndex + 1}</span>
                <h2>What fraction is shaded?</h2>
                <p>Tap one answer below.</p>
              </div>
              <FractionShape numerator={round.numerator} denominator={round.denominator} />
            </div>
            <div className="choices">
              {round.options.map((option) => (
                <button
                  className={`choice ${selected && option === `${round.numerator}/${round.denominator}` ? 'correct' : ''} ${selected === option && !isCorrect ? 'wrong' : ''}`}
                  disabled={Boolean(selected)}
                  onClick={() => choose(option)}
                  key={option}
                >
                  <span>{option}</span>
                  {selected && option === `${round.numerator}/${round.denominator}` && <Check size={21} />}
                  {selected === option && !isCorrect && <X size={21} />}
                </button>
              ))}
            </div>
            {selected && (
              <div className={`feedback ${isCorrect ? 'feedback-good' : 'feedback-try'}`}>
                <div className="feedback-icon">{isCorrect ? <Check size={22} /> : <X size={22} />}</div>
                <div><strong>{isCorrect ? 'Nice work!' : 'Good try — look again.'}</strong><p>{isCorrect ? round.hint : `The answer is ${round.numerator}/${round.denominator}. ${round.hint}`}</p></div>
                <button className="next-button" onClick={nextRound}>{roundIndex === rounds.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={18} /></button>
              </div>
            )}
          </>
        )}
      </section>

      <footer>
        <strong>Why this works:</strong> This activity uses <em>retrieval practice</em> — recalling an answer, receiving feedback, and trying again.
        <span>Inspired by Roediger &amp; Karpicke (2006), <em>Psychological Science</em>.</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
