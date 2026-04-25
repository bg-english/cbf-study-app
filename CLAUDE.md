# CBF Study App — CLAUDE.md

## Project Overview

Web app for **8th Grade Language Arts** at Colegio Boston Flexible (CBF), Barranquilla, Colombia. Built with React + Vite. Deployed via GitHub Pages from the `docs/` folder on the `main` branch.

**Live URL:** https://bg-english.github.io/cbf-study-app/
**Repo:** https://github.com/bg-english/cbf-study-app

---

## Tech Stack

- **Framework:** React 19 + Vite 8
- **PDF:** jsPDF + jsPDF-autotable
- **Notifications:** Telegram Bot API (via `fetch`)
- **Deployment:** GitHub Pages — served from `docs/` folder on `main` branch (no CI/CD workflow)
- **Styling:** Plain CSS with CSS variables (no Tailwind, no UI library)

---

## Build & Deploy

```bash
# Development
npm run dev

# Production build (always use this exact command — bakes in the Telegram credentials)
VITE_TELEGRAM_BOT_TOKEN="..." VITE_TELEGRAM_CHAT_ID="..." ./node_modules/.bin/vite build

# After building, commit docs/ and push — that's the deploy
git add docs/ && git commit -m "deploy: ..." && git push
```

**Important:** The build output goes to `docs/` (not `dist/`). This is configured in `vite.config.js` via `build: { outDir: 'docs' }`. Never change this back to `dist/`.

The Telegram credentials are baked into the JS bundle at build time (VITE_ prefix). They must be passed as environment variables on every build. There is no `.env` file committed to the repo.

---

## App Structure

```
src/
  App.jsx        — Login screen + navigation shell
  Theory.jsx     — Grammar reference (accordion sections)
  Practice.jsx   — 5 practice modes: MC, Fill, Reading, Flashcards, Matching
  Workshop.jsx   — Graded 5-part final workshop + PDF + Telegram send
  index.css      — All styles (CSS variables, components)
```

### App.jsx
- **Login gate:** Students must enter Full Name + School Email to access the app.
- **Email whitelist:** `ALLOWED_EMAILS` Set — only registered students from 8th Blue and 8th Red, plus the teacher (`edoardo.ortiz77@gmail.com`), can log in.
- **Login notification:** On successful login, sends a Telegram message to the teacher with student name, email, and timestamp.
- Passes `studentName` and `studentEmail` as props to `<Workshop />`.

### Theory.jsx
- Read-only reference material. Accordion-based sections.
- Covers: Vocabulary, Present Tenses, Past Tenses, Used To/Would, Reading Skills, Biblical Worldview, Writing.
- **No exam content.** All example sentences are original — not taken from the exam.

### Practice.jsx
- **Multiple Choice (10 questions):** Grammar + biblical — original sentences.
- **Fill in the Blank (6 questions):** Used To and Past tenses — original sentences.
- **Reading (📖):** Text "Your Brain on Video Games" — 4 MC + 1 open response with model answer.
- **Flashcards (10 cards):** Key grammar rules and concepts.
- **Matching Game (6 pairs):** Grammar concepts matching.
- **No exam content.** All questions use original sentences, not taken from the exam.

### Workshop.jsx
- 5 graded sections: Present Tenses, Past Tenses, Used To, Reading (Marie Curie), Biblical Worldview.
- Accepts `studentName` and `studentEmail` as props (from login — no name input inside the workshop).
- **On submit:** Auto-generates PDF and sends it to teacher via Telegram immediately.
- Student sees a "Download My Copy" button; teacher gets the PDF automatically.
- If the send fails, a "Resend to Teacher" button appears.
- **Reading passage:** Original text about Marie Curie (not from any exam).
- **No exam content.** All grammar questions use original sentences.

---

## Telegram Integration

- **Bot Token:** stored as `VITE_TELEGRAM_BOT_TOKEN` env var (baked into build)
- **Chat ID:** stored as `VITE_TELEGRAM_CHAT_ID` env var (baked into build)
- **Login event:** `sendMessage` — plain text with student name, email, date
- **Workshop submit:** `sendDocument` — sends the corrected PDF as a file attachment

---

## Content Rules — CRITICAL

The exam file is at:
`C:/Users/Usuario/Desktop/EVALUACIONES FINALES/LANGUAGE ARTS 8TH KEY/LANGUAGE ARTS 8TH FINAL EXAM DEF.docx.md`

**NEVER use content from the exam in the app.** This includes:
- Exact sentences from the grammar sections (present/past tenses, used to)
- The same question prompts for biblical reflection
- The writing prompt about "Easter break"
- The Jacques Cousteau reading text or its questions
- Any multiple choice options that mirror the exam

The topics covered (present tenses, past tenses, used to, 1 John 2:17, Matthew 5:42, Marie Curie reading) are the study themes — that is intentional. But all practice sentences and questions must be **original, not copied from the exam**.

---

## Student Roster

**8th Blue (21 students)** and **8th Red (21 students)** — emails in the `ALLOWED_EMAILS` set in `App.jsx`.
Teacher access: `edoardo.ortiz77@gmail.com`

To add or remove a student, edit the `ALLOWED_EMAILS` set in `src/App.jsx`, rebuild, and push.

---

## Adding Content / Making Changes

When adding new practice questions or workshop sections:
1. Read the exam file first to verify the new content does NOT match any exam question.
2. Build with the full env var command (see Build section above).
3. Commit `src/` changes AND the updated `docs/` folder together.

When modifying the student roster:
1. Edit `ALLOWED_EMAILS` in `src/App.jsx`.
2. Rebuild and push `docs/`.
