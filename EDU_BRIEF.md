# EDU_BRIEF.md
## MacroSnaps Education Platform (macedu)
### Living brief -- updated Session 38

---

## Project context

Next.js 16 App Router, statically exported, Cloudflare Pages. Live at macroeconomics.education. Repo: https://github.com/ralphlazar/macedu. Local: `/Users/lisaswerling/RALPH/AI/macedu`. Ralph is non-technical; Claude writes all code. UK English throughout; no em dashes, no long hyphens (these reveal AI writing).

**`sync_edu.py` lives in the macrosnaps repo** (`/Users/lisaswerling/RALPH/AI/macrosnaps/sync_edu.py`), not in macedu.

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
- **EDU_BRIEF.md updated at every session close** -- always without being asked.
- **Python is invoked as `python3` on this machine.** Never `python`.
- **Static export preview:** `npx serve@latest out` -- not `npm run start` (which errors with output: export).
- **Ralph uploads files on request.** When Claude needs to inspect a repo file, ask Ralph to upload it.
- **Always split bash commands from server-start commands.** Run scripts (python3, git) in one step; npm run build + npx serve in a separate step in a new terminal. Never chain a server start onto a script run in one bash block.

---

## Product philosophy (NON-NEGOTIABLE)

**This platform is the opposite of a dry textbook.** It must feel constantly fresh, alive, and full of humanity. Every design decision should reinforce the feeling of being wired into the live global economy. The tone is confident, wry, and on the student's side -- never municipal, never bureaucratic, never worthy. If it feels like a government website or a school intranet, something has gone wrong.

**The Bloomberg principle:** Students should feel like they are looking at a live terminal, not reading a static resource.

**Less is more (NON-NEGOTIABLE).** Every element on every page must earn its place. When in doubt, remove it.

**No AI-generated writing.** All copy must read as if written by an experienced economics teacher. No double hyphens, no long hyphens (em dashes), no hedging.

**Copy discipline (NON-NEGOTIABLE).** Every word is load-bearing. These rules apply across all content on the platform:
- No synonyms used as padding. Pick one formulation and use it.
- No exam-board throat-clearing.
- No hedging on definitions.
- No wasted openers.
- Compression signals confidence. Fluff signals the opposite.
- **No em dashes or long hyphens anywhere. Ever. Use a regular hyphen (-) or restructure the sentence.**

---

## macedu v2 -- planned redesign (Session 39)

**Decision made Session 38.** The current teacher/student split model is being replaced with a student-only AI coaching product. The v2 concept was prototyped as an interactive mockup and approved.

**Core concept:**
- Student-only. No teacher role, no `?t=1` mechanic.
- The primary unit is a **question pegged to a live metric**, not a metric/country card.
- The chart is context. The coach is the product.
- Four-phase coaching loop: **Describe - Explain - Apply - Evaluate** (maps to AQA AO1/AO2/AO3).
- Session anchor: exam-style question (e.g. "Why has UK inflation fallen since 2022?") with a live chart as evidence.
- Live data is the USP -- no revision guide can ask a question about data that updated this week.

**What stays from v1:**
- Data pipeline (`sync_edu.py`, `metrics.js`) -- unchanged.
- Chart components (Recharts, sparklines) -- reused.
- Glossary -- carried forward.
- Fonts, colour palette (orange `#F0843C` as primary accent, warm off-white `#f0ede8` background, dark navy coach panel `#0c1428`).

**What is new:**
- Session UI (question anchor + chart + coaching conversation, similar architecture to polisnaps).
- Prompt architecture (`buildPrompt.js` style, coach voice tuned to economics).
- Landing page (student-only, question/topic picker rather than metric/country grid).
- API route (Anthropic proxy, same pattern as polisnaps).
- No teacher homepage, no lesson overlay, no weather icon exercise (may return later).

**Build approach:** New repo or clean branch. Not a patch of v1. Decide at Session 39 start.

---

## v1 architecture (live, unchanged until v2 ships)

**36 cards = 6 metrics x 6 countries.**

**Layer 1 (Snapshot card):** Dark navy. Flag, country name, metric label, large value, 3-bullet blurb, chart. Cyan throb on `~Nd`. AQA ref suppressed for AP. DXY callout on US exchange rates only.

**Layer 2 (Lesson overlay):** Teacher: 4-beat spine. Student direct: 3-beat spine. Student tasked: weather icon + questions only. Share button encodes `?t=1`.

