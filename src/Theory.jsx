import { useState } from 'react'
import judahImg from './assets/judah-lion.png'
import logoImg from './assets/logo-boston-flex.png'

const Accordion = ({ title, icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="accordion-item">
      <button className="accordion-btn" onClick={() => setOpen(o => !o)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>{icon}</span>
          <span>{title}</span>
        </span>
        <span style={{ fontSize: '1.1rem', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && <div className="accordion-content">{children}</div>}
    </div>
  )
}

const ExBox = ({ correct, children }) => (
  <div style={{
    padding: '0.6rem 0.9rem', borderRadius: 8, marginBottom: 6,
    background: correct ? '#d1fae5' : '#fee2e2',
    border: `1px solid ${correct ? '#6ee7b7' : '#fca5a5'}`,
    fontSize: '0.88rem', lineHeight: 1.6,
  }}>
    <span style={{ fontWeight: 700, marginRight: 6 }}>{correct ? '✅' : '❌'}</span>
    {children}
  </div>
)

const SignalBox = ({ words }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '0.75rem 0' }}>
    {words.map(w => (
      <span key={w} style={{
        background: 'var(--navy)', color: 'white',
        padding: '0.2rem 0.65rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600,
      }}>{w}</span>
    ))}
  </div>
)

// ── TOPIC DEFINITIONS ─────────────────────────────────────────────────────
const TOPICS = [
  { id: 'vocab',        icon: '💬', label: 'Vocabulary' },
  { id: 'pres-simple',  icon: '🟢', label: 'Present Simple' },
  { id: 'pres-cont',    icon: '🔄', label: 'Present Continuous' },
  { id: 'past-simple',  icon: '⏮️', label: 'Past Simple' },
  { id: 'past-cont',    icon: '⏸️', label: 'Past Continuous' },
  { id: 'used-to',      icon: '🔁', label: 'Used To & Would' },
  { id: 'reading',      icon: '📖', label: 'Reading Skills' },
  { id: 'biblical',     icon: '✝️', label: 'Biblical' },
  { id: 'writing',      icon: '✍️', label: 'Writing' },
]

// ── TOPIC CONTENT COMPONENTS ──────────────────────────────────────────────
function TopicVocab() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">💬</div>
        <div>
          <div className="card-title">Vocabulary in Context</div>
          <div className="card-subtitle">Know the word — and how to use it correctly</div>
        </div>
      </div>
      <span className="theory-tag vocab">Vocabulary</span>

      <p style={{ marginBottom: '1rem' }}>
        Knowing a word means knowing its <strong>meaning</strong>, its <strong>grammatical type</strong> (verb, noun, adjective…), and how to use it <strong>naturally in a sentence</strong>. Vocabulary questions ask you to write your own sentence — so practise using each word, not just memorising its definition.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table className="tense-table">
          <thead>
            <tr><th>Word / Phrase</th><th>Type</th><th>Meaning</th><th>Example Sentence</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Charming</strong></td><td>Adjective</td><td>Delightful, very attractive or pleasant</td><td>She has a <em>charming</em> smile that makes everyone feel welcome.</td></tr>
            <tr><td><strong>Encourage</strong></td><td>Verb</td><td>To give support or confidence to someone</td><td>Teachers always <em>encourage</em> students to do their best.</td></tr>
            <tr><td><strong>Turn into</strong></td><td>Phrasal verb</td><td>To transform or change into something else</td><td>Caterpillars <em>turn into</em> butterflies after weeks in a cocoon.</td></tr>
            <tr><td><strong>Get along</strong></td><td>Phrasal verb</td><td>To have a good relationship with someone</td><td>I <em>get along</em> really well with my neighbours.</td></tr>
            <tr><td><strong>Grow up</strong></td><td>Phrasal verb</td><td>To develop from a child to an adult</td><td>She wants to be an engineer when she <em>grows up</em>.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="rule-box gold">
        <strong>💡 How to write a good vocabulary sentence:</strong><br />
        1. Use the word in context — show you understand its meaning.<br />
        2. Write a complete sentence (subject + verb + complement).<br />
        3. Add a detail to make it richer: <em>She has a charming smile</em> ✅ is better than just <em>She is charming</em> ✅.
      </div>
    </div>
  )
}

