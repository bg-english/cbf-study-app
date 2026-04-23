import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

// ─── WORKSHOP QUESTIONS ───────────────────────────────────────────────────
const workshopSections = [
  {
    id: 'grammar1',
    title: 'Part 1 — Grammar: Present Tenses',
    tag: 'Grammar',
    tagClass: 'tag-blue',
    instructions: 'Complete each sentence with the correct form of the verb in brackets (Present Simple or Present Continuous).',
    questions: [
      { id: 'g1', text: '1. I _____________ supermarkets, but my father doesn\'t. (like)', answer: 'like', acceptedAnswers: ['like'], explanation: 'This is a general preference/fact → Present Simple. I + base verb.' },
      { id: 'g2', text: '2. Look! That lady _____________ her uniform. (not/wear)', answer: 'isn\'t wearing', acceptedAnswers: ["isn't wearing", "is not wearing"], explanation: '"Look!" signals Present Continuous. Negative continuous: isn\'t wearing.' },
      { id: 'g3', text: '3. She _____________ the bus to school. (not/take)', answer: "doesn't take", acceptedAnswers: ["doesn't take", "does not take"], explanation: 'Habitual action → Present Simple. She + doesn\'t + base verb.' },
      { id: 'g4', text: '4. _____ they _____ at the moment? (text)', answer: 'Are / texting', acceptedAnswers: ['are / texting', 'are texting', 'are they texting'], explanation: '"At the moment" → Present Continuous question: Are + they + verb-ing?' },
      { id: 'g5', text: '5. Mark _____________ a bookstore. (have)', answer: 'has', acceptedAnswers: ['has'], explanation: '"Have" as ownership is stative. He/Mark → has (never "is having").' },
      { id: 'g6', text: '6. Sam _____________ a cup of tea now. (have)', answer: 'is having', acceptedAnswers: ['is having'], explanation: '"Now" signals continuous. "Have" meaning "to consume/drink" CAN be continuous.' },
    ]
  },
  {
    id: 'grammar2',
    title: 'Part 2 — Grammar: Past Tenses',
    tag: 'Grammar',
    tagClass: 'tag-blue',
    instructions: 'Complete with Past Simple or Past Continuous of the verb in brackets.',
    questions: [
      { id: 'p1', text: '1. The house _____________ £150,000 in 2003. (cost)', answer: 'cost', acceptedAnswers: ['cost'], explanation: '"Cost" is irregular: cost → cost. Completed past fact → Past Simple.' },
      { id: 'p2', text: '2. I _____________ a friend while I _____________ the shopping. (meet / do)', answer: 'met / was doing', acceptedAnswers: ['met / was doing', 'met, was doing'], explanation: 'Short completed action: met. Ongoing background: was doing.' },
      { id: 'p3', text: '3. I _____________ in a café when you _____________. (sit / call)', answer: 'was sitting / called', acceptedAnswers: ['was sitting / called', 'was sitting, called'], explanation: 'Background ongoing: was sitting. Interruption: called.' },
      { id: 'p4', text: '4. Ann _____________ for me when I _____________. (wait / arrive)', answer: 'was waiting / arrived', acceptedAnswers: ['was waiting / arrived', 'was waiting, arrived'], explanation: 'Ann\'s waiting was continuous background. My arrival interrupted it.' },
    ]
  },
  {
    id: 'usedto',
    title: 'Part 3 — Used To & Would',
    tag: 'Grammar',
    tagClass: 'tag-blue',
    instructions: 'Fill in the blank with the correct form of "used to" + the verb in parentheses.',
    questions: [
      { id: 'u1', text: '1. She _____________ (live) in Bogotá before moving to Barranquilla.', answer: 'used to live', acceptedAnswers: ['used to live'], explanation: 'State (living somewhere) → only "used to" works.' },
      { id: 'u2', text: '2. My brother _____________ (not / play) video games before he got a console.', answer: "didn't use to play", acceptedAnswers: ["didn't use to play", "used not to play"], explanation: 'Negative of used to: didn\'t use to + base verb.' },
      { id: 'u3', text: '3. We _____________ (visit) our grandparents every Christmas when we were kids.', answer: 'used to visit', acceptedAnswers: ['used to visit', 'would visit'], explanation: 'Repeated action → both "used to visit" and "would visit" are correct!' },
      { id: 'u4', text: '4. Mr. García _____________ (teach) at a different school before coming to CBF.', answer: 'used to teach', acceptedAnswers: ['used to teach'], explanation: 'This implies a state/fact about his past situation → "used to" preferred.' },
    ]
  },
  {
    id: 'reading',
    title: 'Part 4 — Reading Comprehension',
    tag: 'Reading',
    tagClass: 'tag-green',
    instructions: 'Answer the following questions about Jacques Cousteau (write complete answers).',
    questions: [
      {
        id: 'r1',
        text: '1. What is the main purpose of the Jacques Cousteau text?',
        answer: 'To introduce readers to the life and achievements of Jacques-Yves Cousteau.',
        acceptedAnswers: ['introduce', 'life', 'achievements'],
        explanation: 'The text covers his childhood, inventions, WWII service, and films — it\'s a biographical introduction.',
        isOpen: true,
        minWords: 8,
      },
      {
        id: 'r2',
        text: '2. What happened to Cousteau in the car accident?',
        answer: 'He was seriously injured with two broken arms.',
        acceptedAnswers: ['broken arms', 'two arms', 'broken'],
        explanation: 'Text says: "seriously injured with two broken arms."',
        isOpen: true,
        minWords: 5,
      },
      {
        id: 'r3',
        text: '3. Why did Cousteau develop underwater breathing equipment?',
        answer: 'To extend his underwater investigations / to be able to stay underwater for long periods and explore.',
        acceptedAnswers: ['underwater', 'explore', 'investigations', 'recovery', 'strength'],
        explanation: 'He began swimming to recover, rediscovered his ocean passion, and developed the Aqua-Lung.',
        isOpen: true,
        minWords: 8,
      },
    ]
  },
  {
    id: 'biblical',
    title: 'Part 5 — Biblical Worldview',
    tag: 'Biblical Integration',
    tagClass: 'tag-gold',
    instructions: 'Answer thoughtfully and connect your answer to the Bible verse.',
    questions: [
      {
        id: 'b1',
        text: '1. Based on 1 John 2:17, what could you teach a young person about clinging to the world and its desires?',
        answer: 'I would teach them that worldly things like money, popularity, and material possessions are temporary and will pass away. Only doing God\'s will has eternal value. Instead of chasing likes on social media or the latest trends, we should invest in relationships with God and others, in kindness and honesty — things that last forever.',
        acceptedAnswers: ['pass away', 'temporary', 'eternal', 'will of God', 'forever'],
        explanation: 'Key ideas: worldly desires are temporary (pass away); God\'s will leads to eternal life; practical application to student life.',
        isOpen: true,
        minWords: 30,
      },
      {
        id: 'b2',
        text: '2. Does Matthew 5:42 agree with avoiding generosity to accumulate wealth and popularity? Explain.',
        answer: 'No, Matthew 5:42 does NOT agree. Jesus commands us to "give to the one who asks you." This is the opposite of accumulating wealth or avoiding generosity. The world\'s culture tells us to protect what we have and only give when it benefits us, but Jesus calls us to radical, counter-cultural generosity that reflects God\'s own character of giving.',
        acceptedAnswers: ['no', 'generous', 'give', 'disagrees', 'opposite'],
        explanation: 'Must clearly say NO and explain the verse\'s call to generosity as the counter to worldly hoarding.',
        isOpen: true,
        minWords: 30,
      },
    ]
  }
]