**Weather icon exercise:** Student picks sunny/cloudy/stormy. Correct icon gets green ring. `correctIcon` and `weatherReason` from `sync_edu.py`.

**Student mode detection:**
- `?t=1` = tasked view
- No params = direct view
- Lives in `StudentLessonClient.js`

**URL structure:**
```
/                                              landing page (role gate + curriculum picker)
/teacher/[curriculum]                          teacher homepage
/teacher/[curriculum]/[metric]/[country]       teacher lesson page
/student/[curriculum]                          student homepage
/student/[curriculum]/[metric]/[country]       student lesson page
/glossary/[curriculum]                         curriculum glossary index
/glossary/[curriculum]/[term]                  canonical glossary term route
/about                                         about page
```
Live curriculum slugs: `alevel`, `ap-economics`

**Metric slugs:** `inflation`, `unemployment`, `gdp`, `interest-rates`, `exchange-rates`, `trade`
**Country slugs:** `uk`, `us`, `eurozone`, `china`, `japan`, `brazil`
**Colours:** Teacher `#378ADD` (blue), Student `#F0843C` (orange), Cyan `#00e5ff`, Green `#2e9e5b`

---

## Pulse/ping animations

- **FramingHeader.js** (teacher): blue ping. Core `#0C447C`, ring `#85B7EB`. 1.4s.
- **StudentFramingHeader.js** (student): orange ping. Core `#b45309`, ring `#fbbf24`. 1.4s.
- **StudentHomePage.js** stamp (0-1d): orange ping.
- **LandingPage.js**: alternating blue/orange ping. 5.6s cycle.
- **SnapshotCard.js** `~Nd` text: cyan throb.
- **StudentHomePage.js** age stamps: cyan throb.

---

## Landing page (v1)

Role gate first, curriculum picker second. "I'm revising" (orange) / "I'm teaching" (blue).

Headline: "Live global data. Wired to your syllabus."
Subhead: "Updated automatically. No textbook lag."

`lastUpdated` from `metrics.js`. Format: "Updated 2 April 2026".

---

## About page

`/about` -- three sections: How it works, Who built this (Ralph Lazar / MacroSnaps), Contact (Formspree AJAX, `https://formspree.io/f/xaqldbwr`).

---

## Key files

| File | Owner | Notes |
|------|-------|-------|
| `app/data/metrics.js` | Pipeline | Written by `sync_edu.py`. Exports `metrics` and `lastUpdated`. |
| `app/data/aqa-alevel.js` | Hand-edited | Lesson overlay content for AQA A-Level. |
| `app/data/ap-economics.js` | Hand-edited | Lesson overlay content for AP Economics. 5 tiles. US English, FRQ register. |
| `app/data/glossary.js` | Hand-edited | 155 terms. AQA A-Level. UK English. |
| `app/data/glossary-ap.js` | Generated | 134 terms. AP Economics. US English. |
| `app/components/SnapshotCard.js` | Shared | curriculum prop, AP_METRIC_DESCRIPTORS, blurbAp/displayBlurb, aqaRef conditional. |
| `app/components/LessonOverlay.js` | Shared | WeatherBeat, share button, correctIcon + weatherReason. |
| `app/components/StudentLessonClient.js` | Student | Passes curriculum to SnapshotCard. |
| `app/components/FramingHeader.js` | Teacher | Blue ping + typewriter. |
| `app/components/StudentFramingHeader.js` | Student | Orange ping + typewriter. |
| `app/components/TeacherHomePage.js` | Teacher | Navy panel, dropdowns, stats, CURRICULUM_LABELS. |
| `app/components/StudentHomePage.js` | Student | Topic tiles, live strip, glossary footer. Curriculum-aware. |
| `app/components/LandingPage.js` | Shared | Role gate, curriculum picker, AP tile live, updated date. |
| `app/components/GlossaryTerm.js` | Shared | Tooltip, X button, mobile-safe. |
| `app/components/GlossaryIndexClient.js` | Shared | Curriculum-aware index. |
| `app/components/Header.js` | Shared | Accepts `curriculum` prop. Glossary link curriculum-aware. |
| `app/components/Footer.js` | Shared | Slim bar. Disclaimer + MacroSnaps + About link. |
| `app/components/ContactForm.js` | Shared | AJAX Formspree form. Inline success message. |
| `app/utils/wrapGlossaryTerms.js` | Shared | WRAP_BLOCKLIST includes `dxy`. |
| `app/utils/glossaryHref.js` | Shared | `glossaryHref(slug, curriculum)` and `glossaryIndexHref(curriculum)`. |
| `EDU_BRIEF.md` | Hand-edited | Updated every session. |

