import { useState, useCallback } from 'react'

// ─── MULTIPLE CHOICE ───────────────────────────────────────────────────────
const mcQuestions = [
  {
    id: 'mc1', type: 'mc',
    question: 'When I was a child, I _____ eat vegetables, but now I love them.',
    options: ["used to not", "didn't use to", "wouldn't", "wasn't used to"],
    answer: 1,
    explanation: '"Didn\'t use to" is the standard negative form of used to. "Used to not" is not standard. "Wouldn\'t" could work for habits but the sentence implies it was a state/dislike.',
  },
  {
    id: 'mc2', type: 'mc',
    question: 'Every evening, my grandfather _____ sit on the porch and tell us stories.',
    options: ["used to", "would", "Both are correct", "Neither is correct"],
    answer: 2,
    explanation: 'Sitting on the porch every evening is a repeated ACTION (habit), not a state. Both "used to sit" and "would sit" are grammatically correct for past habits/actions.',
  },
  {
    id: 'mc3', type: 'mc',
    question: 'Look! That lady _____ her uniform.',
    options: ["doesn't wear", "isn't wearing", "wasn't wearing", "not wears"],
    answer: 1,
    explanation: '"Look!" is a signal word for Present Continuous. The action is happening RIGHT NOW, so we use "isn\'t wearing."',
  },
  {
    id: 'mc4', type: 'mc',
    question: 'She _____ the bus to school. (habitual action)',
    options: ["is not taking", "doesn't take", "don't take", "isn't take"],
    answer: 1,
    explanation: 'Habitual actions use Present Simple. "She doesn\'t take" is correct. We use "doesn\'t" (not "don\'t") for she/he/it.',
  },
  {
    id: 'mc5', type: 'mc',
    question: 'I _____ in a café when you _____.',
    options: ["sat / was calling", "was sitting / called", "sit / call", "was sit / called"],
    answer: 1,
    explanation: 'Background/ongoing action → Past Continuous (was sitting). The interrupting action → Past Simple (called). Classic pattern!',
  },
  {
    id: 'mc6', type: 'mc',
    question: 'Mark _____ a bookstore. (permanent fact)',
    options: ["is having", "have", "has", "having"],
    answer: 2,
    explanation: '"Have" as ownership is a STATIVE verb — it cannot be used in continuous form. For he/she/it, we use "has."',
  },
  {
    id: 'mc7', type: 'mc',
    question: 'According to 1 John 2:17, why is it useless to cling to the world and its desires?',
    options: [
      "Because the world is evil",
      "Because the world and its desires pass away",
      "Because God forbids having things",
      "Because popularity leads to sin"
    ],
    answer: 1,
    explanation: 'The verse specifically says "the world and its desires PASS AWAY" — they are temporary. Only doing God\'s will leads to eternal life. The issue is not that things are evil, but that they don\'t last.',
  },
  {
    id: 'mc8', type: 'mc',
    question: 'According to the Marie Curie text, what did she contribute during World War I?',
    options: [
      "She invented the atomic bomb",
      "She developed mobile X-ray units to treat wounded soldiers",
      "She discovered radioactivity during the war",
      "She served as a nurse on the front lines"
    ],
    answer: 1,
    explanation: 'Marie created mobile X-ray units — vehicles with X-ray machines — that were driven to the front lines to treat wounded soldiers. They saved thousands of lives and were nicknamed "petites Curies."',
  },
  {
    id: 'mc9', type: 'mc',
    question: 'What does the word "radioactivity" mean according to the Marie Curie text?',
    options: [
      "The use of X-rays in medicine",
      "A type of dangerous chemical reaction",
      "The ability of certain minerals to emit energy without any external source",
      "The process of splitting atoms to release energy"
    ],
    answer: 2,
    explanation: 'The text defines it clearly: radioactivity is "the ability to emit energy without any external source." Marie Curie invented the word itself to describe this property she discovered in certain minerals.',
  },
  {
    id: 'mc10', type: 'mc',
    question: 'Does Matthew 5:42 agree with accumulating wealth and avoiding generosity?',
    options: [
      "Yes, the Bible supports wealth accumulation",
      "No, Jesus calls for radical generosity",
      "Yes, but only for non-believers",
      "The verse does not address money"
    ],
    answer: 1,
    explanation: 'Matthew 5:42 says "Give to the one who asks you" — this is a direct call to generosity, the opposite of hoarding. Jesus consistently taught counter-cultural giving.',
  },
]

