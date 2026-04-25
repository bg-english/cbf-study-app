import { useState } from 'react'
import './index.css'
import Theory from './Theory'
import Practice from './Practice'
import Workshop from './Workshop'
import logoImg from './assets/logo-boston-flex.png'
import judahImg from './assets/judah-lion.png'

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || ''

// ─── ALLOWED EMAILS ───────────────────────────────────────────────────────────
const ALLOWED_EMAILS = new Set([
  // Teacher
  'edoardo.ortiz77@gmail.com',
  // 8th Blue
  'fiorellaaronna@redboston.edu.co',
  'mathiasbello@redboston.edu.co',
  'danette@redboston.edu.co',
  'juan.s.calvo@redboston.edu.co',
  'diegocastilla@redboston.edu.co',
  'sebastiancas@redboston.edu.co',
  'gabrieladiaz@redboston.edu.co',
  'lionelfloriano@redboston.edu.co',
  'valerielizarazo@redboston.edu.co',
  'sofiamaradey@redboston.edu.co',
  'samuel@redboston.edu.co',
  'miguelpanciera@redboston.edu.co',
  'lucianapedraza@redboston.edu.co',
  'sarahperez@redboston.edu.co',
  'samuelporto@redboston.edu.co',
  'jose@redboston.edu.co',
  'valentinareyes@redboston.edu.co',
  'nadiarodriguez@redboston.edu.co',
  'kendallrojano@redboston.edu.co',
  'samuelsabalza@redboston.edu.co',
  'eesierra@redboston.edu.co',
  // 8th Red
  'alejandraalvarez@redboston.edu.co',
  'sofiaarevalomin@redboston.edu.co',
  'victorias@redboston.edu.co',
  'josecastellon@redboston.edu.co',
  'andreschima@redboston.edu.co',
  'cristinacontreras@redboston.edu.co',
  'susancrespo@redboston.edu.co',
  'viviangil@redboston.edu.co',
  'andresgonzalez@redboston.edu.co',
  'nicolemanosalva@redboston.edu.co',
  'valentinomartinez@redboston.edu.co',
  'sarameza@redboston.edu.co',
  'juanseortiz@redboston.edu.co',
  'mateopachon@redboston.edu.co',
  'marianapareja@redboston.edu.co',
  'moisespomarico@redboston.edu.co',
  'santiagoporto@redboston.edu.co',
  'isabelpua@redboston.edu.co',
  'maryannrenteria@redboston.edu.co',
  'juanesromero@redboston.edu.co',
  'dannasarmiento@redboston.edu.co',
])

