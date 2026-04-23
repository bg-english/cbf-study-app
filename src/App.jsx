import { useState } from 'react'
import './index.css'
import Theory from './Theory'
import Practice from './Practice'
import Workshop from './Workshop'

const tabs = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'theory', label: 'Theory', icon: '📚' },
  { id: 'practice', label: 'Practice', icon: '🎮' },
  { id: 'workshop', label: 'Workshop', icon: '🏆' },
]

function Home({ setTab }) {
  return (
    <>
      <div className="hero">
        <div className="hero-badge">📖 CBF · Language Arts 8th Grade · First Trimester</div>
        <h1>Your Complete <span>Study Guide</span></h1>
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
            { icon: '🏆', title: 'Final Workshop', desc: 'Complete the full workshop and get a corrected PDF report sent directly to Telegram.', color: '#fef3c7', btn: 'Begin Workshop', tab: 'workshop' },
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
              { icon: '📖', text: 'Reading Comprehension', sub: 'Jacques Cousteau text' },
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
        <div style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', borderRadius: 'var(--radius-lg)', padding: '1.5rem', color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>💡</div>
          <h3 style={{ color: 'var(--gold-light)', marginBottom: 8 }}>Study Strategy</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.7 }}>
            Start with <strong>Theory</strong> to understand the rules, then <strong>Practice</strong> until you feel confident, and finally take the <strong>Workshop</strong> to test yourself for real. Download your corrected PDF to review your mistakes!
          </p>
        </div>
      </div>
    </>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div>
      <nav className="nav">
        <div className="nav-logo">CBF Language Arts</div>
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

      {activeTab === 'home' && <Home setTab={setActiveTab} />}
      {activeTab === 'theory' && <Theory />}
      {activeTab === 'practice' && <Practice />}
      {activeTab === 'workshop' && <Workshop />}
    </div>
  )
}
