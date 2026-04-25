import { useState, useCallback } from 'react'

// ─── MULTIPLE CHOICE ───────────────────────────────────────────────────────
const mcQuestions = [
  {
    id: 'mc1', type: 'mc',
    question: 'My grandmother _____ in a small village before she moved to the city.',
    options: ["would live", "used to live", "Both are correct", "Neither is correct"],
    answer: 1,
    explanation: '"Living somewhere" is a PAST STATE. For states, only "used to live" is correct. "Would live" cannot describe states — only repeated actions.',
  },
  {
    id: 'mc2', type: 'mc',
    question: 'Every Sunday, my family _____ visit my grandparents in the countryside when I was little.',
    options: ["used to", "would", "Both are correct", "Neither is correct"],
    answer: 2,
    explanation: 'Visiting every Sunday is a repeated ACTION (habit), not a state. Both "used to visit" and "would visit" are grammatically correct for past habits.',
  },
  {
    id: 'mc3', type: 'mc',
    question: 'Quick! The train _____ — run!',
    options: ["leaves", "is leaving", "was leaving", "left"],
    answer: 1,
    explanation: '"Quick!" signals something happening RIGHT NOW → Present Continuous: is leaving. The urgency tells us the action is in progress at this very moment.',
  },
  {
    id: 'mc4', type: 'mc',
    question: 'Daniel _____ to school every day. He lives nearby.',
    options: ["is walking", "walks", "walk", "was walking"],
    answer: 1,
    explanation: 'Daily routine/habit → Present Simple. He/Daniel takes the -s ending: walks. Not "is walking" — that would mean right now.',
  },
  {
    id: 'mc5', type: 'mc',
    question: 'My dad _____ the car when he _____ a strange noise from the engine.',
    options: ["drove / was hearing", "was driving / heard", "drives / hears", "was driving / was hearing"],
    answer: 1,
    explanation: 'Ongoing background action (driving) → Past Continuous. The sudden interrupting event (heard) → Past Simple. Classic pattern!',
  },
  {
    id: 'mc6', type: 'mc',
    question: 'My aunt _____ a coffee shop near the park. It\'s very popular.',
    options: ["is having", "have", "has", "having"],
    answer: 2,
    explanation: '"Have" as ownership is a STATIVE verb — never used in continuous form. For she/he/it, we use "has."',
  },
  {
    id: 'mc7', type: 'mc',
    question: 'In 1 John 2:17, what does John say will happen to the world and its desires?',
    options: [
      "They will grow stronger over time",
      "They will pass away",
      "They will bring true happiness",
      "They will last forever"
    ],
    answer: 1,
    explanation: 'The verse says "the world and its desires PASS AWAY" — they are temporary. This is the core message: only doing God\'s will leads to what lasts forever.',
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
    question: 'In Matthew 5:42, "Give to the one who asks you," Jesus is calling us to...',
    options: [
      "Manage our resources carefully",
      "Give only to people we know well",
      "Practice open-handed generosity",
      "Avoid people who always ask for things"
    ],
    answer: 2,
    explanation: 'Jesus calls for radical, open-handed generosity — the opposite of the world\'s logic of protecting and accumulating. This reflects God\'s own character of giving.',
  },
]

// ─── FILL IN THE BLANK ────────────────────────────────────────────────────
const fillQuestions = [
  {
    id: 'f1',
    before: 'My grandfather',
    after: '(smoke), but he quit twenty years ago.',
    hint: 'used to + verb (past habit/state)',
    answer: 'used to smoke',
    acceptedAnswers: ['used to smoke'],
    explanation: 'Smoking for years is a past habit that no longer exists → "used to smoke." "Would smoke" could also work, but "used to" is preferred here.',
  },
  {
    id: 'f2',
    before: 'She',
    after: '(not / enjoy) reading, but now it\'s her favorite hobby.',
    hint: 'negative of used to',
    answer: "didn't use to enjoy",
    acceptedAnswers: ["didn't use to enjoy", "used not to enjoy"],
    explanation: '"Didn\'t use to enjoy" is the standard negative form. The change from past to present confirms we need "used to."',
  },
  {
    id: 'f3',
    before: 'The kids',
    after: '(play) in the street every afternoon after school.',
    hint: 'Both used to / would work here',
    answer: 'used to play',
    acceptedAnswers: ['used to play', 'would play'],
    explanation: 'Repeated afternoon action (a habit) — both "used to play" and "would play" are correct!',
  },
  {
    id: 'f4',
    before: 'My father',
    after: '(drive) to work when he (notice) a flat tyre.',
    hint: 'was driving + noticed',
    answer: 'was driving / noticed',
    acceptedAnswers: ['was driving / noticed', 'was driving, noticed'],
    explanation: 'Ongoing background action (driving) = Past Continuous. The sudden discovery (noticed) = Past Simple.',
  },
  {
    id: 'f5',
    before: 'Nicolás',
    after: '(sleep) peacefully when his alarm (go) off.',
    hint: 'was sleeping + went',
    answer: 'was sleeping / went',
    acceptedAnswers: ['was sleeping / went', 'was sleeping, went'],
    explanation: 'Nicolás\'s sleeping was the ongoing background. The alarm going off (go → went, irregular) interrupted it.',
  },
  {
    id: 'f6',
    before: 'The storm',
    after: '(last) three days and (destroy) many houses.',
    hint: 'lasted + destroyed (two completed past facts)',
    answer: 'lasted / destroyed',
    acceptedAnswers: ['lasted / destroyed', 'lasted and destroyed'],
    explanation: 'Two completed actions in the past, one after the other → both Past Simple.',
  },
]

