import { useState } from 'react'

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

export default function Theory() {
  return (
    <div className="section">
      <div className="section-header">
        <h2>📚 Theory & Grammar Review</h2>
        <p>Master all the topics covered in your Language Arts Final Exam. Study each section carefully before practicing.</p>
      </div>

      {/* VOCABULARY */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">💬</div>
          <div>
            <div className="card-title">Vocabulary in Context</div>
            <div className="card-subtitle">Using words correctly in sentences</div>
          </div>
        </div>
        <span className="theory-tag vocab">Vocabulary</span>

        <p style={{ marginBottom: '1rem' }}>
          Vocabulary in context means understanding not just the dictionary meaning of a word, but how to use it naturally in a sentence. Pay attention to whether a word is a verb, noun, adjective, or phrasal verb.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="tense-table">
            <thead>
              <tr><th>Word / Phrase</th><th>Type</th><th>Meaning</th><th>Example Sentence</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Charming</strong></td><td>Adjective</td><td>Delightful, very attractive or pleasant</td><td>She has a <em>charming</em> smile that makes everyone feel welcome.</td></tr>
              <tr><td><strong>Encourage</strong></td><td>Verb</td><td>To give support or confidence to someone</td><td>Teachers always <em>encourage</em> students to do their best.</td></tr>
              <tr><td><strong>Turn into</strong></td><td>Phrasal verb</td><td>To transform or change into something else</td><td>Caterpillars <em>turn into</em> butterflies.</td></tr>
              <tr><td><strong>Get along</strong></td><td>Phrasal verb</td><td>To have a good relationship with someone</td><td>I <em>get along</em> well with my classmates.</td></tr>
              <tr><td><strong>Grow up</strong></td><td>Phrasal verb</td><td>To develop from a child to an adult</td><td>She wants to be a doctor when she <em>grows up</em>.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rule-box gold">
          <strong>💡 Phrasal Verbs Tip:</strong> A phrasal verb = verb + preposition/adverb. The combination creates a new meaning. You cannot always guess the meaning from the parts! Learn them as whole units.
        </div>
      </div>

      {/* PRESENT SIMPLE vs CONTINUOUS */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">🕐</div>
          <div>
            <div className="card-title">Present Simple vs. Present Continuous</div>
            <div className="card-subtitle">When to use each tense</div>
          </div>
        </div>
        <span className="theory-tag grammar">Grammar</span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ background: '#eff6ff', borderRadius: 12, padding: '1rem' }}>
            <h4 style={{ color: '#1e40af', marginBottom: '0.75rem', fontSize: '1rem' }}>✅ Present Simple</h4>
            <ul style={{ paddingLeft: '1rem', fontSize: '0.88rem', lineHeight: 1.8 }}>
              <li>Habits & routines: <em>She takes the bus every day.</em></li>
              <li>Facts & permanent states: <em>He has a bookstore.</em></li>
              <li>Likes & dislikes: <em>I like supermarkets.</em></li>
              <li>Schedules: <em>The class starts at 8.</em></li>
            </ul>
          </div>
          <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '1rem' }}>
            <h4 style={{ color: '#065f46', marginBottom: '0.75rem', fontSize: '1rem' }}>🔄 Present Continuous</h4>
            <ul style={{ paddingLeft: '1rem', fontSize: '0.88rem', lineHeight: 1.8 }}>
              <li>Happening RIGHT NOW: <em>Look! She is wearing a hat.</em></li>
              <li>Temporary situations: <em>I'm staying at a hotel.</em></li>
              <li>Signal words: <strong>now, at the moment, look!</strong></li>
              <li>Future plans: <em>We are meeting tomorrow.</em></li>
            </ul>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="tense-table">
            <thead>
              <tr><th>Form</th><th>Positive</th><th>Negative</th><th>Question</th></tr>
            </thead>
            <tbody>
              <tr><td>P. Simple (I/You/We/They)</td><td>I <strong>like</strong></td><td>I <strong>don't like</strong></td><td><strong>Do</strong> you like?</td></tr>
              <tr><td>P. Simple (He/She/It)</td><td>She <strong>takes</strong></td><td>She <strong>doesn't take</strong></td><td><strong>Does</strong> she take?</td></tr>
              <tr><td>P. Continuous (all)</td><td>He <strong>is wearing</strong></td><td>He <strong>isn't wearing</strong></td><td><strong>Is</strong> he wearing?</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rule-box red">
          <strong>⚠️ WATCH OUT — Stative Verbs:</strong> Some verbs are NEVER used in continuous form: <em>have (own), like, love, hate, know, believe, understand, want, need, seem</em>. We say <em>"He has a store"</em> NOT <em>"He is having a store"</em>.
        </div>

        <div className="example-row">
          <div className="example-box correct"><div className="label">✓ Correct</div>She <strong>doesn't wear</strong> her uniform. (habit)</div>
          <div className="example-box wrong"><div className="label">✗ Wrong</div>She <strong>isn't wearing</strong> her uniform at the moment... wait, this IS correct if she's not wearing it right now! Check context.</div>
        </div>
      </div>

      {/* PAST SIMPLE vs PAST CONTINUOUS */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">⏪</div>
          <div>
            <div className="card-title">Past Simple vs. Past Continuous</div>
            <div className="card-subtitle">Completed actions vs. ongoing actions in the past</div>
          </div>
        </div>
        <span className="theory-tag grammar">Grammar</span>

        <div className="rule-box">
          <strong>The Classic Pattern:</strong> Use Past Continuous for the longer, ongoing background action, and Past Simple for the shorter action that interrupted it.
          <br /><br />
          <em>I was <strong>sitting</strong> in a café [ongoing] when you <strong>called</strong> [interruption].</em>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
          <div style={{ background: '#fef3c7', borderRadius: 12, padding: '1rem' }}>
            <h4 style={{ color: '#92400e', marginBottom: '0.75rem', fontSize: '1rem' }}>Past Simple</h4>
            <ul style={{ paddingLeft: '1rem', fontSize: '0.88rem', lineHeight: 1.8 }}>
              <li>Completed past action</li>
              <li>Facts about the past</li>
              <li>Irregular verbs: go→went, meet→met, cost→cost, sit→sat</li>
              <li>Signal: <em>yesterday, in 2003, last year</em></li>
            </ul>
          </div>
          <div style={{ background: '#fce7f3', borderRadius: 12, padding: '1rem' }}>
            <h4 style={{ color: '#831843', marginBottom: '0.75rem', fontSize: '1rem' }}>Past Continuous</h4>
            <ul style={{ paddingLeft: '1rem', fontSize: '0.88rem', lineHeight: 1.8 }}>
              <li>Ongoing action in the past</li>
              <li>Background scene</li>
              <li>Form: was/were + verb-ing</li>
              <li>Signal: <em>while, when (start of clause)</em></li>
            </ul>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="tense-table">
            <thead>
              <tr><th>Sentence</th><th>Past Simple</th><th>Past Continuous</th></tr>
            </thead>
            <tbody>
              <tr><td>I met a friend while doing shopping.</td><td>met</td><td>was doing</td></tr>
              <tr><td>I sat in a café when you called.</td><td>called</td><td>was sitting</td></tr>
              <tr><td>Ann waited for me when I arrived.</td><td>arrived</td><td>was waiting</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* USED TO / WOULD */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">🔁</div>
          <div>
            <div className="card-title">Used To & Would — Past Habits</div>
            <div className="card-subtitle">Expressing things we did regularly in the past but no longer do</div>
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
              <tr><td>Example (habit)</td><td>I used to play football.</td><td>I would play football.</td></tr>
              <tr><td>Example (state)</td><td>I used to live in Bogotá.</td><td>❌ I would live in Bogotá. (WRONG)</td></tr>
              <tr><td>Negative</td><td>didn't use to / used not to</td><td>wouldn't</td></tr>
              <tr><td>Question</td><td>Did you use to…?</td><td>Would you…? (unusual)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rule-box gold">
          <strong>🔑 Key Rule:</strong> If the sentence is about a <em>state</em> (living somewhere, having something, liking something), you MUST use <strong>used to</strong>, NOT would.<br />
          If both are possible (repeated action), both are correct — that's why "Both are correct" is sometimes an answer!
        </div>

        <Accordion title="📝 Fill-in-the-Blank Examples" icon="✏️">
          <ul style={{ lineHeight: 2, paddingLeft: '1rem' }}>
            <li>She <strong>used to live</strong> in Bogotá before moving to Barranquilla. (state → only used to)</li>
            <li>My brother <strong>didn't use to play</strong> video games before he got a console.</li>
            <li>We <strong>used to visit</strong> our grandparents every Christmas. (could also be "would visit")</li>
            <li>Mr. García <strong>used to teach</strong> at a different school. (state/fact → used to)</li>
            <li>Every evening, my grandfather <strong>would sit</strong> / <strong>used to sit</strong> on the porch. (Both correct!)</li>
          </ul>
        </Accordion>
      </div>

      {/* READING COMPREHENSION */}
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

        <Accordion title="🎯 Main Purpose / Writer's Aim" icon="🎯">
          <p>These questions ask: <em>"What is the writer trying to do?"</em></p>
          <ul style={{ paddingLeft: '1rem', lineHeight: 1.8, marginTop: '0.5rem' }}>
            <li><strong>Inform</strong> = give facts, teach something</li>
            <li><strong>Entertain</strong> = tell a story for enjoyment</li>
            <li><strong>Persuade</strong> = convince you of something</li>
            <li><strong>Describe</strong> = paint a picture with words</li>
          </ul>
          <div className="rule-box green" style={{ marginTop: '0.75rem' }}>
            <strong>Tip:</strong> Look at the whole text — not just one paragraph. Ask yourself: <em>Is the writer mostly teaching me facts? Telling a story? Arguing a point?</em> The overall structure reveals the purpose.
          </div>
        </Accordion>

        <Accordion title="🔍 Specific Detail Questions" icon="🔍">
          <p>These questions ask you to find exact information stated in the text. Strategy:</p>
          <ul style={{ paddingLeft: '1rem', lineHeight: 1.8, marginTop: '0.5rem' }}>
            <li>Read the question carefully — underline key words</li>
            <li>Go back to the text and scan for those key words</li>
            <li>Read the surrounding sentences, not just the one with the key word</li>
            <li>Answer in your own words, but stay close to what the text says</li>
          </ul>
          <div className="rule-box" style={{ marginTop: '0.5rem' }}>
            <strong>Example:</strong> "What obstacles did Marie Curie face?" → Scan for words like <em>obstacle, challenge, difficult, not allowed, poor</em> → Find: women banned from university in Poland, poverty in Paris.
          </div>
        </Accordion>

        <Accordion title="💭 Inference & Open Questions" icon="💭">
          <p>Open questions ask you to connect ideas and give your interpretation. The answer is not always word-for-word in the text — you must think.</p>
          <div className="rule-box" style={{ marginTop: '0.5rem' }}>
            <strong>Strategy for open answers:</strong><br />
            1. Give a direct answer to the question.<br />
            2. Quote or reference specific details from the text.<br />
            3. Explain the connection. Write at least 2–3 sentences.
          </div>
          <ul style={{ paddingLeft: '1rem', lineHeight: 1.8, marginTop: '0.75rem' }}>
            <li>Never just copy a sentence from the text — show that you understood it</li>
            <li>Use signal words: <em>because, therefore, this shows that, for example, as a result</em></li>
            <li>If the question says "Give two examples," make sure you give exactly two</li>
          </ul>
        </Accordion>

        <Accordion title="✍️ Writing a Complete Answer" icon="✍️">
          <p>A complete answer to a reading question usually follows this structure:</p>
          <div className="rule-box green" style={{ marginTop: '0.5rem' }}>
            <strong>Model structure:</strong><br /><br />
            <em>Question: "How did Marie Curie show determination?"</em><br /><br />
            <strong>Answer:</strong> "Marie Curie showed determination in several ways. First, even though women were not allowed to attend university in Poland, she moved to Paris alone and lived in poverty to pursue her studies. Later, after her husband Pierre died, she did not give up — she continued her research and went on to win a second Nobel Prize. These examples show that obstacles only made her stronger."
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.88rem', color: 'var(--gray-600)' }}>
            Notice: direct answer → specific examples → conclusion. This structure works for any reading comprehension question.
          </p>
        </Accordion>
      </div>

      {/* BIBLICAL WORLDVIEW */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">✝️</div>
          <div>
            <div className="card-title">Biblical Worldview Integration</div>
            <div className="card-subtitle">1 John 2:17 & Matthew 5:42 — Key verses for the exam</div>
          </div>
        </div>
        <span className="theory-tag biblical">Biblical Integration</span>

        <div className="verse-card">
          <div className="verse-text">
            "The world and its desires pass away, but whoever does the will of God lives forever."
          </div>
          <div className="verse-ref">— 1 John 2:17 (NIV)</div>
          <div className="verse-explanation">
            <strong>What does this mean for a young person today?</strong><br />
            John is writing to believers warning them not to love the world (materialism, popularity, pleasure-seeking) over God. The "world" here refers to temporary things — fashion, fame, money, status. These desires are constantly changing and ultimately empty.<br /><br />
            <strong>Application:</strong> Clinging to worldly things (needing the latest phone, obsessing over social media likes, living for popularity) is useless because they pass away. But living according to God's will — being kind, honest, generous, faithful — has eternal value. A young person who understands this will make choices based on what truly lasts.
          </div>
        </div>

        <div className="verse-card" style={{ marginTop: '1rem' }}>
          <div className="verse-text">
            "Give to the one who asks you, and do not turn away from the one who wants to borrow from you."
          </div>
          <div className="verse-ref">— Matthew 5:42 (NIV)</div>
          <div className="verse-explanation">
            <strong>Does Matthew 5:42 agree with hoarding wealth?</strong><br />
            <strong>NO.</strong> This verse is part of Jesus' Sermon on the Mount, where He calls His followers to a radical generosity that goes against the world's logic. The world says: accumulate, protect your resources, give only when it benefits you. Jesus says: give freely, lend without expecting repayment.<br /><br />
            <strong>The contrast:</strong> While the current culture encourages people to build brands, collect followers, and accumulate wealth, Matthew 5:42 calls us to open-handedness. True generosity reflects God's character — He gave His own Son. Christians are called to mirror that giving spirit in everyday life.
          </div>
        </div>

        <div className="rule-box gold">
          <strong>📝 Exam Strategy for Biblical Questions:</strong> Always connect the verse to <em>specific actions</em>. Don't just say "be good." Show HOW the verse applies: What would a student who follows this verse do differently at school? At home? On social media?
        </div>
      </div>

      {/* PAST TENSE WRITING */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">✍️</div>
          <div>
            <div className="card-title">Writing About the Past</div>
            <div className="card-subtitle">Using past tenses in narrative writing</div>
          </div>
        </div>
        <span className="theory-tag grammar">Grammar + Writing</span>

        <p style={{ marginBottom: '1rem' }}>When you write about what you did (e.g., Easter break), use a mix of past tenses to make your writing rich and natural:</p>

        <div className="rule-box green">
          <strong>Model Answer:</strong><br /><br />
          "During Easter break, I <strong>visited</strong> my grandparents in Santa Marta. The weather <strong>was</strong> beautiful. While my cousin <strong>was swimming</strong> in the pool, I <strong>read</strong> a book by the hammock. On Saturday, we <strong>went</strong> to the beach. I <strong>had</strong> never seen such clear water! We <strong>were playing</strong> volleyball when it <strong>started</strong> to rain, so we <strong>ran</strong> inside and <strong>ate</strong> fried fish instead."
        </div>

        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
          Notice: Past Simple for completed actions, Past Continuous for background or interrupted actions. Include specific details — where, what, who with. Use time words: <em>while, when, after, before, then, finally</em>.
        </p>
      </div>
    </div>
  )
}