// ─── FILL IN THE BLANK ────────────────────────────────────────────────────
const fillQuestions = [
  {
    id: 'f1',
    before: 'She',
    after: '(live) in Bogotá before moving to Barranquilla.',
    hint: 'used to + verb (state)',
    answer: 'used to live',
    acceptedAnswers: ['used to live'],
    explanation: 'This is a STATE (living somewhere), so only "used to" works, not "would."',
  },
  {
    id: 'f2',
    before: 'My brother',
    after: '(not / play) video games before he got a console.',
    hint: 'negative of used to',
    answer: "didn't use to play",
    acceptedAnswers: ["didn't use to play", "used not to play"],
    explanation: '"Didn\'t use to play" is the standard negative form.',
  },
  {
    id: 'f3',
    before: 'We',
    after: '(visit) our grandparents every Christmas when we were kids.',
    hint: 'Both used to / would work here',
    answer: 'used to visit',
    acceptedAnswers: ['used to visit', 'would visit'],
    explanation: 'Repeated action (visiting) — both "used to visit" and "would visit" are correct!',
  },
  {
    id: 'f4',
    before: 'The house',
    after: '(cost) £150,000 in 2003.',
    hint: 'completed past fact — Past Simple',
    answer: 'cost',
    acceptedAnswers: ['cost'],
    explanation: '"Cost" is an irregular verb: cost → cost (same in past). This is a completed fact.',
  },
  {
    id: 'f5',
    before: 'I',
    after: '(meet) a friend while I (do) the shopping.',
    hint: 'met + was doing',
    answer: 'met / was doing',
    acceptedAnswers: ['met / was doing', 'met while was doing'],
    explanation: 'Short interrupting action (met) = Past Simple. Background ongoing action (doing shopping) = Past Continuous.',
  },
  {
    id: 'f6',
    before: 'Ann',
    after: '(wait) for me when I (arrive).',
    hint: 'was waiting + arrived',
    answer: 'was waiting / arrived',
    acceptedAnswers: ['was waiting / arrived'],
    explanation: 'Ann\'s waiting was the ongoing background action. My arriving interrupted it.',
  },
]

// ─── MATCHING GAME ────────────────────────────────────────────────────────
const matchPairs = [
  { left: 'used to live', right: 'Past STATE (only used to)' },
  { left: 'was sitting / called', right: 'Background + Interruption' },
  { left: "doesn't take", right: 'Habitual action (she)' },
  { left: "isn't wearing", right: 'Right now (Look!)' },
  { left: 'used to / would', right: 'Both correct for habits' },
  { left: '1 John 2:17', right: 'World and its desires pass away' },
]

// ─── FLASHCARDS ───────────────────────────────────────────────────────────
const flashcards = [
  { front: "Signal word: 'Look!' or 'at the moment'", back: "→ Present Continuous" },
  { front: "He ___ a store. (ownership)", back: "→ HAS (stative verb, never 'is having')" },
  { front: "Action interrupted in the past", back: "→ Past Continuous + Past Simple" },
  { front: "Past STATES (living, having, liking)", back: "→ USED TO only (not would)" },
  { front: "Both used to / would are correct when…", back: "→ the action is a REPEATED HABIT (not a state)" },
  { front: "1 John 2:17 teaches us…", back: "→ Worldly desires pass away; God's will lasts forever" },
  { front: "'Give to the one who asks you' (Matt 5:42)", back: "→ Calls for radical generosity, opposite of hoarding" },
  { front: "Marie Curie's two Nobel Prizes", back: "→ 1903: Physics (radioactivity) · 1911: Chemistry — only person to win in two different sciences" },
  { front: "Phrasal verb: Turn into", back: "→ To transform/change into something else" },
  { front: "Negative: used to (standard form)", back: "→ didn't use to + verb (base)" },
]

