import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, ChevronRight, CircleHelp, RotateCcw, Sparkles, TreePine, X } from 'lucide-react';
import './styles.css';

const rounds = [
  {
    id: 'three-fourths', numerator: 3, denominator: 4, representation: 'shape',
    options: ['1/2', '3/4', '4/3'],
    prompt: 'What fraction is shaded?',
    hint: 'Count 3 shaded parts and 4 total parts.',
    visualLabel: 'A shape split into 4 equal parts, with 3 parts shaded.',
    feedback: '3 shaded parts out of 4 equal parts makes 3/4.',
  },
  {
    id: 'two-fifths', numerator: 2, denominator: 5, representation: 'number-line',
    options: ['2/5', '3/5', '5/2'],
    prompt: 'What fraction is marked on the number line?',
    hint: 'Find the marked point at 2 of the 5 equal spaces.',
    visualLabel: 'A number line from 0 to 1 split into 5 equal spaces, with 2/5 marked.',
    feedback: 'The marked point is 2 of 5 equal spaces from 0, so it shows 2/5.',
  },
  {
    id: 'five-sixths', numerator: 5, denominator: 6, representation: 'grouped-objects',
    options: ['1/6', '5/6', '6/5'],
    prompt: 'What fraction of the objects are highlighted?',
    hint: 'Count 5 highlighted apples out of 6 apples.',
    visualLabel: 'A group of 6 apples, with 5 apples highlighted.',
    feedback: '5 highlighted apples out of 6 apples makes 5/6.',
  },
  {
    id: 'one-third', numerator: 1, denominator: 3, representation: 'shape',
    options: ['3/1', '1/3', '2/3'],
    prompt: 'What fraction is shaded?',
    hint: 'Count 1 shaded part and 3 total parts.',
    visualLabel: 'A shape split into 3 equal parts, with 1 part shaded.',
    feedback: '1 shaded part out of 3 equal parts makes 1/3.',
  },
];

function FractionVisual({ numerator, denominator, representation, visualLabel }) {
  if (representation === 'number-line') {
    return (
      <div className="number-line" aria-label={visualLabel}>
        <div className="line-track">
          {Array.from({ length: denominator + 1 }, (_, index) => (
            <span className={`line-tick ${index === numerator ? 'marked' : ''}`} style={{ left: `${(index / denominator) * 100}%` }} key={index}>
              {index === numerator && <span className="line-point" />}
            </span>
          ))}
        </div>
        <div className="line-labels"><span>0</span><span>1</span></div>
      </div>
    );
  }

  if (representation === 'grouped-objects') {
    return (
      <div className="object-groups" aria-label={visualLabel}>
        {Array.from({ length: denominator }, (_, index) => <span className={index < numerator ? 'apple highlighted' : 'apple'} key={index}>●</span>)}
      </div>
    );
  }

  return (
    <div className="fraction-shape" aria-label={visualLabel}>
      {Array.from({ length: denominator }, (_, index) => (
        <span className={index < numerator ? 'slice shaded' : 'slice'} key={index} />
      ))}
    </div>
  );
}