// ─── MATCHING GAME ────────────────────────────────────────────────────────
const matchPairs = [
  { left: 'used to be', right: 'Past STATE (only used to)' },
  { left: 'was driving / heard', right: 'Background + Interruption' },
  { left: "walks", right: 'Daily habit (he/she/it → -s)' },
  { left: "is leaving", right: 'Happening right now' },
  { left: 'used to / would', right: 'Both correct for past habits' },
  { left: '1 John 2:17', right: 'World and its desires pass away' },
]

// ─── FLASHCARDS ───────────────────────────────────────────────────────────
const flashcards = [
  { front: "Signal words for Present Continuous", back: "→ now, right now, at the moment, listen!, look at that!" },
  { front: "Stative verbs — NEVER use in -ing form", back: "→ have (own), like, love, hate, know, believe, want, need, seem" },
  { front: "Action interrupted in the past", back: "→ Past Continuous (ongoing) + Past Simple (interruption)" },
  { front: "Past STATES (being shy, having something, liking)", back: "→ USED TO only — 'would' cannot describe states" },
  { front: "Both used to / would are correct when…", back: "→ the action is a REPEATED HABIT (not a state)" },
  { front: "1 John 2:17 teaches us…", back: "→ Worldly desires pass away; only God's will lasts forever" },
  { front: "'Give to the one who asks you' (Matt 5:42)", back: "→ A call to radical, open-handed generosity" },
  { front: "Marie Curie's two Nobel Prizes", back: "→ 1903: Physics (radioactivity) · 1911: Chemistry — only person to win in two different sciences" },
  { front: "How to form Past Continuous", back: "→ was / were + verb + -ing (e.g. she was reading, they were playing)" },
  { front: "Negative: used to (standard form)", back: "→ didn't use to + base verb (e.g. didn't use to enjoy)" },
]

// ─── READING COMPREHENSION ────────────────────────────────────────────────
const readingPassage = {
  title: 'Your Brain on Video Games',
  text: [
    `For many teenagers, video games are a daily activity — and parents often worry about the time their children spend in front of screens. But what does science actually say about video games and the brain? The answer might surprise you.`,
    `Research shows that playing video games can have several positive effects on the brain. Action games, for example, improve a player's ability to track multiple objects at the same time and to react quickly to unexpected events. Scientists at the University of Rochester found that people who played fast-paced action games made decisions 25% faster than non-gamers, without losing accuracy. Experts believe this happens because video games train the brain to process information more efficiently.`,
    `Video games can also develop problem-solving skills. Games like Minecraft require players to build structures, manage resources, and think creatively. Role-playing games challenge players to make complex decisions and plan strategies. Researchers at Michigan State University found a clear link between video game playing and greater creativity in children and teenagers.`,
    `However, not all the news is positive. Spending too many hours gaming can disrupt sleep patterns, as the blue light from screens interferes with the brain's production of melatonin — the hormone that makes us feel sleepy. Excessive gaming can also lead to social isolation if it replaces face-to-face time with friends and family.`,
    `The key, experts agree, is balance. Video games, like many things in life, are most beneficial when enjoyed in moderation and combined with physical activity, social time, and academic effort. The brain is an incredibly flexible organ — and how we choose to train it every day matters more than we might think.`,
  ],
  questions: [
    {
      id: 'rq1',
      question: 'What did scientists at the University of Rochester discover about gamers?',
      options: [
        'They sleep better than non-gamers',
        'They make decisions 25% faster than non-gamers',
        'They are 25% more intelligent than non-gamers',
        'They react more slowly to unexpected events',
      ],
      answer: 1,
      explanation: 'The text states: "people who played fast-paced action games made decisions 25% faster than non-gamers, without losing accuracy."',
    },
    {
      id: 'rq2',
      question: 'According to the text, why can video games negatively affect sleep?',
      options: [
        'Because gamers stay up too late playing',
        'Because the sound effects are too stimulating',
        'Because blue light from screens reduces melatonin production',
        'Because competitive games cause too much stress',
      ],
      answer: 2,
      explanation: 'The text says "blue light from screens interferes with the brain\'s production of melatonin — the hormone that makes us feel sleepy."',
    },
    {
      id: 'rq3',
      question: 'Which game does the text use as an example of developing creativity?',
      options: ['Call of Duty', 'Fortnite', 'Minecraft', 'FIFA'],
      answer: 2,
      explanation: 'The text specifically mentions Minecraft: "Games like Minecraft require players to build structures, manage resources, and think creatively."',
    },
    {
      id: 'rq4',
      question: 'What is the author\'s main message about video games?',
      options: [
        'Video games are harmful and teenagers should stop playing them',
        'Video games are always beneficial for the brain',
        'Only action games have positive effects',
        'Video games can be good or bad depending on how they are used',
      ],
      answer: 3,
      explanation: 'The author concludes with "balance" and "moderation" — the text presents both benefits and risks, making the main message that it depends on how games are used.',
    },
  ],
  openQuestion: {
    id: 'rq5',
    question: 'In your own words, explain how video games can both help AND hurt a teenager. Use at least two specific ideas from the text.',
    modelAnswer: 'Video games can help teenagers by improving decision-making speed and developing problem-solving skills and creativity (as shown in games like Minecraft). However, they can also hurt teenagers by disrupting sleep — because the blue light from screens reduces melatonin — and by causing social isolation if gaming replaces time with friends and family. The key is balance and moderation.',
  },
}

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