// ─── HELPERS ──────────────────────────────────────────────────────────────
function scoreAnswer(answer, question) {
  if (!answer || answer.trim().length < 2) return { score: 0, correct: false }
  const ans = answer.toLowerCase()

  if (question.isOpen) {
    const words = answer.trim().split(/\s+/).length
    if (words < (question.minWords || 5)) return { score: 0, correct: false }
    const keywordsFound = question.acceptedAnswers.filter(kw => ans.includes(kw.toLowerCase())).length
    if (keywordsFound >= 2) return { score: 1, correct: true }
    if (keywordsFound >= 1) return { score: 0.5, correct: 'partial' }
    return { score: 0.25, correct: 'partial' }
  }

  const exact = question.acceptedAnswers.some(a => ans === a.toLowerCase())
  if (exact) return { score: 1, correct: true }
  const partial = question.acceptedAnswers.some(a => ans.includes(a.toLowerCase()) || a.toLowerCase().includes(ans))
  if (partial) return { score: 0.5, correct: 'partial' }
  return { score: 0, correct: false }
}

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || ''

// ─── PDF GENERATOR ────────────────────────────────────────────────────────
function generatePDF(studentName, answers, scores, allQuestions) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' })

  const total = Object.values(scores).reduce((s, v) => s + v, 0)
  const possible = allQuestions.length
  const pct = Math.round((total / possible) * 100)

  // Header
  doc.setFillColor(15, 31, 61)
  doc.rect(0, 0, 216, 40, 'F')
  doc.setTextColor(240, 192, 64)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('CBF — Language Arts 8th Grade', 108, 14, { align: 'center' })
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(13)
  doc.text('Workshop Final — Corrected Report', 108, 24, { align: 'center' })
  doc.setFontSize(10)
  doc.text(`Student: ${studentName || 'Anonymous'} · Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 108, 33, { align: 'center' })

  // Score box
  doc.setFillColor(201, 150, 42)
  doc.roundedRect(15, 48, 186, 28, 4, 4, 'F')
  doc.setTextColor(15, 31, 61)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text(`FINAL SCORE: ${pct}/100`, 108, 61, { align: 'center' })
  const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F'
  doc.setFontSize(11)
  doc.text(`Grade: ${grade} · Points: ${total.toFixed(1)} / ${possible}`, 108, 71, { align: 'center' })

  let y = 86

  // Questions
  allQuestions.forEach((q, i) => {
    if (y > 230) { doc.addPage(); y = 20 }

    const sc = scores[q.id] || 0
    const correct = sc >= 1 ? true : sc > 0 ? 'partial' : false
    const studentAns = answers[q.id] || '(no answer)'

    // Question number + text
    doc.setFillColor(correct === true ? 209 : correct === 'partial' ? 254 : 254, correct === true ? 250 : correct === 'partial' ? 243 : 226, correct === true ? 229 : correct === 'partial' ? 199 : 226)
    doc.roundedRect(15, y, 186, 8, 2, 2, 'F')
    doc.setTextColor(15, 31, 61)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(`Q${i + 1}. ${q.text.substring(0, 90)}${q.text.length > 90 ? '…' : ''}`, 18, y + 5.5)
    doc.setFont('helvetica', 'normal')
    y += 11

    // Student answer
    doc.setTextColor(60, 60, 100)
    doc.setFontSize(8.5)
    const wrappedAns = doc.splitTextToSize(`Your answer: ${studentAns}`, 180)
    doc.text(wrappedAns, 18, y)
    y += wrappedAns.length * 4.5

    // Correct answer
    doc.setTextColor(correct === true ? 6 : correct === 'partial' ? 120 : 150, correct === true ? 95 : correct === 'partial' ? 53 : 0, correct === true ? 70 : correct === 'partial' ? 18 : 0)
    doc.setFont('helvetica', 'bold')
    doc.text(`${correct === true ? '✓ Correct' : correct === 'partial' ? '~ Partial' : '✗ Incorrect'} | Expected: ${q.answer}`, 18, y)
    y += 5

    // Explanation
    doc.setTextColor(80, 80, 80)
    doc.setFont('helvetica', 'italic')
    const wrappedExp = doc.splitTextToSize(`→ ${q.explanation}`, 180)
    doc.text(wrappedExp, 18, y)
    y += wrappedExp.length * 4 + 5

    // Divider
    doc.setDrawColor(220, 216, 210)
    doc.line(15, y, 201, y)
    y += 5
  })

  // Biblical integration note
  if (y > 220) { doc.addPage(); y = 20 }
  doc.setFillColor(15, 31, 61)
  doc.roundedRect(15, y, 186, 32, 4, 4, 'F')
  doc.setTextColor(240, 192, 64)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Biblical Integration Note', 108, y + 8, { align: 'center' })
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  const bibleNote = '"The world and its desires pass away, but whoever does the will of God lives forever." — 1 John 2:17'
  doc.text(doc.splitTextToSize(bibleNote, 170), 108, y + 16, { align: 'center' })

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(7)
    doc.setTextColor(150)
    doc.text(`Colegio Boston Flexible · CBF Language Arts Study App · Page ${i} of ${pageCount}`, 108, 278, { align: 'center' })
  }

  return doc
}

// ─── MAIN WORKSHOP ────────────────────────────────────────────────────────
export default function Workshop() {
  const [studentName, setStudentName] = useState('')
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [scores, setScores] = useState({})
  const [loading, setLoading] = useState(false)
  const [telegramSent, setTelegramSent] = useState(false)
  const [telegramStatus, setTelegramStatus] = useState('')
  const [customBot, setCustomBot] = useState('')
  const [customChat, setCustomChat] = useState('')
  const [showConfig, setShowConfig] = useState(false)
  const [pdfBlob, setPdfBlob] = useState(null)

  const allQuestions = workshopSections.flatMap(s => s.questions)

  const setAnswer = (qid, val) => setAnswers(a => ({ ...a, [qid]: val }))

  const handleSubmit = () => {
    const newScores = {}
    allQuestions.forEach(q => {
      const result = scoreAnswer(answers[q.id], q)
      newScores[q.id] = result.score
    })
    setScores(newScores)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGeneratePDF = () => {
    const doc = generatePDF(studentName, answers, scores, allQuestions)
    const blob = doc.output('blob')
    setPdfBlob(blob)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Workshop_${studentName.replace(/\s+/g, '_') || 'Student'}_Corrected.pdf`
    a.click()
  }

  const sendToTelegram = async () => {
    const token = customBot || TELEGRAM_BOT_TOKEN
    const chatId = customChat || TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      setTelegramStatus('❌ Please configure your Telegram Bot Token and Chat ID below.')
      setShowConfig(true)
      return
    }

    setLoading(true)
    setTelegramStatus('')

    try {
      const doc = generatePDF(studentName, answers, scores, allQuestions)
      const pdfArrayBuffer = doc.output('arraybuffer')
      const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' })

      const formData = new FormData()
      formData.append('chat_id', chatId)
      formData.append('document', pdfBlob, `Workshop_${studentName || 'Student'}_Corrected.pdf`)
      formData.append('caption', `📋 CBF Workshop Results\n👤 Student: ${studentName || 'Anonymous'}\n📊 Score: ${Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / allQuestions.length) * 100)}/100\n📅 Date: ${new Date().toLocaleDateString()}`)

      const res = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (data.ok) {
        setTelegramSent(true)
        setTelegramStatus('✅ PDF sent successfully to Telegram!')
      } else {
        setTelegramStatus(`❌ Error: ${data.description || 'Failed to send. Check your Bot Token and Chat ID.'}`)
      }
    } catch (e) {
      setTelegramStatus(`❌ Network error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const totalPossible = allQuestions.length
  const pct = Math.round((totalScore / totalPossible) * 100)
  const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F'

  const sectionAnswered = (section) => section.questions.every(q => answers[q.id]?.trim())
  const totalAnswered = allQuestions.filter(q => answers[q.id]?.trim()).length

  if (submitted) {
    return (
      <div className="section">
        <div className="section-header">
          <h2>🎉 Workshop Complete!</h2>
          <p>Your answers have been evaluated. Download your corrected PDF below.</p>
        </div>

        <div className="score-display">
          <div className="score-number">{pct}</div>
          <div className="score-label">out of 100 points · Grade: {grade}</div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Grammar ✓', 'Past Tenses ✓', 'Used To ✓', 'Reading ✓', 'Biblical ✓'].map(t => (
              <span key={t} className="tag tag-gold" style={{ background: 'rgba(240,192,64,0.2)', color: '#f0c040' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Student Name */}
        <div className="card">
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Student Name (for PDF)</label>
            <input className="form-input" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Enter your full name…" />
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={handleGeneratePDF}>
              📄 Download Corrected PDF
            </button>
            <button className="btn btn-primary" onClick={sendToTelegram} disabled={loading}>
              {loading ? <><span className="loading-spinner" /> Sending…</> : '📱 Send to Telegram'}
            </button>
          </div>
          {telegramStatus && (
            <div className={`feedback ${telegramStatus.startsWith('✅') ? 'correct' : 'wrong'}`} style={{ marginTop: '0.75rem' }}>
              {telegramStatus}
            </div>
          )}
        </div>

        {/* Telegram Config */}
        <div className="card" style={{ background: 'var(--gray-100)' }}>
          <button className="accordion-btn" style={{ padding: 0 }} onClick={() => setShowConfig(c => !c)}>
            <span>⚙️ Telegram Configuration</span>
            <span>{showConfig ? '▲' : '▼'}</span>
          </button>
          {showConfig && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: '0.75rem' }}>
                To send PDFs to Telegram, you need a Bot Token and your Chat ID. <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>Create a bot at @BotFather</a>. To get your Chat ID, message <a href="https://t.me/userinfobot" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>@userinfobot</a>. Or set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in your .env file.
              </p>
              <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
                <input className="form-input" value={customBot} onChange={e => setCustomBot(e.target.value)} placeholder="Bot Token (e.g. 1234567890:ABCdef…)" />
                <input className="form-input" value={customChat} onChange={e => setCustomChat(e.target.value)} placeholder="Chat ID (e.g. -1001234567890)" />
              </div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }} onClick={sendToTelegram} disabled={loading}>
                {loading ? 'Sending…' : '📱 Send with these credentials'}
              </button>
            </div>
          )}
        </div>

        {/* Detailed Review */}
        <div className="section-header" style={{ marginTop: '2rem' }}>
          <h2>📋 Detailed Review</h2>
        </div>

        {workshopSections.map(section => (
          <div className="card" key={section.id} style={{ marginBottom: '1.5rem' }}>
            <div className="card-header">
              <div className="card-icon">📝</div>
              <div>
                <div className="card-title">{section.title}</div>
                <div className="card-subtitle">
                  {section.questions.filter(q => (scores[q.id] || 0) >= 1).length} / {section.questions.length} correct
                </div>
              </div>
            </div>
            {section.questions.map((q, i) => {
              const sc = scores[q.id] || 0
              const correct = sc >= 1 ? true : sc > 0 ? 'partial' : false
              return (
                <div key={q.id} style={{
                  padding: '1rem', borderRadius: 10, marginBottom: 10,
                  background: correct === true ? '#d1fae5' : correct === 'partial' ? '#fef3c7' : '#fee2e2',
                  border: `1px solid ${correct === true ? '#6ee7b7' : correct === 'partial' ? '#fcd34d' : '#fca5a5'}`
                }}>
                  <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.9rem' }}>{q.text}</div>
                  <div style={{ fontSize: '0.85rem', color: '#5a5650', marginBottom: 4 }}>
                    <strong>Your answer:</strong> {answers[q.id] || '(no answer)'}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>
                    {correct === true ? '✅ Correct' : correct === 'partial' ? '⚡ Partial credit' : '❌ Incorrect'} — Expected: <em>{q.answer}</em>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#5a5650', fontStyle: 'italic' }}>
                    💡 {q.explanation}
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        <button className="btn btn-outline" onClick={() => { setSubmitted(false); setAnswers({}); setScores({}); setCurrentSection(0) }}>
          ↩ Start Over
        </button>
      </div>
    )
  }

  const section = workshopSections[currentSection]
  const progress = (currentSection / workshopSections.length) * 100

  return (
    <div className="section">
      <div className="section-header">
        <h2>🏆 Final Workshop</h2>
        <p>Complete all sections to generate your corrected PDF report. Take your time — this is your final assessment.</p>
      </div>

      {/* Student Name */}
      <div className="card" style={{ background: 'var(--gray-100)', marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>👤 Your Name</label>
        <input className="form-input" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Enter your full name…" style={{ marginBottom: 0 }} />
      </div>

      {/* Step Indicator */}
      <div className="step-indicator">
        {workshopSections.map((s, i) => (
          <>
            <div
              key={s.id}
              className={`step-dot ${i === currentSection ? 'active' : sectionAnswered(s) ? 'done' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setCurrentSection(i)}
              title={s.title}
            >
              {sectionAnswered(s) ? '✓' : i + 1}
            </div>
            {i < workshopSections.length - 1 && (
              <div key={`line-${i}`} className={`step-line ${sectionAnswered(s) ? 'done' : ''}`} />
            )}
          </>
        ))}
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(totalAnswered / allQuestions.length) * 100}%` }} />
      </div>
      <p style={{ fontSize: '0.82rem', color: 'var(--gray-400)', marginBottom: '1.5rem', textAlign: 'right' }}>
        {totalAnswered} / {allQuestions.length} questions answered
      </p>

      {/* Current Section */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">📝</div>
          <div>
            <div className="card-title">{section.title}</div>
            <div className="card-subtitle">{section.instructions}</div>
          </div>
        </div>
        <span className={`tag ${section.tagClass}`} style={{ marginBottom: '1rem', display: 'inline-block' }}>
          {section.tag}
        </span>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
          {section.instructions}
        </p>

        {section.questions.map((q, i) => (
          <div key={q.id} style={{ marginBottom: '1.5rem' }}>
            <div className="question-number">Question {i + 1}</div>
            <div className="question-text">{q.text}</div>
            {q.isOpen ? (
              <textarea
                className="workshop-textarea"
                value={answers[q.id] || ''}
                onChange={e => setAnswer(q.id, e.target.value)}
                placeholder="Write your complete answer here… (at least a few sentences for open questions)"
                rows={4}
              />
            ) : (
              <input
                className="fill-input"
                value={answers[q.id] || ''}
                onChange={e => setAnswer(q.id, e.target.value)}
                placeholder="Your answer…"
              />
            )}
          </div>
        ))}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setCurrentSection(s => Math.max(0, s - 1))}
            disabled={currentSection === 0}
          >
            ← Previous
          </button>
          {currentSection < workshopSections.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={() => setCurrentSection(s => s + 1)}
            >
              Next Section →
            </button>
          ) : (
            <button
              className="btn btn-gold"
              onClick={handleSubmit}
              disabled={totalAnswered < allQuestions.length * 0.5}
            >
              🏁 Submit Workshop
            </button>
          )}
        </div>
        {currentSection === workshopSections.length - 1 && totalAnswered < allQuestions.length * 0.5 && (
          <p style={{ fontSize: '0.82rem', color: 'var(--error)', marginTop: '0.5rem' }}>
            Please answer at least half of all questions before submitting.
          </p>
        )}
      </div>

      {/* Quick navigation */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: '1rem' }}>
        {workshopSections.map((s, i) => (
          <button
            key={s.id}
            className={`btn btn-sm ${i === currentSection ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCurrentSection(i)}
            style={{ fontSize: '0.75rem' }}
          >
            {sectionAnswered(s) ? '✓ ' : ''}{i + 1}. {s.tag}
          </button>
        ))}
      </div>
    </div>
  )
}