// ─── COMPONENTS ───────────────────────────────────────────────────────────
function MCQuestion({ q, onAnswer, answered }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (i) => {
    if (submitted) return
    setSelected(i)
  }
  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    const correct = selected === q.answer
    onAnswer(correct)
  }

  return (
    <div className={`question-card ${submitted ? (selected === q.answer ? 'answered-correct' : 'answered-wrong') : ''}`}>
      <div className="question-number">Question</div>
      <div className="question-text">{q.question}</div>
      <div className="options-grid">
        {q.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${
              submitted
                ? i === q.answer ? 'correct' : i === selected ? 'wrong' : ''
                : selected === i ? 'selected' : ''
            }`}
            onClick={() => handleSelect(i)}
            disabled={submitted}
          >
            <span style={{ fontWeight: 700, opacity: 0.6 }}>{String.fromCharCode(65 + i)}.</span>
            {opt}
          </button>
        ))}
      </div>
      {!submitted && (
        <div style={{ marginTop: '0.75rem' }}>
          <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={selected === null}>
            ✓ Check Answer
          </button>
        </div>
      )}
      {submitted && (
        <div className={`feedback ${selected === q.answer ? 'correct' : 'wrong'}`}>
          {selected === q.answer ? '✅' : '❌'}
          <div><strong>{selected === q.answer ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}</div>
        </div>
      )}
    </div>
  )
}

function FillQuestion({ q, onAnswer, idx }) {
  const [val, setVal] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)

  const check = () => {
    const isCorrect = q.acceptedAnswers.some(a =>
      val.trim().toLowerCase() === a.toLowerCase()
    )
    setCorrect(isCorrect)
    setSubmitted(true)
    onAnswer(isCorrect)
  }

  return (
    <div className={`question-card ${submitted ? (correct ? 'answered-correct' : 'answered-wrong') : ''}`}>
      <div className="question-number">Fill in the Blank {idx + 1}</div>
      <div className="question-text">
        {q.before} <em style={{ color: 'var(--gold)', fontStyle: 'normal', fontWeight: 700 }}>[_____]</em> {q.after}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: '0.5rem' }}>
        💡 Hint: {q.hint}
      </div>
      <input
        className={`fill-input ${submitted ? (correct ? 'correct' : 'wrong') : ''}`}
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && !submitted && check()}
        disabled={submitted}
        placeholder="Type your answer here…"
      />
      {!submitted && (
        <button className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }} onClick={check} disabled={!val.trim()}>
          ✓ Check
        </button>
      )}
      {submitted && (
        <div className={`feedback ${correct ? 'correct' : 'wrong'}`}>
          {correct ? '✅ Correct!' : `❌ Incorrect. Answer: ${q.answer}`}
          <span style={{ marginLeft: 8 }}>{q.explanation}</span>
        </div>
      )}
    </div>
  )
}

function MatchingGame() {
  const [items] = useState(() => {
    const lefts = matchPairs.map(p => ({ id: `L${Math.random()}`, text: p.left, side: 'left', pairIdx: matchPairs.indexOf(p) }))
    const rights = [...matchPairs].sort(() => Math.random() - 0.5).map(p => ({ id: `R${Math.random()}`, text: p.right, side: 'right', pairIdx: matchPairs.indexOf(p) }))
    return { lefts, rights }
  })
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matched, setMatched] = useState([]) // pairIdx[]
  const [wrongPair, setWrongPair] = useState(null)

  const handleLeft = (item) => {
    if (matched.includes(item.pairIdx)) return
    setSelectedLeft(item)
  }
  const handleRight = (item) => {
    if (!selectedLeft || matched.includes(item.pairIdx)) return
    if (selectedLeft.pairIdx === item.pairIdx) {
      setMatched(m => [...m, item.pairIdx])
      setSelectedLeft(null)
    } else {
      setWrongPair(item.id)
      setTimeout(() => { setWrongPair(null); setSelectedLeft(null) }, 600)
    }
  }

  const done = matched.length === matchPairs.length

  return (
    <div>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
        Click a term on the left, then click its matching definition on the right.
      </p>
      <div className="match-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.lefts.map(item => (
            <div
              key={item.id}
              className={`match-item ${matched.includes(item.pairIdx) ? 'matched-correct' : selectedLeft?.id === item.id ? 'selected' : ''}`}
              onClick={() => handleLeft(item)}
            >
              {matched.includes(item.pairIdx) ? '✅ ' : ''}{item.text}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.rights.map(item => (
            <div
              key={item.id}
              className={`match-item ${matched.includes(item.pairIdx) ? 'matched-correct' : wrongPair === item.id ? 'matched-wrong' : ''}`}
              onClick={() => handleRight(item)}
            >
              {matched.includes(item.pairIdx) ? '✅ ' : ''}{item.text}
            </div>
          ))}
        </div>
      </div>
      {done && (
        <div className="feedback correct" style={{ marginTop: '1rem', fontSize: '1rem' }}>
          🎉 Perfect! You matched all pairs correctly!
        </div>
      )}
    </div>
  )
}

function Flashcards() {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [seen, setSeen] = useState([])

  const next = () => {
    setSeen(s => [...new Set([...s, idx])])
    setFlipped(false)
    setTimeout(() => setIdx(i => (i + 1) % flashcards.length), 150)
  }
  const prev = () => {
    setFlipped(false)
    setTimeout(() => setIdx(i => (i - 1 + flashcards.length) % flashcards.length), 150)
  }

  return (
    <div>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
        Click the card to reveal the answer. Use arrows to navigate. Card {idx + 1} of {flashcards.length} · {seen.length} reviewed.
      </p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(seen.length / flashcards.length) * 100}%` }} />
      </div>
      <div
        onClick={() => setFlipped(f => !f)}
        style={{ cursor: 'pointer', perspective: 800, margin: '1.5rem 0' }}
      >
        <div style={{
          position: 'relative', height: 160, transformStyle: 'preserve-3d',
          transition: 'transform 0.5s', transform: flipped ? 'rotateY(180deg)' : 'none'
        }}>
          {/* Front */}
          <div style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            background: 'var(--navy)', color: 'white', borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem', textAlign: 'center', fontSize: '1rem', lineHeight: 1.5
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Question</div>
              {flashcards[idx].front}
            </div>
          </div>
          {/* Back */}
          <div style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            background: 'var(--gold)', color: 'var(--navy)', borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem', textAlign: 'center', fontSize: '1.05rem', fontWeight: 700,
            transform: 'rotateY(180deg)', lineHeight: 1.5
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Answer</div>
              {flashcards[idx].back}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button className="btn btn-outline btn-sm" onClick={prev}>← Prev</button>
        <button className="btn btn-primary btn-sm" onClick={next}>Next →</button>
      </div>
    </div>
  )
}