const tabs = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'theory', label: 'Theory', icon: '📚' },
  { id: 'practice', label: 'Practice', icon: '🎮' },
  { id: 'workshop', label: 'Workshop', icon: '🏆' },
]

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const trimName = name.trim()
    const trimEmail = email.trim().toLowerCase()

    if (!trimName) { setError('Please enter your full name.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimEmail)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!ALLOWED_EMAILS.has(trimEmail)) {
      setError('This email is not registered for this app. Check with your teacher.')
      return
    }

    setLoading(true)
    setError('')

    try {
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        const dateStr = new Date().toLocaleString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long',
          day: 'numeric', hour: '2-digit', minute: '2-digit',
        })
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: `📚 Student Access — CBF Language Arts\n👤 Name: ${trimName}\n📧 Email: ${trimEmail}\n📅 ${dateStr}`,
          }),
        })
      }
    } catch (_) {
      // Don't block login if Telegram fails
    }

    setLoading(false)
    onLogin(trimName, trimEmail)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--navy) 0%, #0040b0 50%, var(--cbf-red) 100%)',
      padding: '1.25rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Judah decoration — login background */}
      <img src={judahImg} alt="" aria-hidden="true" style={{
        position: 'absolute', bottom: 0, right: 0,
        height: 'clamp(180px, 35vw, 320px)',
        opacity: 0.18,
        pointerEvents: 'none',
        userSelect: 'none',
      }} />
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1.75rem, 6vw, 3rem)',
        width: '100%',
        maxWidth: 460,
        boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src={logoImg} alt="Colegio Boston Flexible" style={{
            width: 'clamp(72px, 18vw, 96px)',
            height: 'auto',
            marginBottom: '0.85rem',
            filter: 'drop-shadow(0 4px 12px rgba(0,48,135,0.2))',
          }} />
          <h1 style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            color: 'var(--navy)',
            margin: '0 0 0.4rem',
            lineHeight: 1.2,
          }}>
            CBF Language Arts
          </h1>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0 }}>
            8th Grade Study App — Enter your details to begin
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{
              display: 'block', fontWeight: 600, fontSize: '0.88rem',
              marginBottom: '0.4rem', color: 'var(--navy)',
            }}>
              Full Name
            </label>
            <input
              className="form-input"
              type="text"
              autoComplete="name"
              placeholder="e.g. María Martínez"
              value={name}
              onChange={e => { setName(e.target.value); setError('') }}
              style={{ fontSize: '16px' }}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block', fontWeight: 600, fontSize: '0.88rem',
              marginBottom: '0.4rem', color: 'var(--navy)',
            }}>
              School Email
            </label>
            <input
              className="form-input"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="e.g. student@cbf.edu.co"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              style={{ fontSize: '16px' }}
              required
            />
          </div>

          {error && (
            <div className="feedback wrong" style={{ margin: 0 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ padding: '0.9rem', fontSize: '1rem', marginTop: '0.25rem' }}
          >
            {loading
              ? <><span className="loading-spinner" style={{ marginRight: 8 }} />Connecting…</>
              : 'Enter the App →'}
          </button>
        </form>

        <p style={{
          textAlign: 'center', marginTop: '1.75rem',
          fontSize: '0.75rem', color: 'var(--gray-400)',
        }}>
          Colegio Boston Flexible · First Trimester
        </p>
      </div>
    </div>
  )
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({ setTab, userName }) {
  return (
    <>
      <div className="hero" style={{ position: 'relative' }}>
        {/* Judah mascot — left side decoration */}
        <img src={judahImg} alt="" aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: 'clamp(0px, 2vw, 24px)',
          height: 'clamp(120px, 22vw, 200px)',
          opacity: 0.92,
          pointerEvents: 'none',
          userSelect: 'none',
          filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))',
        }} />
        {/* Logo — right side decoration */}
        <img src={logoImg} alt="" aria-hidden="true" style={{
          position: 'absolute', top: 16, right: 'clamp(8px, 2vw, 24px)',
          height: 'clamp(48px, 8vw, 72px)',
          opacity: 0.85,
          pointerEvents: 'none',
          userSelect: 'none',
        }} />
        <div className="hero-badge">📖 CBF · Language Arts 8th Grade · First Trimester</div>
        <h1>Welcome, <span>{userName.split(' ')[0]}</span>!</h1>
        <p>Everything you need to ace your final exam. Theory, practice activities, and a graded workshop — all in one place.</p>
        <div className="hero-verse">
          "The world and its desires pass away, but whoever does the will of God lives forever." — 1 John 2:17
        </div>
      </div>

      <div className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
          {[
            { icon: '📚', title: 'Theory', desc: 'Detailed explanations of all grammar topics, vocabulary, reading skills, and biblical integration.', color: '#dbeafe', btn: 'Study Theory', tab: 'theory' },
            { icon: '🎮', title: 'Practice Zone', desc: 'Multiple choice, fill-in-the-blank, flashcards, and matching games with instant feedback.', color: '#d1fae5', btn: 'Start Practicing', tab: 'practice' },
            { icon: '🏆', title: 'Final Workshop', desc: 'Complete the full workshop — your corrected results go straight to the teacher and you get a PDF copy.', color: '#fef3c7', btn: 'Begin Workshop', tab: 'workshop' },
          ].map(card => (
            <div key={card.tab} className="card" style={{ border: 'none', background: card.color }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{card.icon}</div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{card.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--gray-600)', marginBottom: '1.25rem', lineHeight: 1.6 }}>{card.desc}</p>
              <button className="btn btn-primary btn-sm" onClick={() => setTab(card.tab)}>{card.btn} →</button>
            </div>
          ))}
        </div>

        {/* Topics Covered */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">🗂️</div>
            <div>
              <div className="card-title">Topics Covered</div>
              <div className="card-subtitle">Everything from your final exam</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: '💬', text: 'Vocabulary in Context', sub: 'Charming, encourage, phrasal verbs' },
              { icon: '🔵', text: 'Present Tenses', sub: 'Simple vs. Continuous' },
              { icon: '🔴', text: 'Past Tenses', sub: 'Simple vs. Continuous' },
              { icon: '🔁', text: 'Used To & Would', sub: 'Past habits and states' },
              { icon: '📖', text: 'Reading Comprehension', sub: 'Marie Curie — original text' },
              { icon: '✍️', text: 'Writing Skills', sub: 'Past tense narratives' },
              { icon: '✝️', text: '1 John 2:17', sub: 'Worldly desires vs. God\'s will' },
              { icon: '✝️', text: 'Matthew 5:42', sub: 'Generosity & biblical living' },
            ].map(t => (
              <div key={t.text} style={{ padding: '0.75rem', background: 'var(--gray-100)', borderRadius: 10 }}>
                <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{t.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.text}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gray-400)' }}>{t.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div style={{ background: 'linear-gradient(135deg, var(--navy), var(--cbf-red))', borderRadius: 'var(--radius-lg)', padding: '1.5rem 1.5rem 1.5rem 180px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden', minHeight: 140 }}>
          <img src={judahImg} alt="" aria-hidden="true" style={{
            position: 'absolute', bottom: 0, left: 0,
            height: '140px',
            pointerEvents: 'none',
            userSelect: 'none',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))',
          }} />
          <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>💡</div>
          <h3 style={{ color: 'var(--gold-light)', marginBottom: 8 }}>Study Strategy</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.7 }}>
            Start with <strong>Theory</strong> to understand the rules, then <strong>Practice</strong> until you feel confident, and finally take the <strong>Workshop</strong> to test yourself for real. Your corrected PDF will be sent to the teacher automatically!
          </p>
        </div>
      </div>
    </>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  if (!userName) {
    return (
      <LoginScreen
        onLogin={(name, email) => {
          setUserName(name)
          setUserEmail(email)
        }}
      />
    )
  }

  return (
    <div>
      <nav className="nav">
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img src={logoImg} alt="CBF" style={{ height: 38, width: 'auto', flexShrink: 0 }} />
          <span>CBF Language Arts</span>
        </div>
        <div className="nav-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`nav-tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {activeTab === 'home' && <Home setTab={setActiveTab} userName={userName} />}
      {activeTab === 'theory' && <Theory />}
      {activeTab === 'practice' && <Practice />}
      {activeTab === 'workshop' && <Workshop studentName={userName} studentEmail={userEmail} />}
    </div>
  )
}