---

## Pipeline boundary (NON-NEGOTIABLE)

`metrics.js` is the only file the pipeline writes. No tooling spans both repos.

---

## sync_edu.py

Generates `blurb` (AQA, UK English) and `blurbAp` (AP, US English) per metric/country. 72 cache entries total.

**Minor cleanup needed:** `BLURB_SYSTEM_AP` appears twice in `sync_edu.py`. Remove duplicate when next editing.

---

## Session history

| Session | Summary |
|---------|---------|
| 1-14 | Iterative build of old architecture. |
| 15 | Student lesson page. Weather exercise. |
| 16 | Header redesign. Various fixes. |
| 17 | Blank-slate rewrite. New architecture. 78 static pages. |
| 18 | Full visual design pass. |
| 19 | UI session. 3-bullet rule formalised. Numbered circle system. aqa-alevel.js rewrite. |
| 20 | Glossary planning. 106 terms generated. Copy discipline rules. |
| 21 | Glossary integration. GlossaryTerm.js tooltip. wrapGlossaryTerms.js. |
| 22 | AP Economics confirmed. 30 missing terms added (now 136). sync_edu.py rewritten. |
| 23 | Landing page curriculum picker. SnapshotCard cyan throb. |
| 24 | Glossary index + term pages. Header Glossary link. FX 5% move filter. |
| 25 | glossaryHref.js utility. curriculum param dormant. |
| 26 | Student fork. Role gate. StudentHomePage. LessonOverlay rewrite. |
| 27 | Glossary redesign. 7 groups. What/How/So what? labels. 136 entries rewritten. |
| 28 | MACRO wordmark. Footer. Ping animations. FramingHeader typewriter. |
| 29 | Pipeline audit. CHN/BRA unemployment sparklines fixed. 35/36 live. |
| 30 | Mobile/UX. Ping animations site-wide. Student homepage restructure. DXY callout. |
| 31 | Weather icon correct answer + weatherReason reveal. |
| 32 | Landing page back arrow bug fix. |
| 33 | lastUpdated added to pipeline and landing page. |
| 34 | AP Economics sprint (Phases 1-3). ap-economics.js (5 tiles, US English, FRQ register). Curriculum-aware lesson pages. SnapshotCard AP descriptors + blurbAp. Pipeline: BLURB_SYSTEM_AP, 36 AP blurbs generated. LandingPage AP tile live. 290 static pages. Phase 4 (glossary) deferred. |
| 35 | Glossary Phase 4 (partial). curricula field added to all 155 entries. 18 new entries. /glossary/[curriculum]/[term] route live. glossaryHref.js curriculum-aware. Architecture decision: separate glossary-ap.js per curriculum. 618 static pages. |
| 36 | Bug fixes pre-launch. StudentHomePage copy curriculum-aware. Old /glossary/[term] route deleted. glossary-ap.js content planned: 6-part split strategy agreed. |
| 37 | AP glossary complete: glossary-ap.js (134 terms, 7 groups, US English, AP FRQ register). Curriculum-aware glossary index. GlossaryIndexClient curriculum-aware. About page live. Footer updated. Password gate removed. Site is live and open. 445 static pages. |
| 38 | Product strategy session. Decision: macedu v2 to be rebuilt as student-only AI coaching product. Teacher/student split dropped. New primary unit: exam question pegged to live metric, four-phase coaching loop (Describe/Explain/Apply/Evaluate). Interactive mockup built and approved. Build deferred to Session 39. |

---

## To-do list

- **macedu v2 rebuild** -- Session 39. Student-only coaching product. See "macedu v2 -- planned redesign" section above.
- **CHN interest-rates sparkline:** No sheet data yet. Will populate automatically when added.
- **AP Fiscal Policy tile:** Deferred. Needs MacroSnaps monthly government debt series.
- **BLURB_SYSTEM_AP deduplication:** Minor. Appears twice in sync_edu.py. Remove when next editing.
- **Glossary curriculum filtering:** Deferred until third curriculum exists.
- **Next curriculum:** AQA GCSE likely next candidate after v2 stable.