function ReadingPractice() {
  const [mcScores, setMcScores] = useState({})
  const [openAnswer, setOpenAnswer] = useState('')
  const [openSubmitted, setOpenSubmitted] = useState(false)

  const correct = Object.values(mcScores).filter(Boolean).length
  const total = readingPassage.questions.length

  return (
    <div>
      {/* Passage */}
      <div style={{ background: '#f8f7f4', border: '1px solid #e5e0d8', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
          {readingPassage.title}
        </h3>
        {readingPassage.text.map((para, i) => (
          <p key={i} style={{ fontSize: '0.93rem', lineHeight: 1.85, marginBottom: '0.9rem', color: '#3a3530' }}>{para}</p>
        ))}
      </div>

      {/* Score */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Reading Score</span>
        <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.05rem' }}>{correct} / {total} MC</span>
      </div>
      <div className="progress-bar" style={{ marginBottom: '2rem' }}>
        <div className="progress-fill" style={{ width: `${(correct / total) * 100}%` }} />
      </div>

      {/* MC Questions */}
      {readingPassage.questions.map(q => (
        <MCQuestion
          key={q.id}
          q={q}
          answered={mcScores[q.id] !== undefined}
          onAnswer={correct => setMcScores(s => ({ ...s, [q.id]: correct }))}
        />
      ))}

      {/* Open Question */}
      <div className="question-card">
        <div className="question-number">Open Response</div>
        <div className="question-text">{readingPassage.openQuestion.question}</div>
        <textarea
          className="workshop-textarea"
          value={openAnswer}
          onChange={e => setOpenAnswer(e.target.value)}
          placeholder="Write your answer here… (at least 2 ideas from the text)"
          rows={5}
          disabled={openSubmitted}
          style={{ fontSize: '16px' }}
        />
        {!openSubmitted ? (
          <button
            className="btn btn-primary btn-sm"
            style={{ marginTop: '0.75rem' }}
            onClick={() => setOpenSubmitted(true)}
            disabled={openAnswer.trim().split(/\s+/).length < 15}
          >
            ✓ Submit Answer
          </button>
        ) : (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '1rem', fontSize: '0.88rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--navy)' }}>📝 Model Answer — Compare with yours:</strong>
              <p style={{ lineHeight: 1.7, color: '#3a3a5c', margin: 0 }}>{readingPassage.openQuestion.modelAnswer}</p>
            </div>
          </div>
        )}
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
          { key: 'reading', label: '📖 Reading', count: '4 MC + 1 open' },
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

      {/* READING */}
      {activeGame === 'reading' && (
        <div>
          <div className="card" style={{ background: '#f0fdf4', marginBottom: '1.5rem' }}>
            <strong>📖 Reading Comprehension</strong>
            <p style={{ fontSize: '0.88rem', color: 'var(--gray-600)', marginTop: 4 }}>
              Read the text carefully, then answer the questions. Use the passage to support your answers!
            </p>
          </div>
          <ReadingPractice />
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