function App() {
  const [phase, setPhase] = useState('main');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [missedIndexes, setMissedIndexes] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const retryRounds = missedIndexes.reduce((sequence, missedIndex, index) => {
    sequence.push(rounds[missedIndex]);
    const spacer = rounds.find((candidate, candidateIndex) => (
      !missedIndexes.includes(candidateIndex) && !sequence.some((item) => item.id === candidate.id)
    ));
    if (spacer && index < missedIndexes.length - 1) sequence.push(spacer);
    return sequence;
  }, []);
  const activeRounds = phase === 'main' ? rounds : retryRounds;
  const round = activeRounds[questionIndex];
  const isNotSure = selected === 'not-sure';
  const isCorrect = selected === `${round.numerator}/${round.denominator}`;
  const progressTotal = activeRounds.length;
  const progressLabel = phase === 'main'
    ? `Trail stop ${completed ? rounds.length : questionIndex + 1} of ${rounds.length}`
    : `Mastery retry ${questionIndex + 1} of ${progressTotal}`;

  function choose(option) {
    if (selected) return;
    setSelected(option);
    if (option === `${round.numerator}/${round.denominator}`) {
      if (!correctIds.includes(round.id)) {
        setCorrectIds((ids) => [...ids, round.id]);
        setScore((value) => value + 1);
      }
      return;
    }
    if (phase === 'main' && !missedIndexes.includes(questionIndex)) {
      setMissedIndexes((indexes) => [...indexes, questionIndex]);
    }
    setIncorrectAttempts((value) => value + 1);
  }

  function chooseNotSure() {
    if (selected) return;
    setSelected('not-sure');
    if (phase === 'main' && !missedIndexes.includes(questionIndex)) {
      setMissedIndexes((indexes) => [...indexes, questionIndex]);
    }
  }

  function nextRound() {
    if (questionIndex === activeRounds.length - 1) {
      if (phase === 'main' && missedIndexes.length > 0) {
        setPhase('retry');
        setQuestionIndex(0);
      } else {
        setCompleted(true);
      }
    } else {
      setQuestionIndex((value) => value + 1);
    }
    setSelected(null);
    setIncorrectAttempts(0);
  }

  function retryRound() {
    setSelected(null);
  }

  function restart() {
    setPhase('main');
    setQuestionIndex(0);
    setSelected(null);
    setIncorrectAttempts(0);
    setMissedIndexes([]);
    setCorrectIds([]);
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
          <p className="intro">Look at the visual model, then pick the fraction that tells the story.</p>
        </div>
        <div className="mascot" aria-hidden="true">🦊<span>Hi!</span></div>
      </section>

      <section className="game-card">
        <div className="progress-row">
          <span>{progressLabel}</span>
          <span className="score-pill">⭐ {score} correct</span>
        </div>
        <div className="progress-track"><span style={{ width: `${((completed ? progressTotal : questionIndex + 1) / progressTotal) * 100}%` }} /></div>

        {completed ? (
          <div className="complete-state">
            <div className="trophy">🏆</div>
            <p className="eyebrow">Trail complete!</p>
            <h2>You found {score} of {rounds.length} fractions.</h2>
            <p className="mastery-status">Fraction identification: {missedIndexes.length === 0 ? 'secure' : 'keep practicing'}</p>
            <p className="mastery-summary">{missedIndexes.length === 0 ? 'Identifying shaded fractions: mastered.' : `Keep practicing: ${missedIndexes.length} fraction${missedIndexes.length === 1 ? '' : 's'} need another look.`}</p>
            <p>Every try helps your brain remember. Want to explore the trail again?</p>
            <button className="primary-button" onClick={restart}>Play again <RotateCcw size={18} /></button>
          </div>
        ) : (
          <>
            <div className="prompt">
              <div className="prompt-copy">
                <span className="question-number">{phase === 'retry' ? 'Mastery question' : `Question ${questionIndex + 1}`}</span>
                <h2>{round.prompt}</h2>
                <p>Tap one answer below.</p>
              </div>
              <FractionVisual numerator={round.numerator} denominator={round.denominator} representation={round.representation} visualLabel={round.visualLabel} />
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
            <button className="not-sure-button" disabled={Boolean(selected)} onClick={chooseNotSure}><CircleHelp size={18} /> Not sure</button>
            {selected && (
              <div className={`feedback ${isCorrect ? 'feedback-good' : 'feedback-try'}`}>
                <div className="feedback-icon">{isCorrect ? <Check size={22} /> : isNotSure ? <CircleHelp size={22} /> : <X size={22} />}</div>
                <div>
                  <strong>{isCorrect ? 'Fraction found!' : isNotSure ? 'Here is a helpful clue.' : incorrectAttempts > 1 ? 'Let’s name the parts.' : 'Count the parts, then try again.'}</strong>
                  <p>{isCorrect
                    ? round.feedback
                    : isNotSure
                      ? `${round.hint} You can keep trying this question; it will come back during mastery review.`
                    : incorrectAttempts > 1
                      ? `The answer is ${round.numerator}/${round.denominator}. ${round.hint}`
                      : round.hint}</p>
                </div>
                {isCorrect ? (
                  <button className="next-button" onClick={nextRound}>{phase === 'main' && questionIndex === rounds.length - 1 && missedIndexes.length === 0 ? 'Finish' : 'Next'} <ChevronRight size={18} /></button>
                ) : (
                  <button className="next-button" onClick={retryRound}><RotateCcw size={18} /> Keep trying</button>
                )}
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