// ─── MAIN PRACTICE COMPONENT ──────────────────────────────────────────────
export default function Practice({ onScoreUpdate }) {
  const [mcScores, setMcScores] = useState({})
  const [fillScores, setFillScores] = useState({})
  const [activeGame, setActiveGame] = useState('mc')

  const mcCorrect = Object.values(mcScores).filter(Boolean).length
  const fillCorrect = Object.values(fillScores).filter(Boolean).length
  const total = mcCorrect + fillCorrect
  const possible = mcQuestions.length + fillQuestions.length

  return (
    <div className="section">
      <div className="section-header">
        <h2>🎮 Practice Zone</h2>
        <p>Test your knowledge with multiple activities. Immediate feedback on every answer!</p>
      </div>

      {/* Score Bar */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 600 }}>Practice Score</span>
          <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.1rem' }}>{total} / {possible}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(total / possible) * 100}%` }} />
        </div>
      </div>

      {/* Activity Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { key: 'mc', label: '📝 Multiple Choice', count: `${mcCorrect}/${mcQuestions.length}` },
          { key: 'fill', label: '✏️ Fill in the Blank', count: `${fillCorrect}/${fillQuestions.length}` },
          { key: 'flash', label: '🃏 Flashcards', count: '10 cards' },
          { key: 'match', label: '🔗 Matching', count: '6 pairs' },
        ].map(tab => (
          <button
            key={tab.key}
            className={`btn ${activeGame === tab.key ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setActiveGame(tab.key)}
          >
            {tab.label} <span style={{ opacity: 0.7, fontWeight: 400, fontSize: '0.78rem' }}>({tab.count})</span>
          </button>
        ))}
      </div>

      {/* MULTIPLE CHOICE */}
      {activeGame === 'mc' && (
        <div>
          <div className="card" style={{ background: '#eff6ff', marginBottom: '1.5rem' }}>
            <strong>📝 Multiple Choice Questions</strong>
            <p style={{ fontSize: '0.88rem', color: 'var(--gray-600)', marginTop: 4 }}>
              Select the best answer for each question. Get instant feedback and explanation!
            </p>
          </div>
          {mcQuestions.map((q, i) => (
            <MCQuestion
              key={q.id}
              q={q}
              answered={mcScores[q.id] !== undefined}
              onAnswer={(correct) => setMcScores(s => ({ ...s, [q.id]: correct }))}
            />
          ))}
        </div>
      )}

      {/* FILL IN THE BLANK */}
      {activeGame === 'fill' && (
        <div>
          <div className="card" style={{ background: '#f0fdf4', marginBottom: '1.5rem' }}>
            <strong>✏️ Fill in the Blank</strong>
            <p style={{ fontSize: '0.88rem', color: 'var(--gray-600)', marginTop: 4 }}>
              Type the correct verb form in the blank. Press Enter or click Check. Hints are available!
            </p>
          </div>
          {fillQuestions.map((q, i) => (
            <FillQuestion
              key={q.id}
              q={q}
              idx={i}
              onAnswer={(correct) => setFillScores(s => ({ ...s, [q.id]: correct }))}
            />
          ))}
        </div>
      )}

      {/* FLASHCARDS */}
      {activeGame === 'flash' && (
        <div className="card">
          <div className="card-header">
            <div className="card-icon">🃏</div>
            <div>
              <div className="card-title">Flashcard Review</div>
              <div className="card-subtitle">Click card to flip • Navigate with arrows</div>
            </div>
          </div>
          <Flashcards />
        </div>
      )}

      {/* MATCHING */}
      {activeGame === 'match' && (
        <div className="card">
          <div className="card-header">
            <div className="card-icon">🔗</div>
            <div>
              <div className="card-title">Matching Game</div>
              <div className="card-subtitle">Connect each grammar concept to its description</div>
            </div>
          </div>
          <MatchingGame />
        </div>
      )}
    </div>
  )
}
