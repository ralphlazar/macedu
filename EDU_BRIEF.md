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
- **Copy commands always use full paths.** Example: `cp ~/Downloads/SessionClient.js /Users/lisaswerling/RALPH/AI/macedu/app/session/[question]/SessionClient.js`
- **Bracket folders need quoting in bash.** Dynamic route folders must always be quoted: `"app/session/[question]/"`
- **URLs are always rendered as clickable links.** Never plain text. Example: [http://localhost:3000](http://localhost:3000)
- **Always mockup before building** for significant UI changes. Explicit approval required before code is written.
- **Python patch scripts only** for all file writes. Never bash heredocs (heredocs mangle JSX).
- **Patch scripts are disposable.** Run once then deleted. Never committed.
- **Emoji written directly in Python source.** Never as Unicode escape sequences.
- **Local preview before any git push.** Changes batched locally before deploying.
- **EDU_BRIEF.md updated at every session close** -- always without being asked.
- **Python is invoked as `python3` on this machine.** Never `python`.
- **Ralph uploads files on request.** When Claude needs to inspect a repo file, ask Ralph to upload it.
- **Always split bash commands from server-start commands.** Run scripts (python3, git) in one step; npm run build + serve in a separate step in a new terminal.
- **Next.js 15+ async params.** Dynamic route pages must `await params`.
- **Use raw strings (`r"""..."""`)** in Python patch scripts to avoid escape sequence warnings with JSX.

---

## Product philosophy (NON-NEGOTIABLE)

**The goal is students love this, use this, and tell their friends.** Nothing else matters at this stage.

**The core insight:** No revision guide can ask a question about data that updated this week. That is the product. The live data connection to the exam is the USP -- make it explicit, not implied.

**Student-only. No teacher role.** The teacher/student split added complexity and diluted the product. v2 is built entirely for the student.

**The Bloomberg principle:** Students should feel like they are looking at a live terminal, not reading a static resource. Every session should feel current.

**The coach voice:** Direct, sharp, never sycophantic. Pitched at Year 12/13 (aged 16-18). Sounds like an experienced A-level Economics teacher. Maximum two sentences of feedback per turn. Closing question always on its own line in sky blue (`#64b5f6`). Refer to specific data, real policy decisions, named institutions -- never generic.

**Four phases, always in order:** Describe -- Explain -- Apply -- Evaluate. These map directly to AQA assessment objectives: AO1 (knowledge), AO2 (analysis), AO3 (evaluation). Structure enforced through the prompt, not the UI.

**No AI-sounding writing anywhere.** No em dashes. No hedging. No wasted openers. Copy discipline identical to v1 and polisnaps.

**Less is more.** Every element earns its place.

---

## Colour palette (NON-NEGOTIABLE)

- **Background:** Warm off-white `#f0ede8` (shared across the Snaps family)
- **Cards/surfaces:** White `#ffffff`, border `1.5px solid #e8e4de`
- **Chart panel:** Deep blue-black `#080e1c`
- **Primary accent:** Orange `#F0843C` -- send button, active phase underline, live dot, scorecard
- **Secondary accent:** Sky blue `#64b5f6` -- coach closing question
- **Fonts:** IBM Plex Mono (labels, UI, wordmark, data values) + Instrument Serif (question anchor) + IBM Plex Sans (body, coach text)
- **Input background:** `#08111f`, border `#162035`
- **No black backgrounds.** Blue-black reserved for chart panel only.

---

## Architecture (v2 -- target for Session 39)

**Stack:** Next.js 16 App Router, no TypeScript, no Tailwind. Plain JS objects for styles (inline). Cloudflare Pages for deployment.

**The primary unit** is a session: one exam-style question pegged to one live metric + chart. The student works through four coached phases to build a full answer.

**Layout (locked -- stacked, approved Session 38):**
1. **Topbar** -- wordmark left, curriculum label + LIVE badge right.
2. **Chart panel** (full width, fixed ~200px height, dark blue-black) -- metric value + change top-left, question anchor top-right in Instrument Serif italic, wide time-series chart with annotations (peak label, 2% target line, date axis), live pulsing dot on current value.
3. **Phases bar** (full width, white) -- DESCRIBE / EXPLAIN / APPLY / EVALUATE. Done phases faded orange. Active phase solid orange with bottom underline.
4. **Coaching conversation** (full width, scrollable, off-white) -- coach bubbles dark navy left-aligned, student bubbles orange right-aligned. Closing question in sky blue. Suggestion chips above input row. Full-width text input + orange send button.

**File structure (target):**
```
app/
  page.js                              -- landing page, topic/question picker
  layout.js                            -- root layout, font imports
  globals.css                          -- resets, body background, keyframes
  data/
    questions.js                       -- all session questions + context annotations
    metrics.js                         -- pipeline-owned, live data (carried from v1)
  utils/
    buildPrompt.js                     -- system prompt builder + scorecard prompt
  api/
    chat/
      route.js                         -- server-side Anthropic API proxy
  session/
    [question]/
      page.js                          -- server component, loads question + chart data
      SessionClient.js                 -- client component, full session UI
next.config.js
```

**Dynamic route:** `/session/[question]` -- question slug maps to `id` in `questions.js`.

**API key:** `.env.local` as `ANTHROPIC_API_KEY`. Never committed. Proxied through `app/api/chat/route.js`.

**Model:** `claude-sonnet-4-20250514`. Max tokens: 400 coaching turns, 500 scorecard.

---

## Question library (`app/data/questions.js`)

**Schema:**
```js
{
  id: "inflation-uk-001",
  metric: "inflation",           // maps to metrics.js for live chart data
  country: "uk",
  topic: "monetary-policy",
  topicLabel: "Monetary Policy",
  paper: "Paper 2",
  title: "Why has UK inflation fallen so sharply since 2022?",
  context: "...",                // hidden coach context -- never shown to student
}
```

The `context` field tells the coach what examiners reward, what students typically miss, what the best examples are, what separates a top-band answer. This is the defensible asset.

**Chart data:** Pulled from `metrics.js` by metric + country slug. Session page passes sparkline array + current value to `SessionClient.js` as props.

**Initial question set:** Generate via Claude API (same method as polisnaps essays). Target 4-5 questions per topic area at launch. Cover all six metrics (inflation, unemployment, GDP, interest rates, exchange rates, trade) across UK + at least one other country.

---

## The coaching loop

**Four phases, enforced by system prompt:**

1. **Describe** -- what does the chart show? Trends, turning points, scale. AO1.
2. **Explain** -- why did this happen? Causes, mechanisms. AO2.
3. **Apply** -- use the data in a specific real policy or decision context. AO2/AO3.
4. **Evaluate** -- which argument wins and why? Sustained judgement. AO3.

**Coach response rules:**
- Maximum two sentences of feedback per turn before the question
- First question is always an easy entry point (Describe phase: "what does the chart show?")
- Closing question always on its own line in sky blue
- Correct inaccuracies briefly and redirect -- never ignore a wrong answer
- Refer to specific data values, real policy decisions, named policymakers
- Never sycophantic

**Phase detection:** Scan each coach reply for trigger words to advance the phase indicator. Same approach as polisnaps.

**Session end:** Coach outputs `[SCORECARD_READY]`. Client detects, strips tag, calls scorecard prompt. Scorecard: ratings (Strong / Partial / Weak) for each phase + one "next time" note.

---

## What carries forward from v1

- **Data pipeline** (`sync_edu.py`, `metrics.js`) -- unchanged. No new pipeline work for v2.
- **Chart data** -- sparkline arrays already in `metrics.js`. Session page reads directly.
- **Glossary** -- carried forward as-is.
- **About page** -- carried forward.
- **Fonts, colour palette** -- same as v1.
- **Cloudflare Pages deployment** -- same setup.

## What is new in v2

- Session UI (`SessionClient.js`) -- stacked layout, coaching conversation, phase bar.
- Prompt architecture (`buildPrompt.js`) -- economics coach voice, four-phase structure.
- Question library (`questions.js`) -- replaces the metric/country card model.
- Landing page -- student-only question/topic picker. No role gate.
- API route -- same pattern as polisnaps.
- No teacher homepage, no lesson overlay, no weather icon exercise.

**Build approach:** Clean branch or new repo. Not a patch of v1. Decide at Session 39 start.

---

## Pipeline boundary (NON-NEGOTIABLE)

`metrics.js` is the only file the pipeline writes. This does not change in v2.

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
| 34 | AP Economics sprint (Phases 1-3). ap-economics.js. Curriculum-aware lesson pages. AP blurbs. 290 static pages. |
| 35 | Glossary Phase 4 (partial). curricula field added. 18 new entries. /glossary/[curriculum]/[term] live. 618 static pages. |
| 36 | Bug fixes pre-launch. Old /glossary/[term] route deleted. glossary-ap.js planned. |
| 37 | AP glossary complete (134 terms). About page. Footer. Password removed. Site open. 445 static pages. |
| 38 | Product strategy session. Full rebuild agreed: student-only AI coaching product. Teacher/student split dropped. Primary unit: exam question pegged to live metric chart. Four-phase coaching loop (Describe/Explain/Apply/Evaluate). Stacked layout designed and approved via two interactive mockups. Build starts Session 39. |

---

## To-do list

- **macedu v2 rebuild** -- Session 39. Student-only coaching product. See architecture section.
- **Question library** -- generate initial set via Claude API. 4-5 questions per topic at launch.
- **CHN interest-rates sparkline:** No sheet data yet. Populates automatically when added.
- **AP Fiscal Policy tile:** Deferred. Needs government debt series.
- **BLURB_SYSTEM_AP deduplication:** Minor. Appears twice in sync_edu.py.
- **Glossary curriculum filtering:** Deferred until third curriculum.
