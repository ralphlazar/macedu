# EDU_BRIEF.md
## MacroSnaps Education Platform (macedu)
### Living brief — updated Session 21

---

## Project context

Next.js 16 App Router, statically exported, Cloudflare Pages. Live at macroeconomics.education. Repo: https://github.com/ralphlazar/macedu. Local: `/Users/lisaswerling/RALPH/AI/macedu`. Ralph is non-technical; Claude writes all code. UK English throughout; no em dashes.

---

## Global workflow rules (NON-NEGOTIABLE)

These apply in every session without being asked:

- **Scripts always download to `~/Downloads/`.** Never write scripts to the repo directly.
- **Run instructions always use the full repo path.** Always `cd /Users/lisaswerling/RALPH/AI/macedu` before any command.
- **Copy commands always use full paths.** When a downloaded file needs to live in the repo, the bash copy command must include the full destination path. Example: `cp ~/Downloads/GlossaryTerm.js /Users/lisaswerling/RALPH/AI/macedu/app/components/GlossaryTerm.js`
- **URLs are always rendered as clickable links.** Never plain text URLs. Example: [http://localhost:3000](http://localhost:3000)
- **Always mockup before building** for significant UI changes. Explicit approval required before any code is written.
- **Python patch scripts only** for all file writes. Never bash heredocs (heredocs mangle JSX).
- **Patch scripts are disposable.** Run once then deleted. Never committed.
- **Emoji written directly in Python source.** Never as Unicode escape sequences.
- **Local preview before any git push.** Changes batched locally before deploying.
- **EDU_BRIEF.md updated at every session close** — always without being asked.

---

## Product philosophy (NON-NEGOTIABLE)

**This platform is the opposite of a dry textbook.** It must feel constantly fresh, alive, and full of humanity. Every design decision should reinforce the feeling of being wired into the live global economy. The tone is confident, wry, and on the teacher's side — never municipal, never bureaucratic, never worthy. If it feels like a government website or a school intranet, something has gone wrong.

**The Bloomberg principle:** Teachers and students should feel like they are looking at a live terminal, not reading a static resource.

**No prose anywhere.** All content is 3 bullet points. This is a USP and a design rule enforced across the entire site.

**No AI-generated writing.** All copy must read as if written by an experienced A-level economics teacher. No double hyphens, no "on the one hand / on the other hand" boilerplate, no hedging.

**Copy discipline (NON-NEGOTIABLE).** Every word is load-bearing. These rules apply across all content on the platform -- blurbs, questions, prompts, glossary definitions, UI labels, everything:
- No synonyms used as padding. Pick one formulation and use it.
- No exam-board throat-clearing. ("According to the AQA specification..." -- never.)
- No hedging on definitions. ("Generally speaking..." -- no. It either is or it isn't.)
- No wasted openers. ("It is worth noting that..." -- cut.)
- No double-barrelled definitions. One sentence per Brief-level definition. If it needs two sentences, the definition is wrong.
- Related terms expressed as links, not prose. "See also: demand-pull inflation, cost-push inflation." Not two sentences joining the dots.
- Compression signals confidence. Fluff signals the opposite.

---

## Architecture (locked)

**36 cards = 6 metrics × 6 countries.**

**Layer 1 (Snapshot card):** Dark navy. Flag, country name, metric label (descriptive), large value, 3-bullet blurb (teacher) or "What is this chart telling you?" (student), chart. Release date (cyan number) and AQA ref top-right. No weather icon or direction arrow on the card.

**Layer 2 (Teaching Notes / Your tasks for the lesson):** White box below the card. Teacher sees sections (dot bullet, navy): How to use in class, Chart discussion, Weather icon exercise, Sample questions (with checkboxes), Wider discussion prompts (with checkboxes). Share button encodes selected questions (?q=) and prompts (?d=) in student URL. Student sees: Weather icon exercise (auto-reveal on selection) + selected questions and prompts passed via URL params.

**URL structure (locked):**
```
/                                              landing page (single Get started button)
/teacher/[curriculum]                          teacher homepage
/teacher/[curriculum]/[metric]/[country]       teacher lesson page
/student/[curriculum]/[metric]/[country]       student lesson page (link destination only)
```
MVP curriculum slug: `alevel`
Student homepage (`/student/alevel`) exists as a route but is not linked from anywhere. Teachers generate student links; students only ever land on a specific card.

**Metric slugs:** `inflation`, `unemployment`, `gdp`, `interest-rates`, `exchange-rates`, `trade`
**Country slugs:** `uk`, `us`, `eurozone`, `china`, `japan`, `brazil`
**Colours:** Teacher `#378ADD` (blue), Student `#F0843C` (orange), Pink `#c2185b` (teacher-only content)
**Password:** croc (single password for now — two-password role split is on the to-do list)

---

## Data architecture

### `app/data/metrics.js`
Named export `{ metrics }`. Keyed by metric slug. Written by `sync_edu.py` (pipeline). **Never edited by hand.**

Structure per country entry:
```js
metrics['inflation']['uk'] = {
  flag, name, value, direction, releasedDaysAgo,
  icon,        // editorial: ☀️ ☁️ ⛈️
  reveal,      // editorial: judgment text shown on teacher reveal
  blurb,       // array of 3 strings (UK only currently; others [])
  chartDates,  // array of date strings
  chartSeries, // array of numeric values
}
```

**Blurb rule:** `blurb` is always an array of exactly 3 strings, never a prose string. Empty for non-UK cards until pipeline generates them.

### `app/data/aqa-alevel.js`
Named export `{ lesson }`. Keyed by metric slug. **Edited by hand.** Never touched by pipeline.

**3-bullet rule:** `keyPoints`, `notes` (discussion), and `chartDiscussion` arrays must contain exactly 3 bullets each. No more, no less. Enforced editorially and capped at 3 in the component via `.slice(0, 3)`.

Standard classroomTime across all 6 metrics:
```js
five:   "Discuss what's going on in the chart."
ten:    'Weather Icon exercise. See below.'
twenty: 'Written response to one or more of the questions below.'
```

Structure per concept:
```js
{
  exercisePrompt, exerciseOptions,
  chartDiscussion: [3 strings],   // teacher-only, collapsible
  classroomTime: { five, ten, twenty },
  sampleQuestions: [{ q, keyPoints: [3 strings] }],   // keyPoints teacher-only, collapsible
  discussionPrompts: [{ p, notes: [3 strings] }],     // notes teacher-only, collapsible
}
```

---

## Component map

| File | Role |
|------|------|
| `AnnotatedChart.js` | Recharts chart. Props: `dates, series, target, color, height, dark, chartType, colorBySign`. `chartType='bar'` renders BarChart; `colorBySign` colours bars blue/red by sign. |
| `InflationChart.js` | `<AnnotatedChart dark target={2} />` |
| `UnemploymentChart.js` | `<AnnotatedChart dark />` |
| `GdpChart.js` | `<AnnotatedChart dark chartType='bar' height={150} />` |
| `InterestRatesChart.js` | `<AnnotatedChart dark />` |
| `ExchangeRatesChart.js` | `<AnnotatedChart dark />` |
| `TradeChart.js` | `<AnnotatedChart dark chartType='bar' colorBySign height={180} />` |
| `Header.js` | Role stripe (blue/orange top border) + tinted background by role. Props: `role, homeHref`. Site name links to homeHref for teachers; renders as plain unlinked text for students. |
| `SnapshotCard.js` | Layer 1. Props: `metric, country, data, aqaRef, metricTitle, allCountries, studentMode`. Renders blurb as numbered circle bullet list (white circles on dark card). Empty blurb renders nothing. `studentMode` swaps blurb for "What is this chart telling you?" |
| `LessonOverlay.js` | Layer 2. Props: `metric, country, lessonData, reveal, curriculum, showReveal, studentMode`. Pink disclaimer at top. Chart discussion collapsible (grey circles). Key points per question collapsible (pink circles). Discussion notes per prompt collapsible (pink circles). Share button encodes ?q= and ?d= params. |
| `TeacherHomePage.js` | Dark navy panel with two dropdowns (topic + country) + "Open this card" button. Stats line with pulsing pink "updated today" count. IBM Plex Mono throughout. Light blue-grey page background. |
| `StudentHomePage.js` | Exists but not linked. Student-facing homepage not in use. |
| `PasswordGate.js` | Single password (croc). Wraps all pages via `app/layout.js`. |
| `GlossaryTerm.js` | Inline tooltip component. Dotted underline on matched term. Hover/tap opens white tooltip panel with Brief definition, optional More expansion, and (when glossary pages are built) Full entry link. Close delay of 120ms prevents tooltip disappearing when mousing into it. |

---

## Glossary system

### Utility: `app/utils/wrapGlossaryTerms.js`

Takes a plain string, returns JSX with matched glossary terms wrapped in `<GlossaryTerm>`. Rules:
- Longest terms matched first (so "aggregate demand" is matched before "demand")
- Word-boundary aware (`\b` regex)
- Case-insensitive match, original casing preserved in display
- **First-match-only per string.** If a term appears more than once in a single bullet, question, or prompt, only the first instance is tooltipped. Subsequent instances render as plain text.
- Applied to: blurb bullets (SnapshotCard), chartDiscussion bullets, sample question text, discussion prompt text (LessonOverlay) — teacher and student both.
- **Not applied to:** UI chrome, header, labels, pink "show notes" teacher content (too much noise on detail-heavy collapsed text).

### `GlossaryTerm.js` tooltip behaviour
- Always light (white/cream, dark text) regardless of context (dark card or white overlay).
- Shows: term label (blue uppercase), Brief definition, optional More expansion on click, Full entry link (hidden until glossary pages are built).
- Mobile: tap to open, tap outside to close.

### `app/data/glossary.js`
Named export `{ glossary }`. Array of 106 term objects. **Never edited by hand after generation.**

```js
{
  slug: 'demand-pull-inflation',
  term: 'Demand-pull inflation',
  brief: 'Inflation caused by excess aggregate demand pulling up the price level.',
  more: '...',
  detailed: '...',
  seeAlso: ['cost-push-inflation', 'aggregate-demand', 'output-gap'],
}
```

### Glossary pages (not yet built)
```
/glossary                   full glossary index (A to Z)
/glossary/[term]            individual term page — all 3 levels (Brief, More, Detailed)
```
Pages share the Header but are not role-gated. "Full entry →" link in tooltip is hidden until these pages exist.

### Glossary copy rules
- Brief level: one sentence, present tense, active voice, no hedging.
- No "This occurs when..." openers.
- No exam-board attribution.
- Detailed level may include one common misconception, labelled "Common mistake:" in bold.
- See also links use the term name exactly as it appears in the `term` field.

---

## Numbered circle bullet system

Every set of 3 bullet points across the site uses numbered circles (1, 2, 3) instead of dots. This is a site-wide USP and design rule.

| Context | Circle style |
|---------|-------------|
| Snapshot card blurb | White border, white number, on dark navy |
| Chart discussion | Grey border (`#8099b8`), grey number |
| Key points (questions) | Pink border (`#c2185b`), pink number |
| Discussion notes | Pink border (`#c2185b`), pink number |

Circle spec: 20px diameter, 1.5px border, 50% border-radius, IBM Plex Mono 10px 500 weight number, centred.

---

## Pink = teacher eyes only

All pink text (`#c2185b`) is teacher-only and never visible to students. This is explained once at the top of Teaching Notes: "All pink text is for your eyes only. Your students will not see it."

Pink content:
- Chart discussion bullets (collapsible per section, grey circles)
- Key points under each sample question (collapsible per question, pink circles)
- Discussion notes under each prompt (collapsible per prompt, pink circles)

All pink content is **collapsed by default.** Each item has its own "Show notes ▸ / Hide notes ▾" toggle (Option B: per-item disclosure).

---

## Metric labels on card (hardcoded in SnapshotCard.js)

| Metric | Label |
|--------|-------|
| Inflation | Inflation (year-on-year, %) |
| Unemployment | Unemployment (% of labour force) |
| GDP | GDP growth (year-on-year, %) |
| Interest rates | Policy rate (%) |
| Exchange rates | GBP/USD · EUR/USD · USD/CNY · USD/JPY · USD/BRL · DXY |
| Trade | Current account (% of GDP) |

---

## Route files

| Route | File |
|-------|------|
| `/` | `app/page.js` |
| `/teacher/[curriculum]` | `app/teacher/[curriculum]/page.js` — `homeHref="/"` |
| `/teacher/[curriculum]/[metric]/[country]` | `app/teacher/[curriculum]/[metric]/[country]/page.js` |
| `/student/[curriculum]` | `app/student/[curriculum]/page.js` |
| `/student/[curriculum]/[metric]/[country]` | `app/student/[curriculum]/[metric]/[country]/page.js` |

---

## Typography

- Display/headings: Instrument Serif (loaded via `<link>` in `app/layout.js`)
- Body/UI: IBM Plex Sans / sans-serif
- Data values/labels/numbered circles: IBM Plex Mono

---

## Key technical rules

- **Static export only.** No `cookies()`, no middleware, no server-side features.
- **Python scripts for all file writes.** Never bash heredocs (mangle JSX).
- **`metrics.js` never edited by hand.** Pipeline writes it exclusively.
- **Emoji written directly in Python source.** Never as Unicode escape sequences.
- **Patch scripts are disposable.** Run once, then deleted. Never committed.
- **`app/data/` for data layer; `app/components/` for all components; `app/utils/` for utilities.**
- **Local preview before every push.**
- **Three weather icons only:** ☀️ ☁️ ⛈️
- **Questions and prompts labelled A, B, C (uppercase) throughout.**
- **3 bullets everywhere.** No prose. Enforced in components via `.slice(0, 3)` and documented in `aqa-alevel.js`.
- **No double hyphens.** Use "to" ranges (12 to 18 months) or rewrite the sentence.

---

## Glossary layer (scope)

Macro-only for MVP. 106 platform-relevant terms across 6 topic groups. AQA official subject-specific vocabulary document is the canonical source. Term inclusion rule: technical definitions only — generic words excluded. If a term does not have a definition a student could be asked to reproduce in an exam, it is not in the glossary.

---

## Session history

| Session | Summary |
|---------|---------|
| 1--14 | Iterative build of old architecture. LessonPage, TeacherHomePage, StudentLessonPage built and refined. |
| 15 | Student lesson page. Weather exercise with icon select. |
| 16 | Header redesign. Various fixes. |
| 17 | Blank-slate rewrite. New architecture: two-layer model, new URL structure, new data layer. 78 static pages. Build clean. Deployed. |
| 18 | Full visual design pass. Teacher homepage redesigned. Snapshot card redesigned. Teaching Notes redesigned. Bar charts for GDP and Trade. Header tinted by role. Landing page redesigned. Humour/humanity principle established. |
| 19 | UI session. TeacherHomePage: IBM Plex Mono throughout, dark navy selector panel, pulsing pink "updated today" count. Teaching Notes: chart discussion section added (collapsible, grey circles), key points converted from hints to 3-bullet arrays (collapsible, pink circles), discussion prompts converted to {p, notes} structure (collapsible, pink circles), pink eyes-only disclaimer added, per-item collapsible notes (Option B). aqa-alevel.js: full content rewrite -- no double hyphens, no AI phrasing, teacher voice throughout. Blurbs converted from prose to 3-bullet arrays in metrics.js. Numbered circle bullet system introduced site-wide (white/grey/pink by context). 3-bullet rule formalised as site-wide design principle and USP. |
| 20 | Glossary planning and data generation. Copy discipline rules formalised and added to brief as NON-NEGOTIABLE block. Glossary architecture fully specified: 3-level definitions (Brief/More/Detailed), interaction model, URL structure, data schema. AQA official macro vocabulary fetched and curated to 106 platform-relevant terms across 6 topic groups. 106 entries generated via Claude API (claude-opus-4-5) using 5 few-shot examples. Full Brief-level review pass completed: 3 fixes applied (one "theory that" opener, two em dash violations). `app/data/glossary.js` written and ready. |
| 21 | Glossary integration. `GlossaryTerm.js` tooltip component built: always-light white panel, 120ms close delay (fixes tooltip disappearing on mouse travel), Brief + More levels, Full entry link hidden until glossary pages exist. `wrapGlossaryTerms.js` utility built: longest-match-first, word-boundary aware, first-match-only per string. Wired into SnapshotCard (blurb bullets) and LessonOverlay (chartDiscussion, question text, prompt text -- teacher and student). Pink notes content deliberately excluded from tooltip wiring. Global workflow rules formalised: scripts to Downloads, full paths in all bash commands, clickable URLs always, Header student fix (site name unlinked on student pages) noted as pending. |

---

## To-do list

- **Header fix -- student pages:** Site name in Header renders as plain unlinked text (not a link) on all `/student/` pages. Teachers keep the link to `/`.
- **Glossary index page:** `/glossary` -- A to Z listing of all 106 terms. Brief level shown. Links to individual term pages.
- **Glossary term page:** `/glossary/[term]` -- Full Detailed level. See also links. Shared Header, no role gate. Once built, re-add "Full entry →" link to `GlossaryTerm.js` tooltip.
- **Two-password system:** Teacher password and student password, checked against URL role prefix.
- **AI-generated country-specific questions and prompts:** `sync_edu.py` calls Claude API for each of the 36 cards, generating `{ q, keyPoints: [3 strings] }` and `{ p, notes: [3 strings] }`. Output stored in `metrics.js`.
- **`sync_edu.py` rewrite:** Write `metrics.js` (new format) instead of `edu-data.json`. Blurbs written as arrays of 3 strings. Non-UK blurbs generated via Claude API.
- **Blurbs for all 36 cards:** UK done (6 concepts). Pipeline-based generation for remaining 30 cards, output as `blurb: [3 strings]`.
- **Exchange rate 5% movement filter:** Only include exchange rate entries in feed/stats if currency moved >5%. Logic in `sync_edu.py`.
- **Pipeline fix -- value vs chart last point:** Last element of `chartSeries` must match `value` exactly.
- **Rotating humorous greeting on teacher homepage:** 50 dry/wry lines, Instrument Serif italic.
- **Upcoming curricula:** Cambridge IGCSE, India CBSE (strategic priority at scale).
- **Long-term:** Multilingual expansion, mobile app, data layer API, AI-assisted live assessment.