function TopicPresentSimple() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">🟢</div>
        <div>
          <div className="card-title">Present Simple</div>
          <div className="card-subtitle">Habits, facts, permanent states & scheduled events</div>
        </div>
      </div>
      <span className="theory-tag grammar">Grammar</span>

      <Accordion title="🔧 Formation — How to build it" icon="🔧" defaultOpen={true}>
        <div style={{ overflowX: 'auto' }}>
          <table className="tense-table">
            <thead>
              <tr><th>Subject</th><th>Affirmative (+)</th><th>Negative (−)</th><th>Question (?)</th></tr>
            </thead>
            <tbody>
              <tr><td>I / You / We / They</td><td>I <strong>work</strong> here.</td><td>I <strong>don't work</strong> here.</td><td><strong>Do</strong> you work here?</td></tr>
              <tr><td>He / She / It</td><td>She <strong>works</strong> here.</td><td>She <strong>doesn't work</strong> here.</td><td><strong>Does</strong> she work here?</td></tr>
            </tbody>
          </table>
        </div>
        <div className="rule-box" style={{ marginTop: '1rem' }}>
          <strong>⚠️ The -s rule for He / She / It:</strong> Always add <strong>-s</strong> (or <strong>-es</strong>) to the verb in affirmative sentences.<br />
          <em>he work<strong>s</strong> · she teach<strong>es</strong> · it go<strong>es</strong> · he stud<strong>ies</strong></em><br /><br />
          <strong>Spelling rules:</strong><br />
          • Most verbs → add <strong>-s</strong>: <em>reads, plays, runs</em><br />
          • Verbs ending in -s, -sh, -ch, -x, -o → add <strong>-es</strong>: <em>watches, washes, goes, fixes</em><br />
          • Verbs ending in consonant + y → change y to <strong>-ies</strong>: <em>study → studies, carry → carries</em><br />
          • Verbs ending in vowel + y → just add <strong>-s</strong>: <em>play → plays, say → says</em>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <ExBox correct={true}>He <strong>reads</strong> the news every morning. ✔ (he → reads)</ExBox>
          <ExBox correct={false}>He <strong>read</strong> the news every morning. ✘ (missing -s for he/she/it)</ExBox>
          <ExBox correct={true}>She <strong>doesn't eat</strong> meat. ✔ (doesn't + base verb, no -s)</ExBox>
          <ExBox correct={false}>She <strong>doesn't eats</strong> meat. ✘ (never add -s after doesn't)</ExBox>
        </div>
      </Accordion>

      <Accordion title="📌 When to use Present Simple — 5 Uses" icon="📌" defaultOpen={true}>
        <div style={{ background: '#eff6ff', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#1e40af' }}>USE 1 — Habits & Routines</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>Actions that happen regularly — every day, every week, always, never.</p>
          <SignalBox words={['every day', 'every morning', 'always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'on Mondays']} />
          <ExBox correct={true}>My dad <strong>reads</strong> the news every morning before breakfast.</ExBox>
          <ExBox correct={true}>We <strong>don't go</strong> to school on Saturdays.</ExBox>
          <ExBox correct={true}><strong>Does</strong> she <strong>exercise</strong> regularly?</ExBox>
        </div>
        <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#065f46' }}>USE 2 — General Truths & Scientific Facts</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>Things that are always true — in science, nature, or the world.</p>
          <ExBox correct={true}>The Earth <strong>orbits</strong> the Sun once a year.</ExBox>
          <ExBox correct={true}>Water <strong>boils</strong> at 100 degrees Celsius.</ExBox>
          <ExBox correct={true}>Cats <strong>sleep</strong> about 16 hours a day.</ExBox>
        </div>
        <div style={{ background: '#fdf4ff', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#6b21a8' }}>USE 3 — Permanent States & Facts About People</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>Situations that are long-term or permanent for someone.</p>
          <ExBox correct={true}>My aunt <strong>has</strong> a coffee shop near the park.</ExBox>
          <ExBox correct={true}>They <strong>live</strong> in Barranquilla.</ExBox>
          <ExBox correct={true}>He <strong>speaks</strong> three languages.</ExBox>
        </div>
        <div style={{ background: '#fff7ed', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#9a3412' }}>USE 4 — Feelings, Opinions & Preferences</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>Mental states and emotions — these are STATIVE verbs (see below).</p>
          <ExBox correct={true}>She <strong>loves</strong> spicy food.</ExBox>
          <ExBox correct={true}>I <strong>don't believe</strong> that story.</ExBox>
          <ExBox correct={true}><strong>Do</strong> you <strong>know</strong> the answer?</ExBox>
        </div>
        <div style={{ background: '#f0f9ff', borderRadius: 10, padding: '1rem' }}>
          <strong style={{ color: '#0369a1' }}>USE 5 — Timetables & Scheduled Events</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>Fixed schedules — transportation, school, cinema, etc.</p>
          <ExBox correct={true}>The train <strong>leaves</strong> at 7:30 tomorrow morning.</ExBox>
          <ExBox correct={true}>The class <strong>starts</strong> at 8 and <strong>ends</strong> at 9:30.</ExBox>
        </div>
      </Accordion>

      <Accordion title="🚫 Stative Verbs — NEVER use in -ing form" icon="🚫">
        <p style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>
          Stative verbs describe <strong>states</strong> (not actions). They express feelings, opinions, senses, and possession. They are <strong>never</strong> used in any continuous tense.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
          {[
            { cat: '❤️ Feelings', verbs: 'like, love, hate, prefer, want, wish, need' },
            { cat: '🧠 Mental states', verbs: 'know, believe, understand, think*, remember, forget' },
            { cat: '👁️ Senses', verbs: 'see, hear, smell, taste, feel*' },
            { cat: '🏠 Possession', verbs: 'have*, own, belong, possess' },
            { cat: '🔗 Other', verbs: 'seem, appear, contain, consist, depend, mean' },
          ].map(g => (
            <div key={g.cat} style={{ background: '#fef2f2', borderRadius: 8, padding: '0.65rem', fontSize: '0.82rem' }}>
              <strong style={{ display: 'block', marginBottom: 3 }}>{g.cat}</strong>
              <span style={{ color: '#991b1b' }}>{g.verbs}</span>
            </div>
          ))}
        </div>
        <div className="rule-box red">
          <strong>* Important exceptions:</strong><br />
          • <em>have</em> = ownership → stative: <em>She <strong>has</strong> a dog.</em> ✅<br />
          • <em>have</em> = experience/eat → action: <em>She <strong>is having</strong> lunch.</em> ✅<br />
          • <em>think</em> = opinion → stative: <em>I <strong>think</strong> it's great.</em> ✅<br />
          • <em>think</em> = consider/reflect → action: <em>I <strong>am thinking</strong> about it.</em> ✅<br />
          • <em>feel</em> = emotion → stative: <em>She <strong>feels</strong> happy.</em> ✅<br />
          • <em>feel</em> = physically touching → action: <em>She <strong>is feeling</strong> the fabric.</em> ✅
        </div>
        <ExBox correct={true}>My aunt <strong>has</strong> a coffee shop. (ownership)</ExBox>
        <ExBox correct={false}>My aunt <strong>is having</strong> a coffee shop. ✘ (ownership → NEVER continuous)</ExBox>
        <ExBox correct={true}>I <strong>love</strong> this city. (feeling)</ExBox>
        <ExBox correct={false}>I <strong>am loving</strong> this city. ✘ (love is stative)</ExBox>
      </Accordion>

      <Accordion title="⚠️ Most Common Mistakes" icon="⚠️">
        <ExBox correct={false}>She <strong>don't</strong> eat meat. ✘ → use <strong>doesn't</strong> for he/she/it</ExBox>
        <ExBox correct={true}>She <strong>doesn't</strong> eat meat. ✅</ExBox>
        <ExBox correct={false}><strong>Does</strong> he <strong>works</strong> here? ✘ → after does/doesn't, verb stays in base form</ExBox>
        <ExBox correct={true}><strong>Does</strong> he <strong>work</strong> here? ✅</ExBox>
        <ExBox correct={false}>He <strong>is knowing</strong> the answer. ✘ → know is stative</ExBox>
        <ExBox correct={true}>He <strong>knows</strong> the answer. ✅</ExBox>
        <ExBox correct={false}>I <strong>am wanting</strong> a pizza. ✘ → want is stative</ExBox>
        <ExBox correct={true}>I <strong>want</strong> a pizza. ✅</ExBox>
      </Accordion>
    </div>
  )
}

function TopicPresentContinuous() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">🔄</div>
        <div>
          <div className="card-title">Present Continuous</div>
          <div className="card-subtitle">Actions happening now, temporary situations & future plans</div>
        </div>
      </div>
      <span className="theory-tag grammar">Grammar</span>

      <Accordion title="🔧 Formation — How to build it" icon="🔧" defaultOpen={true}>
        <div className="rule-box" style={{ marginBottom: '1rem' }}>
          <strong>Formula:</strong> Subject + <strong>am / is / are</strong> + verb<strong>-ing</strong>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tense-table">
            <thead>
              <tr><th>Subject</th><th>Affirmative (+)</th><th>Negative (−)</th><th>Question (?)</th></tr>
            </thead>
            <tbody>
              <tr><td>I</td><td>I <strong>am working</strong>. / I'<strong>m working</strong>.</td><td>I <strong>am not working</strong>. / I'<strong>m not</strong>.</td><td><strong>Am</strong> I working?</td></tr>
              <tr><td>He / She / It</td><td>She <strong>is working</strong>. / She'<strong>s working</strong>.</td><td>She <strong>isn't working</strong>.</td><td><strong>Is</strong> she working?</td></tr>
              <tr><td>You / We / They</td><td>They <strong>are working</strong>. / They'<strong>re working</strong>.</td><td>They <strong>aren't working</strong>.</td><td><strong>Are</strong> they working?</td></tr>
            </tbody>
          </table>
        </div>
        <div className="rule-box" style={{ marginTop: '1rem' }}>
          <strong>📝 Spelling rules for -ing:</strong><br />
          • Most verbs → just add <strong>-ing</strong>: <em>read → reading, eat → eating</em><br />
          • Verbs ending in silent <strong>-e</strong> → drop e, add <strong>-ing</strong>: <em>make → making, write → writing, have → having</em><br />
          • Short verbs ending in vowel + consonant → <strong>double the consonant</strong>: <em>run → running, sit → sitting, swim → swimming, stop → stopping</em><br />
          • Verbs ending in <strong>-ie</strong> → change to <strong>-ying</strong>: <em>lie → lying, die → dying, tie → tying</em>
        </div>
      </Accordion>

      <Accordion title="📌 When to use Present Continuous — 4 Uses" icon="📌" defaultOpen={true}>
        <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#065f46' }}>USE 1 — Actions happening RIGHT NOW</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>The action is in progress at the exact moment of speaking.</p>
          <SignalBox words={['now', 'right now', 'at the moment', 'at present', 'look!', 'listen!', 'quick!']} />
          <ExBox correct={true}>Listen! Someone <strong>is knocking</strong> at the door.</ExBox>
          <ExBox correct={true}>Quick! The train <strong>is leaving</strong> — run!</ExBox>
          <ExBox correct={true}><strong>Are</strong> you <strong>doing</strong> your homework right now?</ExBox>
        </div>
        <div style={{ background: '#fef9c3', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#854d0e' }}>USE 2 — Temporary Situations</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>Situations that are true now but will change — they are NOT permanent.</p>
          <SignalBox words={['this week', 'this month', 'these days', 'for now', 'temporarily']} />
          <ExBox correct={true}>I <strong>am staying</strong> at my aunt's house this week while my parents are travelling.</ExBox>
          <ExBox correct={true}>She <strong>is working</strong> at a café until she finds a better job.</ExBox>
          <ExBox correct={true}>The school pool is closed, so we <strong>are practising</strong> at the sports centre.</ExBox>
        </div>
        <div style={{ background: '#fce7f3', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#831843' }}>USE 3 — Changing / Developing Situations</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>A situation that is gradually changing over time.</p>
          <ExBox correct={true}>Temperatures around the world <strong>are rising</strong> every year.</ExBox>
          <ExBox correct={true}>My little sister <strong>is getting</strong> taller and taller.</ExBox>
          <ExBox correct={true}>Technology <strong>is changing</strong> the way we communicate.</ExBox>
        </div>
        <div style={{ background: '#eff6ff', borderRadius: 10, padding: '1rem' }}>
          <strong style={{ color: '#1e40af' }}>USE 4 — Future Plans & Arrangements</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>A fixed plan or arrangement for the near future (usually with a time expression).</p>
          <SignalBox words={['tomorrow', 'tonight', 'next week', 'on Saturday', 'this afternoon']} />
          <ExBox correct={true}>We <strong>are meeting</strong> our cousins tomorrow afternoon.</ExBox>
          <ExBox correct={true}><strong>Is</strong> she <strong>flying</strong> to Bogotá on Friday?</ExBox>
          <ExBox correct={true}>They <strong>aren't coming</strong> to the party tonight.</ExBox>
        </div>
      </Accordion>

      <Accordion title="⚡ Present Simple vs. Continuous — Key Contrasts" icon="⚡">
        <div style={{ overflowX: 'auto' }}>
          <table className="tense-table">
            <thead>
              <tr><th>Situation</th><th>Present Simple ✅</th><th>Present Continuous ✅</th></tr>
            </thead>
            <tbody>
              <tr><td>Habit vs. now</td><td><em>He <strong>reads</strong> every morning.</em> (habit)</td><td><em>He <strong>is reading</strong> right now.</em> (at this moment)</td></tr>
              <tr><td>Permanent vs. temporary</td><td><em>She <strong>lives</strong> in Barranquilla.</em> (permanent)</td><td><em>She <strong>is living</strong> with her grandma this month.</em> (temporary)</td></tr>
              <tr><td>General fact vs. in progress</td><td><em>It <strong>rains</strong> a lot in April.</em> (general truth)</td><td><em>It <strong>is raining</strong> right now.</em> (in progress)</td></tr>
              <tr><td>Stative verb (always simple)</td><td><em>He <strong>has</strong> a dog.</em> (ownership)</td><td><em>She <strong>is having</strong> lunch.</em> (action = eating)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="rule-box gold" style={{ marginTop: '1rem' }}>
          <strong>🔑 The golden question:</strong> Ask yourself — <em>Is this happening at this exact moment, or is it a general/permanent truth?</em><br />
          If it's happening <strong>right now or temporarily</strong> → Present Continuous<br />
          If it's a <strong>habit, fact, or permanent state</strong> → Present Simple
        </div>
      </Accordion>

      <Accordion title="⚠️ Most Common Mistakes" icon="⚠️">
        <ExBox correct={false}>I <strong>am loving</strong> this song! ✘ → love is stative</ExBox>
        <ExBox correct={true}>I <strong>love</strong> this song! ✅</ExBox>
        <ExBox correct={false}>She <strong>is knowing</strong> the answer. ✘ → know is stative</ExBox>
        <ExBox correct={true}>She <strong>knows</strong> the answer. ✅</ExBox>
        <ExBox correct={false}>He <strong>is working</strong> in a bank. ✘ (if it's his permanent job)</ExBox>
        <ExBox correct={true}>He <strong>works</strong> in a bank. ✅ (permanent job → Simple)</ExBox>
        <ExBox correct={false}>Sorry, I can't talk. I <strong>have</strong> lunch. ✘ (eating = action happening now)</ExBox>
        <ExBox correct={true}>Sorry, I can't talk. I <strong>am having</strong> lunch. ✅</ExBox>
      </Accordion>
    </div>
  )
}

function TopicPastSimple() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">⏮️</div>
        <div>
          <div className="card-title">Past Simple</div>
          <div className="card-subtitle">Completed actions, facts, and events in the past</div>
        </div>
      </div>
      <span className="theory-tag grammar">Grammar</span>

      <Accordion title="🔧 Formation — Regular & Irregular Verbs" icon="🔧" defaultOpen={true}>
        <div className="rule-box" style={{ marginBottom: '1rem' }}>
          <strong>Formula (+):</strong> Subject + <strong>verb-ed</strong> (regular) or <strong>irregular form</strong><br />
          <strong>Formula (−):</strong> Subject + <strong>didn't</strong> + base verb<br />
          <strong>Formula (?):</strong> <strong>Did</strong> + subject + base verb?
        </div>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table className="tense-table">
            <thead>
              <tr><th>Subject</th><th>Affirmative (+)</th><th>Negative (−)</th><th>Question (?)</th></tr>
            </thead>
            <tbody>
              <tr><td>All subjects</td><td>She <strong>worked</strong> late.</td><td>She <strong>didn't work</strong> late.</td><td><strong>Did</strong> she work late?</td></tr>
              <tr><td>All subjects</td><td>He <strong>went</strong> home.</td><td>He <strong>didn't go</strong> home.</td><td><strong>Did</strong> he go home?</td></tr>
            </tbody>
          </table>
        </div>
        <div className="rule-box" style={{ marginBottom: '1rem' }}>
          <strong>📝 Spelling rules for regular -ed verbs:</strong><br />
          • Most verbs → add <strong>-ed</strong>: <em>work → worked, play → played, visit → visited</em><br />
          • Verbs ending in <strong>-e</strong> → add <strong>-d</strong>: <em>live → lived, arrive → arrived, like → liked</em><br />
          • Verbs ending in consonant + <strong>-y</strong> → change y to <strong>-ied</strong>: <em>study → studied, carry → carried, try → tried</em><br />
          • Short verbs ending in vowel + consonant → <strong>double the consonant</strong>: <em>stop → stopped, plan → planned, prefer → preferred</em>
        </div>
        <strong style={{ display: 'block', marginBottom: '0.5rem' }}>📋 Most Important Irregular Verbs:</strong>
        <div style={{ overflowX: 'auto' }}>
          <table className="tense-table">
            <thead>
              <tr><th>Base</th><th>Past</th><th>Base</th><th>Past</th><th>Base</th><th>Past</th></tr>
            </thead>
            <tbody>
              <tr><td>be</td><td><strong>was/were</strong></td><td>feel</td><td><strong>felt</strong></td><td>run</td><td><strong>ran</strong></td></tr>
              <tr><td>begin</td><td><strong>began</strong></td><td>find</td><td><strong>found</strong></td><td>say</td><td><strong>said</strong></td></tr>
              <tr><td>break</td><td><strong>broke</strong></td><td>fly</td><td><strong>flew</strong></td><td>see</td><td><strong>saw</strong></td></tr>
              <tr><td>bring</td><td><strong>brought</strong></td><td>forget</td><td><strong>forgot</strong></td><td>sell</td><td><strong>sold</strong></td></tr>
              <tr><td>build</td><td><strong>built</strong></td><td>get</td><td><strong>got</strong></td><td>send</td><td><strong>sent</strong></td></tr>
              <tr><td>buy</td><td><strong>bought</strong></td><td>give</td><td><strong>gave</strong></td><td>sit</td><td><strong>sat</strong></td></tr>
              <tr><td>catch</td><td><strong>caught</strong></td><td>go</td><td><strong>went</strong></td><td>sleep</td><td><strong>slept</strong></td></tr>
              <tr><td>come</td><td><strong>came</strong></td><td>grow</td><td><strong>grew</strong></td><td>speak</td><td><strong>spoke</strong></td></tr>
              <tr><td>cut</td><td><strong>cut</strong></td><td>have</td><td><strong>had</strong></td><td>swim</td><td><strong>swam</strong></td></tr>
              <tr><td>do</td><td><strong>did</strong></td><td>hear</td><td><strong>heard</strong></td><td>take</td><td><strong>took</strong></td></tr>
              <tr><td>drink</td><td><strong>drank</strong></td><td>know</td><td><strong>knew</strong></td><td>teach</td><td><strong>taught</strong></td></tr>
              <tr><td>drive</td><td><strong>drove</strong></td><td>leave</td><td><strong>left</strong></td><td>think</td><td><strong>thought</strong></td></tr>
              <tr><td>eat</td><td><strong>ate</strong></td><td>make</td><td><strong>made</strong></td><td>wake</td><td><strong>woke</strong></td></tr>
              <tr><td>fall</td><td><strong>fell</strong></td><td>meet</td><td><strong>met</strong></td><td>write</td><td><strong>wrote</strong></td></tr>
            </tbody>
          </table>
        </div>
      </Accordion>

      <Accordion title="📌 When to use Past Simple — 4 Uses" icon="📌" defaultOpen={true}>
        <div style={{ background: '#fef3c7', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#92400e' }}>USE 1 — Completed Actions in the Past</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>An action that started and finished at a specific moment in the past.</p>
          <SignalBox words={['yesterday', 'last week', 'last year', 'in 2020', 'ago', 'in the morning', 'on Monday']} />
          <ExBox correct={true}>She <strong>called</strong> me yesterday afternoon.</ExBox>
          <ExBox correct={true}>The storm <strong>lasted</strong> three days and <strong>destroyed</strong> many houses.</ExBox>
          <ExBox correct={true}>I <strong>didn't sleep</strong> well last night.</ExBox>
        </div>
        <div style={{ background: '#dcfce7', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#166534' }}>USE 2 — A Series of Completed Past Actions</strong>
          <SignalBox words={['then', 'after that', 'finally', 'first', 'next', 'and']} />
          <ExBox correct={true}>She <strong>woke up</strong>, <strong>had</strong> breakfast, and <strong>ran</strong> to catch the bus.</ExBox>
        </div>
        <div style={{ background: '#fce7f3', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#831843' }}>USE 3 — The Interrupting Action (with Past Continuous)</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, marginBottom: 6 }}>The shorter action that <strong>interrupts</strong> a longer ongoing action.</p>
          <ExBox correct={true}>She was reading <strong>when</strong> the phone <strong>rang</strong>. (rang = interruption)</ExBox>
          <ExBox correct={true}>My dad was driving to work when he <strong>noticed</strong> a flat tyre.</ExBox>
        </div>
        <div style={{ background: '#eff6ff', borderRadius: 10, padding: '1rem' }}>
          <strong style={{ color: '#1e40af' }}>USE 4 — Past Facts & States</strong>
          <ExBox correct={true}>She <strong>lived</strong> in London for ten years.</ExBox>
          <ExBox correct={true}>He <strong>was</strong> very shy when he was a child.</ExBox>
        </div>
      </Accordion>

      <Accordion title="⚠️ Most Common Mistakes" icon="⚠️">
        <ExBox correct={false}>She <strong>didn't went</strong> to school. ✘ → after didn't, use base form</ExBox>
        <ExBox correct={true}>She <strong>didn't go</strong> to school. ✅</ExBox>
        <ExBox correct={false}><strong>Did</strong> he <strong>worked</strong> late? ✘ → after Did, use base form</ExBox>
        <ExBox correct={true}><strong>Did</strong> he <strong>work</strong> late? ✅</ExBox>
        <ExBox correct={false}>I <strong>buyed</strong> a new phone. ✘ → buy is irregular</ExBox>
        <ExBox correct={true}>I <strong>bought</strong> a new phone. ✅</ExBox>
        <ExBox correct={false}>They <strong>stoped</strong> the car. ✘ → stop: double p before -ed</ExBox>
        <ExBox correct={true}>They <strong>stopped</strong> the car. ✅</ExBox>
      </Accordion>
    </div>
  )
}

function TopicPastContinuous() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">⏸️</div>
        <div>
          <div className="card-title">Past Continuous</div>
          <div className="card-subtitle">Ongoing actions in progress at a moment in the past</div>
        </div>
      </div>
      <span className="theory-tag grammar">Grammar</span>

      <Accordion title="🔧 Formation — How to build it" icon="🔧" defaultOpen={true}>
        <div className="rule-box" style={{ marginBottom: '1rem' }}>
          <strong>Formula:</strong> Subject + <strong>was / were</strong> + verb<strong>-ing</strong><br /><br />
          <em>I / He / She / It → <strong>was</strong></em><br />
          <em>You / We / They → <strong>were</strong></em>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tense-table">
            <thead>
              <tr><th>Subject</th><th>Affirmative (+)</th><th>Negative (−)</th><th>Question (?)</th></tr>
            </thead>
            <tbody>
              <tr><td>I / He / She / It</td><td>She <strong>was reading</strong>.</td><td>She <strong>wasn't reading</strong>.</td><td><strong>Was</strong> she reading?</td></tr>
              <tr><td>You / We / They</td><td>They <strong>were playing</strong>.</td><td>They <strong>weren't playing</strong>.</td><td><strong>Were</strong> they playing?</td></tr>
            </tbody>
          </table>
        </div>
      </Accordion>

      <Accordion title="📌 When to use Past Continuous — 4 Uses" icon="📌" defaultOpen={true}>
        <div style={{ background: '#fce7f3', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#831843' }}>USE 1 — Action In Progress at a Specific Past Time</strong>
          <SignalBox words={["at 8 o'clock", 'at that moment', 'when I arrived', 'all morning', 'all day']} />
          <ExBox correct={true}>At 10 PM last night, she <strong>was studying</strong> for the exam.</ExBox>
          <ExBox correct={true}>What <strong>were</strong> you <strong>doing</strong> when I called?</ExBox>
        </div>
        <div style={{ background: '#fef3c7', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#92400e' }}>USE 2 — Background Action (Interrupted by Past Simple)</strong>
          <div className="rule-box" style={{ margin: '0.5rem 0' }}>
            <strong>Classic Pattern:</strong><br />
            Past Continuous (background) + <em>when</em> + Past Simple (interruption)<br />
            <em>She <strong>was reading</strong> when the phone <strong>rang</strong>.</em>
          </div>
          <ExBox correct={true}>My dad <strong>was driving</strong> to work when he noticed a flat tyre.</ExBox>
          <ExBox correct={true}>We <strong>were walking</strong> home when we saw a shooting star.</ExBox>
        </div>
        <div style={{ background: '#dcfce7', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#166534' }}>USE 3 — Two Simultaneous Past Actions</strong>
          <SignalBox words={['while', 'as', 'at the same time']} />
          <ExBox correct={true}><strong>While</strong> she <strong>was cooking</strong>, he <strong>was setting</strong> the table.</ExBox>
        </div>
        <div style={{ background: '#eff6ff', borderRadius: 10, padding: '1rem' }}>
          <strong style={{ color: '#1e40af' }}>USE 4 — Setting the Scene in a Story</strong>
          <ExBox correct={true}>It <strong>was raining</strong> heavily. A dog <strong>was barking</strong> in the distance. The streets <strong>were empty</strong>…</ExBox>
        </div>
      </Accordion>

      <Accordion title="🔁 WHEN vs. WHILE" icon="🔁">
        <div style={{ overflowX: 'auto' }}>
          <table className="tense-table">
            <thead><tr><th>Connector</th><th>Followed by</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><strong>when</strong></td><td>Past Simple (the interruption)</td><td><em>She was reading <strong>when</strong> the phone <strong>rang</strong>.</em></td></tr>
              <tr><td><strong>while</strong></td><td>Past Continuous (ongoing action)</td><td><em><strong>While</strong> she <strong>was reading</strong>, the phone rang.</em></td></tr>
            </tbody>
          </table>
        </div>
        <div className="rule-box gold" style={{ marginTop: '0.75rem' }}>
          <strong>💡 Key insight:</strong> Both sentences mean the same thing — just swap the tenses when you swap the connector.
        </div>
      </Accordion>

      <Accordion title="⚡ Past Simple vs. Past Continuous — Key Contrasts" icon="⚡">
        <div style={{ overflowX: 'auto' }}>
          <table className="tense-table">
            <thead><tr><th>Past Simple</th><th>Past Continuous</th></tr></thead>
            <tbody>
              <tr><td>Short, completed action<br /><em>The phone <strong>rang</strong>.</em></td><td>Longer, ongoing background<br /><em>She <strong>was reading</strong>.</em></td></tr>
              <tr><td>Sequence of events<br /><em>He <strong>stood up</strong>, <strong>walked</strong> out.</em></td><td>Parallel ongoing actions<br /><em>She <strong>was talking</strong> while he <strong>was listening</strong>.</em></td></tr>
            </tbody>
          </table>
        </div>
      </Accordion>

      <Accordion title="⚠️ Most Common Mistakes" icon="⚠️">
        <ExBox correct={false}>She <strong>was read</strong> a book. ✘ → must use -ing form</ExBox>
        <ExBox correct={true}>She <strong>was reading</strong> a book. ✅</ExBox>
        <ExBox correct={false}>He <strong>was knowing</strong> the answer. ✘ → know is stative</ExBox>
        <ExBox correct={true}>He <strong>knew</strong> the answer. ✅</ExBox>
        <ExBox correct={false}>While she cooked, the phone rang. ✘ → while needs continuous</ExBox>
        <ExBox correct={true}>While she <strong>was cooking</strong>, the phone rang. ✅</ExBox>
      </Accordion>
    </div>
  )
}

function TopicUsedTo() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">🔁</div>
        <div>
          <div className="card-title">Used To & Would — Past Habits</div>
          <div className="card-subtitle">Things we did regularly in the past but no longer do</div>
        </div>
      </div>
      <span className="theory-tag grammar">Grammar</span>

      <div style={{ overflowX: 'auto' }}>
        <table className="tense-table">
          <thead>
            <tr><th>Feature</th><th>USED TO</th><th>WOULD</th></tr>
          </thead>
          <tbody>
            <tr><td>Past habits (repeated actions)</td><td>✅ Yes</td><td>✅ Yes</td></tr>
            <tr><td>Past states (conditions, feelings)</td><td>✅ Yes</td><td>❌ No</td></tr>
            <tr><td>Example (habit)</td><td><em>I used to play football.</em></td><td><em>I would play football.</em></td></tr>
            <tr><td>Example (state)</td><td><em>I used to live in Bogotá.</em></td><td>❌ <em>I would live in Bogotá.</em> WRONG</td></tr>
            <tr><td>Negative</td><td><em>didn't use to / used not to</em></td><td><em>wouldn't</em></td></tr>
            <tr><td>Question</td><td><em>Did you use to…?</em></td><td><em>Would you…?</em> (unusual)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="rule-box gold" style={{ marginTop: '1rem' }}>
        <strong>🔑 The Golden Rule:</strong> If the sentence describes a <em>state</em> (living somewhere, having something, being afraid, liking something) → you MUST use <strong>used to</strong> — NEVER would.<br /><br />
        If it describes a repeated <em>action/habit</em> → both <strong>used to</strong> and <strong>would</strong> are correct!<br />
        That's why "Both are correct" is sometimes the right answer in multiple choice.
      </div>

      <Accordion title="📝 Examples — Habits vs. States" icon="✏️" defaultOpen={true}>
        <div style={{ background: '#eff6ff', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#1e40af' }}>STATES — only "used to" ✅</strong>
          <ExBox correct={true}>Carlos <strong>used to be</strong> afraid of spiders. (being afraid = state)</ExBox>
          <ExBox correct={false}>Carlos <strong>would be</strong> afraid of spiders. ✘ (be = state → no would)</ExBox>
          <ExBox correct={true}>My parents <strong>didn't use to have</strong> a car. (having = state)</ExBox>
        </div>
        <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '1rem' }}>
          <strong style={{ color: '#065f46' }}>HABITS — both correct ✅</strong>
          <ExBox correct={true}>We <strong>used to go</strong> to the cinema every Friday. ✅</ExBox>
          <ExBox correct={true}>We <strong>would go</strong> to the cinema every Friday. ✅</ExBox>
          <ExBox correct={true}>My grandmother <strong>used to tell / would tell</strong> us stories before bedtime. ✅</ExBox>
        </div>
      </Accordion>
    </div>
  )
}

function TopicReading() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">📖</div>
        <div>
          <div className="card-title">Reading Comprehension Skills</div>
          <div className="card-subtitle">Strategies for understanding any text</div>
        </div>
      </div>
      <span className="theory-tag reading">Reading</span>

      <p style={{ marginBottom: '1rem' }}>Reading comprehension questions test whether you truly <em>understand</em> the text — not just if you can find words. Here are the key question types and strategies:</p>

      <Accordion title="🎯 Main Purpose / Writer's Aim" icon="🎯" defaultOpen={true}>
        <p>These questions ask: <em>"What is the writer trying to do?"</em></p>
        <ul style={{ paddingLeft: '1rem', lineHeight: 1.8, marginTop: '0.5rem' }}>
          <li><strong>Inform</strong> = give facts, teach something</li>
          <li><strong>Entertain</strong> = tell a story for enjoyment</li>
          <li><strong>Persuade</strong> = convince you of something</li>
          <li><strong>Describe</strong> = paint a picture with words</li>
        </ul>
        <div className="rule-box green" style={{ marginTop: '0.75rem' }}>
          <strong>Tip:</strong> Look at the whole text — not just one paragraph. Ask yourself: <em>Is the writer mostly teaching me facts? Telling a story? Arguing a point?</em>
        </div>
      </Accordion>

      <Accordion title="🔍 Specific Detail Questions" icon="🔍">
        <p>These questions ask you to find exact information in the text. Strategy:</p>
        <ul style={{ paddingLeft: '1rem', lineHeight: 1.8, marginTop: '0.5rem' }}>
          <li>Read the question carefully — underline key words</li>
          <li>Go back to the text and scan for those key words</li>
          <li>Read the surrounding sentences, not just the one with the key word</li>
          <li>Answer in your own words, but stay close to what the text says</li>
        </ul>
        <div className="rule-box" style={{ marginTop: '0.5rem' }}>
          <strong>Example:</strong> "What obstacles did Marie Curie face?" → Scan for: <em>obstacle, challenge, difficult, not allowed, poor</em>
        </div>
      </Accordion>

      <Accordion title="💭 Open Questions — How to write great answers" icon="💭">
        <div className="rule-box" style={{ marginTop: '0.5rem' }}>
          <strong>Structure for open answers:</strong><br />
          1. Give a <strong>direct answer</strong> to the question.<br />
          2. <strong>Quote or reference</strong> specific details from the text.<br />
          3. <strong>Explain</strong> the connection. Write at least 2–3 sentences.
        </div>
        <div className="rule-box green" style={{ marginTop: '0.75rem' }}>
          <strong>Model:</strong><br /><br />
          <em>Question: "How did Marie Curie show determination?"</em><br /><br />
          <strong>Answer:</strong> "Marie Curie showed determination in several ways. First, even though women were not allowed to attend university in Poland, she moved to Paris alone and lived in poverty to pursue her studies. Later, after her husband Pierre died, she did not give up — she continued her research and went on to win a second Nobel Prize."
        </div>
      </Accordion>
    </div>
  )
}

function TopicBiblical() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">✝️</div>
        <div>
          <div className="card-title">Biblical Worldview Integration</div>
          <div className="card-subtitle">1 John 2:17 & Matthew 5:42</div>
        </div>
      </div>
      <span className="theory-tag biblical">Biblical Integration</span>

      <div className="verse-card">
        <div className="verse-text">"The world and its desires pass away, but whoever does the will of God lives forever."</div>
        <div className="verse-ref">— 1 John 2:17 (NIV)</div>
        <div className="verse-explanation">
          <strong>What does this mean?</strong><br />
          John warns believers not to love the world — materialism, popularity, pleasure-seeking — over God. The "world" here refers to temporary things: fashion, fame, money, status. These desires are constantly changing and ultimately empty.<br /><br />
          <strong>Application for young people:</strong> Clinging to worldly things (the latest phone, social media likes, living for popularity) is useless because they <em>pass away</em>. But living according to God's will — being kind, honest, generous, faithful — has eternal value.
        </div>
      </div>

      <div className="verse-card" style={{ marginTop: '1rem' }}>
        <div className="verse-text">"Give to the one who asks you, and do not turn away from the one who wants to borrow from you."</div>
        <div className="verse-ref">— Matthew 5:42 (NIV)</div>
        <div className="verse-explanation">
          <strong>What does this mean?</strong><br />
          <strong>NO</strong> — this verse does NOT agree with hoarding wealth. It is part of Jesus' Sermon on the Mount. The world says: accumulate, protect your resources, give only when it benefits you. Jesus says: give freely, lend without expecting repayment.<br /><br />
          <strong>The contrast:</strong> While today's culture encourages people to build brands, accumulate wealth, and collect followers, Matthew 5:42 calls us to open-handedness. True generosity reflects God's own character.
        </div>
      </div>

      <div className="rule-box gold" style={{ marginTop: '1rem' }}>
        <strong>📝 Strategy for Biblical Questions:</strong> Always connect the verse to <em>specific actions</em>. Don't just say "be good." Show HOW the verse applies: What would a student who follows this verse do differently at school? At home? On social media?
      </div>
    </div>
  )
}

function TopicWriting() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">✍️</div>
        <div>
          <div className="card-title">Writing About the Past</div>
          <div className="card-subtitle">Using past tenses in narrative writing</div>
        </div>
      </div>
      <span className="theory-tag grammar">Grammar + Writing</span>

      <p style={{ marginBottom: '1rem' }}>When you write about past events, mix both past tenses to make your writing rich and natural:</p>

      <div className="rule-box green">
        <strong>Model Answer:</strong><br /><br />
        "Last weekend, I <strong>visited</strong> my cousins in Cartagena. The city <strong>was</strong> stunning. While my cousin <strong>was surfing</strong>, I <strong>relaxed</strong> on the beach and <strong>read</strong> a book. On Saturday evening, we <strong>walked</strong> along the old city walls. The views <strong>were</strong> incredible! We <strong>were taking</strong> photos when it <strong>started</strong> to rain, so we <strong>ran</strong> to a café and <strong>ate</strong> empanadas while we <strong>waited</strong> for the sun to come back."
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
        Notice: <strong>Past Simple</strong> for completed actions · <strong>Past Continuous</strong> for background or interrupted actions. Add specific details — where, what, who with. Use time words: <em>while, when, after, before, then, finally</em>.
      </p>

      <div className="rule-box gold" style={{ marginTop: '1rem' }}>
        <strong>✅ Checklist before submitting your writing:</strong><br />
        □ Did I use Past Simple for completed actions?<br />
        □ Did I use Past Continuous for background/interrupted actions?<br />
        □ Did I mix both tenses naturally?<br />
        □ Did I include time connectors (while, when, then, after)?<br />
        □ Did I add specific details (names, places, feelings)?
      </div>
    </div>
  )
}

const TOPIC_COMPONENTS = [
  TopicVocab,
  TopicPresentSimple,
  TopicPresentContinuous,
  TopicPastSimple,
  TopicPastContinuous,
  TopicUsedTo,
  TopicReading,
  TopicBiblical,
  TopicWriting,
]

// ── MAIN THEORY COMPONENT ─────────────────────────────────────────────────
export default function Theory() {
  const [active, setActive] = useState(0)
  const ActiveTopic = TOPIC_COMPONENTS[active]

  const goTo = (idx) => {
    setActive(idx)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
        <h2>📚 Theory & Grammar Review</h2>
        <p>Select a topic below. Study one section at a time — use the arrows to move forward.</p>
      </div>

      {/* ── TOPIC NAV ─────────────────────────────── */}
      <div style={{
        display: 'flex', gap: 6, flexWrap: 'wrap',
        justifyContent: 'center', marginBottom: '2rem',
      }}>
        {TOPICS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => goTo(i)}
            style={{
              padding: '7px 14px',
              borderRadius: 100,
              border: `2px solid ${active === i ? 'var(--navy)' : 'var(--gray-200)'}`,
              background: active === i
                ? 'linear-gradient(135deg, var(--navy), var(--navy-light))'
                : 'white',
              color: active === i ? 'white' : 'var(--gray-600)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem', fontWeight: 700,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
              transition: 'all 0.18s',
              boxShadow: active === i ? '0 4px 14px rgba(0,48,135,0.3)' : 'none',
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── PROGRESS INDICATOR ────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, marginBottom: '1.5rem',
      }}>
        {TOPICS.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: active === i ? 28 : 8,
              height: 8, borderRadius: 100,
              background: active === i ? 'var(--gold)' : 'var(--gray-200)',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          />
        ))}
      </div>

      {/* ── ACTIVE TOPIC CONTENT ──────────────────── */}
      <ActiveTopic />

      {/* ── PREV / NEXT ───────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginTop: '1.5rem', gap: 12,
      }}>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          style={{ minWidth: 110 }}
        >
          ← Previous
        </button>

        <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)', fontWeight: 600 }}>
          {active + 1} / {TOPICS.length}
        </span>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => goTo(active + 1)}
          disabled={active === TOPICS.length - 1}
          style={{ minWidth: 110 }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
