import { useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import judahImg from './assets/judah-lion.png'
import logoImg from './assets/logo-boston-flex.png'

// ─── WORKSHOP QUESTIONS ───────────────────────────────────────────────────
const workshopSections = [
  {
    id: 'grammar1',
    title: 'Part 1 — Grammar: Present Tenses',
    tag: 'Grammar',
    tagClass: 'tag-blue',
    instructions: 'Complete each sentence with the correct form of the verb in brackets (Present Simple or Present Continuous).',
    questions: [
      { id: 'g1', text: '1. My dad _____________ (work) from home every day.', answer: 'works', acceptedAnswers: ['works'], explanation: 'Daily routine → Present Simple. He/My dad takes the -s ending: works.' },
      { id: 'g2', text: '2. Listen! Someone _____________ at the door. (knock)', answer: 'is knocking', acceptedAnswers: ['is knocking'], explanation: '"Listen!" signals something happening RIGHT NOW → Present Continuous: is knocking.' },
      { id: 'g3', text: '3. Lucas _____________ coffee. He prefers tea. (not/drink)', answer: "doesn't drink", acceptedAnswers: ["doesn't drink", "does not drink"], explanation: 'General fact/preference → Present Simple. He + doesn\'t + base verb.' },
      { id: 'g4', text: '4. _____ you _____ your homework right now? (do)', answer: 'Are / doing', acceptedAnswers: ['are / doing', 'are doing', 'are you doing'], explanation: '"Right now" → Present Continuous question: Are + you + verb-ing?' },
      { id: 'g5', text: '5. The library _____________ at nine o\'clock every morning. (open)', answer: 'opens', acceptedAnswers: ['opens'], explanation: 'Scheduled/regular fact → Present Simple. It + opens (third person -s).' },
      { id: 'g6', text: '6. Sorry, I can\'t talk. I _____________ lunch right now. (have)', answer: 'am having', acceptedAnswers: ['am having'], explanation: '"Right now" + "have" meaning to eat → Present Continuous. I + am having.' },
    ]
  },
  {
    id: 'grammar2',
    title: 'Part 2 — Grammar: Past Tenses',
    tag: 'Grammar',
    tagClass: 'tag-blue',
    instructions: 'Complete with Past Simple or Past Continuous of the verb in brackets.',
    questions: [
      { id: 'p1', text: '1. The storm _____________ all night and flooded three streets. (last)', answer: 'lasted', acceptedAnswers: ['lasted'], explanation: '"Lasted" is regular: last → lasted. Completed past fact → Past Simple.' },
      { id: 'p2', text: '2. Sofia _____________ her homework when her phone _____________. (do / ring)', answer: 'was doing / rang', acceptedAnswers: ['was doing / rang', 'was doing, rang'], explanation: 'Ongoing background: was doing. Short interruption: rang (irregular: ring → rang).' },
      { id: 'p3', text: '3. We _____________ home when we _____________ a shooting star. (walk / see)', answer: 'were walking / saw', acceptedAnswers: ['were walking / saw', 'were walking, saw'], explanation: 'Background ongoing: were walking. Sudden completed action: saw (irregular: see → saw).' },
      { id: 'p4', text: '4. The teacher _____________ the rule when the bell _____________. (explain / ring)', answer: 'was explaining / rang', acceptedAnswers: ['was explaining / rang', 'was explaining, rang'], explanation: 'The explanation was ongoing background. The bell ringing was the interruption.' },
    ]
  },
  {
    id: 'usedto',
    title: 'Part 3 — Used To & Would',
    tag: 'Grammar',
    tagClass: 'tag-blue',
    instructions: 'Fill in the blank with the correct form of "used to" + the verb in parentheses.',
    questions: [
      { id: 'u1', text: '1. Carlos _____________ (be) very shy, but now he loves public speaking.', answer: 'used to be', acceptedAnswers: ['used to be'], explanation: 'Being shy is a PAST STATE → only "used to be" is correct. "Would be" does not work for states.' },
      { id: 'u2', text: '2. My parents _____________ (not / have) a car when they were young.', answer: "didn't use to have", acceptedAnswers: ["didn't use to have", "used not to have"], explanation: 'Negative of used to: didn\'t use to + base verb. "Having" a car is a state → not "would."' },
      { id: 'u3', text: '3. We _____________ (go) to the cinema every Friday night when I was a child.', answer: 'used to go', acceptedAnswers: ['used to go', 'would go'], explanation: 'Repeated Friday-night action (habit) → both "used to go" and "would go" are correct!' },
      { id: 'u4', text: '4. The old building on the corner _____________ (be) a railway station a hundred years ago.', answer: 'used to be', acceptedAnswers: ['used to be'], explanation: 'Being a railway station is a past STATE → only "used to be." "Would be" cannot describe states.' },
    ]
  },
  {
    id: 'reading',
    title: 'Part 4 — Reading Comprehension',
    tag: 'Reading',
    tagClass: 'tag-green',
    instructions: 'Read the passage about Marie Curie carefully, then answer the questions in complete sentences.',
    passage: `Marie Curie was born Maria Sklodowska in Warsaw, Poland, in 1867. As a young girl, she showed an extraordinary passion for learning, even though girls in Poland were not allowed to attend university at the time. Determined to continue her studies, Marie moved to Paris at the age of 24, where she enrolled at the Sorbonne University. She lived in a tiny, cold apartment and sometimes went without food to pay for her books, but nothing could stop her from pursuing her dream.\n\nIn Paris, Marie met her future husband, Pierre Curie, a respected physicist. Together, they worked tirelessly in their laboratory, often under difficult and dangerous conditions. Marie was fascinated by a mysterious property of certain minerals — the ability to emit energy without any external source. She called this property "radioactivity," a word she herself invented.\n\nIn 1898, Marie and Pierre discovered two new chemical elements: polonium, which she named after her beloved homeland Poland, and radium. Their discoveries changed the world of science forever. In 1903, Marie became the first woman to win the Nobel Prize in Physics. After Pierre's tragic death in 1906, she continued her research with remarkable determination. In 1911, she won a second Nobel Prize, this time in Chemistry, becoming the only person in history to win Nobel Prizes in two different sciences.\n\nDuring World War I, Marie developed mobile X-ray units — vehicles equipped with X-ray machines — to help treat wounded soldiers on the front lines. These units saved thousands of lives. Despite all her extraordinary contributions, Marie faced discrimination throughout her career because she was a woman and a foreigner. She died in 1934 from a blood disease caused by years of exposure to radiation. Today, she is remembered as one of the greatest scientists in history and a symbol of courage, determination, and intellectual brilliance.`,
    questions: [
      {
        id: 'r1',
        text: '1. What obstacles did Marie Curie have to overcome in order to pursue her education?',
        answer: 'Girls were not allowed to attend university in Poland, so she moved to Paris. She also lived in poverty and sometimes went without food to pay for her books.',
        acceptedAnswers: ['university', 'poland', 'paris', 'poverty', 'food', 'woman', 'not allowed'],
        explanation: 'Two key obstacles: (1) women were banned from university in Poland; (2) extreme poverty in Paris — she went without food to buy books.',
        isOpen: true,
        minWords: 10,
      },
      {
        id: 'r2',
        text: '2. What did Marie Curie mean by the word "radioactivity," and why was this discovery important?',
        answer: 'Radioactivity is the ability of certain minerals to emit energy without any external source. It was important because it changed the world of science forever.',
        acceptedAnswers: ['emit', 'energy', 'minerals', 'radioactiv', 'changed', 'science', 'important'],
        explanation: 'Radioactivity = ability of minerals to emit energy on their own. Revolutionary discovery that redefined how scientists understood matter and energy.',
        isOpen: true,
        minWords: 12,
      },
      {
        id: 'r3',
        text: '3. How did Marie Curie show courage and determination throughout her life? Give at least two examples from the text.',
        answer: 'She moved alone to Paris and lived in poverty to study. She continued research after her husband\'s death and won a second Nobel Prize. She also developed mobile X-ray units during WWI to save soldiers\' lives despite personal danger.',
        acceptedAnswers: ['paris', 'continued', 'research', 'husband', 'x-ray', 'world war', 'discrimination', 'determination', 'poor', 'nobel'],
        explanation: 'Key examples: (1) Moved to Paris alone, lived in poverty; (2) Continued research after Pierre died; (3) Built mobile X-ray units during WWI despite personal risk.',
        isOpen: true,
        minWords: 20,
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
        text: '1. Think about 1 John 2:17: "The world and its desires pass away, but whoever does the will of God lives forever." Describe a real situation where young people today chase things that "pass away." What would a life guided by God\'s will look like instead?',
        answer: 'Young people today chase things like social media followers, brand-name clothes, or popularity — all of which are temporary and will pass away. A life guided by God\'s will would focus on things that last: kindness, honesty, helping others, and a genuine relationship with God. These things have eternal value because they do not fade away like trends or fame.',
        acceptedAnswers: ['pass away', 'temporary', 'god', 'eternal', 'forever', 'lasting', 'social media', 'trend'],
        explanation: 'Key elements: name a specific worldly thing that passes away → contrast with something God-centered that lasts → connect to the verse\'s promise of eternal life.',
        isOpen: true,
        minWords: 30,
      },
      {
        id: 'b2',
        text: '2. Matthew 5:42 says: "Give to the one who asks you." As a student, describe one specific and concrete way you could live this verse out this week at school or at home. Why do most people find it hard to be truly generous?',
        answer: 'One specific way I could live this verse is by sharing my lunch with a classmate who forgot theirs, or helping a friend study even when I am tired. Most people find it hard to be truly generous because we are naturally focused on our own needs and comfort. We fear that giving will leave us with less. But Jesus calls us to trust God and give freely, just as He gave us His son.',
        acceptedAnswers: ['give', 'generous', 'share', 'help', 'specific', 'hard', 'difficult', 'comfort', 'trust'],
        explanation: 'Must include: (1) a specific concrete action at school or home; (2) an explanation of why generosity is challenging for people.',
        isOpen: true,
        minWords: 30,
      },
    ]
  }
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────
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

// ─── PDF GENERATOR ────────────────────────────────────────────────────────────
function generatePDF(studentName, studentEmail, answers, scores, allQuestions) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' })

  const total = Object.values(scores).reduce((s, v) => s + v, 0)
  const possible = allQuestions.length
  const pct = Math.round((total / possible) * 100)

  // Header
  doc.setFillColor(15, 31, 61)
  doc.rect(0, 0, 216, 44, 'F')
  doc.setTextColor(240, 192, 64)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('CBF — Language Arts 8th Grade', 108, 13, { align: 'center' })
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(13)
  doc.text('Workshop Final — Corrected Report', 108, 22, { align: 'center' })
  doc.setFontSize(9.5)
  doc.text(`Student: ${studentName}`, 108, 30, { align: 'center' })
  doc.setFontSize(8.5)
  doc.text(`${studentEmail} · ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 108, 37, { align: 'center' })

  // Score box
  doc.setFillColor(201, 150, 42)
  doc.roundedRect(15, 52, 186, 28, 4, 4, 'F')
  doc.setTextColor(15, 31, 61)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text(`FINAL SCORE: ${pct}/100`, 108, 65, { align: 'center' })
  const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F'
  doc.setFontSize(11)
  doc.text(`Grade: ${grade} · Points: ${total.toFixed(1)} / ${possible}`, 108, 74, { align: 'center' })

  let y = 90

  allQuestions.forEach((q, i) => {
    if (y > 230) { doc.addPage(); y = 20 }

    const sc = scores[q.id] || 0
    const correct = sc >= 1 ? true : sc > 0 ? 'partial' : false
    const studentAns = answers[q.id] || '(no answer)'

    doc.setFillColor(
      correct === true ? 209 : correct === 'partial' ? 254 : 254,
      correct === true ? 250 : correct === 'partial' ? 243 : 226,
      correct === true ? 229 : correct === 'partial' ? 199 : 226
    )
    doc.roundedRect(15, y, 186, 8, 2, 2, 'F')
    doc.setTextColor(15, 31, 61)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(`Q${i + 1}. ${q.text.substring(0, 90)}${q.text.length > 90 ? '…' : ''}`, 18, y + 5.5)
    doc.setFont('helvetica', 'normal')
    y += 11

    doc.setTextColor(60, 60, 100)
    doc.setFontSize(8.5)
    const wrappedAns = doc.splitTextToSize(`Your answer: ${studentAns}`, 180)
    doc.text(wrappedAns, 18, y)
    y += wrappedAns.length * 4.5

    doc.setTextColor(
      correct === true ? 6 : correct === 'partial' ? 120 : 150,
      correct === true ? 95 : correct === 'partial' ? 53 : 0,
      correct === true ? 70 : correct === 'partial' ? 18 : 0
    )
    doc.setFont('helvetica', 'bold')
    doc.text(`${correct === true ? '✓ Correct' : correct === 'partial' ? '~ Partial' : '✗ Incorrect'} | Expected: ${q.answer}`, 18, y)
    y += 5

    doc.setTextColor(80, 80, 80)
    doc.setFont('helvetica', 'italic')
    const wrappedExp = doc.splitTextToSize(`→ ${q.explanation}`, 180)
    doc.text(wrappedExp, 18, y)
    y += wrappedExp.length * 4 + 5

    doc.setDrawColor(220, 216, 210)
    doc.line(15, y, 201, y)
    y += 5
  })

  // Biblical note
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
  doc.text(doc.splitTextToSize('"The world and its desires pass away, but whoever does the will of God lives forever." — 1 John 2:17', 170), 108, y + 16, { align: 'center' })

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

// ─── MAIN WORKSHOP ────────────────────────────────────────────────────────────
export default function Workshop({ studentName, studentEmail }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [scores, setScores] = useState({})
  const [sendStatus, setSendStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'

  const allQuestions = workshopSections.flatMap(s => s.questions)
  const setAnswer = (qid, val) => setAnswers(a => ({ ...a, [qid]: val }))

  // Send PDF to teacher
  const sendToTeacher = async (scoresToUse) => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      setSendStatus('error')
      return
    }
    setSendStatus('sending')
    try {
      const doc = generatePDF(studentName, studentEmail, answers, scoresToUse, allQuestions)
      const pdfArrayBuffer = doc.output('arraybuffer')
      const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' })

      const total = Object.values(scoresToUse).reduce((a, b) => a + b, 0)
      const pct = Math.round((total / allQuestions.length) * 100)
      const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F'

      const formData = new FormData()
      formData.append('chat_id', TELEGRAM_CHAT_ID)
      formData.append('document', pdfBlob, `Workshop_${studentName.replace(/\s+/g, '_')}_Corrected.pdf`)
      formData.append('caption',
        `📋 Workshop Completed\n👤 ${studentName}\n📧 ${studentEmail}\n📊 Score: ${pct}/100 (${grade})\n📅 ${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}`
      )

      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setSendStatus(data.ok ? 'sent' : 'error')
    } catch (_) {
      setSendStatus('error')
    }
  }

  const handleSubmit = async () => {
    const newScores = {}
    allQuestions.forEach(q => {
      newScores[q.id] = scoreAnswer(answers[q.id], q).score
    })
    setScores(newScores)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    await sendToTeacher(newScores)
  }

  const handleDownload = () => {
    const doc = generatePDF(studentName, studentEmail, answers, scores, allQuestions)
    const url = URL.createObjectURL(doc.output('blob'))
    const a = document.createElement('a')
    a.href = url
    a.download = `Workshop_${studentName.replace(/\s+/g, '_')}_Corrected.pdf`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 10000)
  }

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const totalPossible = allQuestions.length
  const pct = Math.round((totalScore / totalPossible) * 100)
  const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F'

  const sectionAnswered = (section) => section.questions.every(q => answers[q.id]?.trim())
  const totalAnswered = allQuestions.filter(q => answers[q.id]?.trim()).length

  // ── RESULTS SCREEN ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="section">
        <div className="section-header">
          <h2>Workshop Complete!</h2>
          <p>Great job, <strong>{studentName.split(' ')[0]}</strong>! Here are your results.</p>
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

        {/* Send status + Download */}
        <div className="card">
          {sendStatus === 'sending' && (
            <div className="feedback" style={{ background: '#eff6ff', borderColor: '#bfdbfe', marginBottom: '1rem' }}>
              <span className="loading-spinner" style={{ marginRight: 8 }} />
              Sending your results to the teacher…
            </div>
          )}
          {sendStatus === 'sent' && (
            <div className="feedback correct" style={{ marginBottom: '1rem' }}>
              Your corrected PDF has been sent to the teacher successfully!
            </div>
          )}
          {sendStatus === 'error' && (
            <div className="feedback wrong" style={{ marginBottom: '1rem' }}>
              Could not send to teacher automatically. Please ask your teacher for help or use the resend button.
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={handleDownload}>
              📄 Download My Copy
            </button>
            {sendStatus === 'error' && (
              <button className="btn btn-primary" onClick={() => sendToTeacher(scores)}>
                📱 Resend to Teacher
              </button>
            )}
          </div>
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
            {section.questions.map(q => {
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

        <button className="btn btn-outline" onClick={() => { setSubmitted(false); setAnswers({}); setScores({}); setCurrentSection(0); setSendStatus('idle') }}>
          ↩ Start Over
        </button>
      </div>
    )
  }

  // ── WORKSHOP FORM ────────────────────────────────────────────────────────────
  const section = workshopSections[currentSection]

  return (
    <div className="section">
      <div className="section-header" style={{ position: 'relative' }}>
        <img src={judahImg} alt="" aria-hidden="true" style={{
          position: 'absolute', right: 0, bottom: 0,
          height: 90, opacity: 0.82,
          pointerEvents: 'none', userSelect: 'none',
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))',
        }} />
        <img src={logoImg} alt="" aria-hidden="true" style={{
          display: 'block', margin: '0 auto 0.75rem',
          height: 56, opacity: 0.9,
        }} />
        <h2>🏆 Final Workshop</h2>
        <p>Hi <strong>{studentName.split(' ')[0]}</strong>! Complete all sections — your corrected PDF will be sent to the teacher automatically.</p>
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

        {/* Reading passage */}
        {section.passage && (
          <div style={{
            background: '#f8f7f4', border: '1px solid #e5e0d8',
            borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem',
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gray-400)', marginBottom: '0.75rem' }}>
              Reading Passage
            </div>
            {section.passage.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '0.75rem', color: '#3a3530' }}>{para}</p>
            ))}
          </div>
        )}

        {section.questions.map((q, i) => (
          <div key={q.id} style={{ marginBottom: '1.5rem' }}>
            <div className="question-number">Question {i + 1}</div>
            <div className="question-text">{q.text}</div>
            {q.isOpen ? (
              <textarea
                className="workshop-textarea"
                value={answers[q.id] || ''}
                onChange={e => setAnswer(q.id, e.target.value)}
                placeholder="Write your complete answer here…"
                rows={4}
                style={{ fontSize: '16px' }}
              />
            ) : (
              <input
                className="fill-input"
                value={answers[q.id] || ''}
                onChange={e => setAnswer(q.id, e.target.value)}
                placeholder="Your answer…"
                style={{ fontSize: '16px' }}
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
