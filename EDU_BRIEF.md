# EDU_BRIEF.md
## MacroSnaps Education Platform (macedu)
### Living brief — updated Session 26

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
- **Python is invoked as `python3` on this machine.** Never `python`.

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

**Layer 1 (Snapshot card):** Dark navy. Flag, country name, metric label (descriptive), large value, 3-bullet blurb (teacher + direct student) or "What is this chart telling you?" (tasked student), chart. `Next release: ~Nd` top-right with Nd in bright cyan (#00e5ff) throbbing at 1.1s. AQA ref below that. No weather icon or direction arrow on the card.

**Layer 2 (Lesson overlay):** Teacher sees: 4-beat vertical spine (chart discussion, weather icon, written response, discussion) with checkboxes on beats 3 and 4. Share button always encodes `?t=1` plus any selected `?q=` and `?d=` params. Direct student sees: 3-beat vertical spine (what the chart shows, weather icon with reveal, exam questions). Tasked student sees: weather icon + teacher-selected questions and prompts only.

**Weather icon exercise:** Editorial judgment, not a quiz. Teacher's icon is their opinion, not a correct answer. Reveal shows icon and judgment text only. No YES!/Nope! feedback, no Try again button.

**Student mode detection (NON-NEGOTIABLE):**
- `?t=1` always present on teacher-generated links (even if no questions selected)
- Direct navigation: no params → rich direct view with blurb bullets
- Tasked navigation: `?t=1` (±`?q=` ±`?d=`) → focused tasked view, no blurb, "What is this chart telling you?" prompt
- Detection lives in `StudentLessonClient.js` (client component wrapping SnapshotCard + LessonOverlay)

**URL structure (locked):**
```
/                                              landing page (role gate + curriculum picker)
/teacher/[curriculum]                          teacher homepage
/teacher/[curriculum]/[metric]/[country]       teacher lesson page
/student/[curriculum]                          student homepage
/student/[curriculum]/[metric]/[country]       student lesson page
/glossary                                      A to Z glossary index
/glossary/[term]                               individual term page
```
MVP curriculum slug: `alevel`

**Metric slugs:** `inflation`, `unemployment`, `gdp`, `interest-rates`, `exchange-rates`, `trade`
**Country slugs:** `uk`, `us`, `eurozone`, `china`, `japan`, `brazil`
**Colours:** Teacher `#378ADD` (blue), Student `#F0843C` (orange), Pink `#c2185b` (teacher-only content), Cyan `#00e5ff` (next release throb)
**Password:** croc (teacher only — student world is open, no password)

---

## Landing page

Role gate first, curriculum picker second. Two cards on load: "I'm revising" (orange) and "I'm teaching" (blue). Clicking a role reveals the curriculum picker with tiles tinted to match the role. Back arrow returns to role picker. Password hint shown under the teacher card only.

Headline: "Live global data. Wired to your syllabus."
Subhead: "Current data, updated on release day."

Teacher tiles link to `/teacher/[curriculum]`. Student tiles link to `/student/[curriculum]`.

**Row 1 — 🇬🇧 United Kingdom (4 tiles):**
- A-Level Economics · AQA ← only live tile
- GCSE Economics · AQA
- Macro · Year 1 · UK
- Macro · Year 2 · UK

**Row 2 — 🇺🇸 United States (3 tiles):**
- AP Economics · College Board
- Macro · Year 1 · US
- Macro · Year 2 · US

**Row 3 — 🌍 International (4 tiles):**
- Cambridge A-Level · CIE
- CBSE Economics · Class 11-12 · 🇮🇳
- IB Economics · IBO
- HSC Economics · NSW · 🇦🇺

---

## Teacher homepage

Dark navy selector panel. Centred curriculum badge at top of panel (country label + curriculum name, IBM Plex Mono throughout). Eyebrow "Today's data is live" centred below badge. Headline "Pick a topic and a country." centred. Two dropdowns (topic + country) + "Open this card →" button. Stats line at 14px IBM Plex Mono: green dot · 36 data points · N updated today (pulsing pink) · N updated this week. Schedule note below in italic mono.

`CURRICULUM_LABELS` map in `TeacherHomePage.js` drives the badge. Currently populated for `alevel` and `ap-economics`.

---

## Student homepage (`/student/alevel`)

Three zones, top to bottom:

**Zone 1 — Moving right now:** 3 dark navy cards showing freshest data points across all metrics × countries. Sorted by `releasedDaysAgo` ascending. Cyan "Today" badge on day-0 entries. Each card links to the student lesson page.

**FX rule on live strip:** Exchange rates get one slot maximum. Only eligible on even calendar days. Best mover wins (highest absolute `movePercent`). Must be >= 1% to qualify. If conditions not met, slot goes to next freshest non-FX entry.

**Zone 2 — Revise by topic:** 6 metric tiles in a 2-column grid. Each shows metric name (orange, IBM Plex Mono), one-line syllabus description, and 6 country flags collapsed. Click a tile to expand country flags as links. Click again to collapse. One tile open at a time.

**Zone 3 — Glossary footer:** "Glossary · 136 terms · Define, Explain, Evaluate →"

---

## Teacher lesson page

**Framing band** (full width, light blue `#eef5fc`): "Your lesson is ready." (Instrument Serif 22px) with subline "30 minutes · built around today's data · share with one click" (IBM Plex Mono 12px, muted).

**Lesson plan box** (white card, constrained to 864px): 4 beats in a horizontal timeline connected by lines. Labels: 1 · 5 min · Chart discussion / 2 · +5 min · Weather icon / 3 · +10 min · Written response / 4 · +10 min · Discussion.

**"Today's data" label** then snapshot card (dark navy, blurb bullets visible).

**Vertical spine** (4 blue numbered dots connected by line): beat content sections in white cards below the snapshot card.

Per-question and per-prompt pink notes are removed. Teacher notes appear as pink left-bordered callouts inside beat cards only when genuinely useful.

---

## Student lesson page

**Framing band** (full width, light orange `#fff4ee`): "This is what's happening right now." (Instrument Serif 22px) with subline showing country + metric + AQA ref (IBM Plex Mono 12px, `#b07040`).

**"Today's data" label** then snapshot card.

**Two modes below the card:**

**Direct mode** (no URL params): 3 orange beats — (1) What this chart is telling you (chart discussion questions), (2) What's your read on this? (weather icon, auto-reveal on click, editorial judgment shown), (3) Exam questions on this data (all questions, subline "These are the types of question you will see in Paper 2", no checkboxes).

**Tasked mode** (`?t=1` present): "Your teacher selected these tasks." indicator. Weather icon beat always shown. Questions beat shown only if `?q=` present. Discussion beat shown only if `?d=` present. Blurb replaced by "What is this chart telling you?" prompt in card.

Glossary footer at bottom of both modes.

---

## Glossary system

### Definition levels (locked)
Three levels, publicly labelled as **Define / Explain / Evaluate** throughout:
- **Define** (was "In short"): one sentence, exam-ready, 2-mark answer
- **Explain** (was "More"): mechanism, causation, 4-6 mark answer
- **Evaluate** (was "Full definition"): judgment, nuance, limitations, common mistakes, A-grade 25-marker content

Tooltip shows Define by default. "Explain →" button expands inline. "Full entry →" links to term page. Evaluate lives on the term page only.

Glossary index shows Define-level only. Term page shows all three levels stacked.

### Utility: `app/utils/glossaryHref.js`

Two exported functions providing a single source of truth for all glossary URLs. Every component that links to a glossary page calls these functions — no component constructs glossary URL strings directly.

```js
glossaryHref(slug, curriculum)       // → /glossary/[slug]
glossaryIndexHref(curriculum)        // → /glossary
```

Both accept curriculum param (currently ignored — used at AP sprint).

### `app/data/glossary.js`
136 terms across 6 topic groups. Schema per entry:
```js
{ term, slug, brief, more, detailed, seeAlso: [slugs], group }
```

### `wrapGlossaryTerms.js`
Utility that wraps matching glossary terms in `<GlossaryTerm>` components. Longest-match-first, word-boundary aware, first-match-only per string. Wired into SnapshotCard (blurb), LessonOverlay (chartDiscussion, question text, prompt text). Pink notes content excluded.

### Routes
| Route | File |
|-------|------|
| `/glossary` | `app/glossary/page.js` — `'use client'` (live search) |
| `/glossary/[term]` | `app/glossary/[term]/page.js` — async params (Next.js 16) |

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
| `Header.js` | Role stripe (blue/orange top border) + tinted background by role. Props: `role, homeHref, showGlossary`. Site name links to homeHref for teachers and on glossary pages; renders as plain unlinked text for students. Glossary link shown when `role !== null` or `showGlossary={true}`. Uses `glossaryIndexHref()`. |
| `SnapshotCard.js` | Layer 1. Props: `metric, country, data, aqaRef, metricTitle, allCountries, studentMode, showBlurb`. Renders blurb as numbered circle bullet list (white circles on dark card). `showBlurb=false` + `studentMode=true` renders "What is this chart telling you?" prompt instead. `nextReleaseLabel()` returns `{ prefix, days }` — days rendered in cyan with throb animation. |
| `LessonOverlay.js` | Layer 2. Props: `metric, country, lessonData, reveal, curriculum, showReveal, studentMode`. Detects direct vs tasked mode via URL params internally. Teacher mode: 4 blue beats, checkboxes on beats 3 and 4, share button always includes `?t=1`. Direct student: 3 orange beats with weather reveal and exam framing. Tasked student: weather + teacher-selected items only. Per-question/per-prompt pink notes removed. |
| `StudentLessonClient.js` | Client wrapper for student lesson page. Reads URL params to detect tasked vs direct mode. Passes `showBlurb={!isTasked}` to SnapshotCard. Detects tasked via `?t=`, `?q=`, or `?d=` params. |
| `TeacherHomePage.js` | Dark navy panel with curriculum badge (centred, IBM Plex Mono), eyebrow and headline centred, two dropdowns (topic + country) + "Open this card" button. Stats line 14px with pulsing pink "updated today" count. IBM Plex Mono throughout. `CURRICULUM_LABELS` map drives badge text. |
| `StudentHomePage.js` | Student homepage. Three zones: live strip (3 freshest entries, FX capped at 1 slot), topic tiles (6 metrics, expand inline for country flags), glossary footer. FX rule: even calendar days only, best mover, >= 1% movePercent. |
| `LandingPage.js` | Client component. Role gate on load ("I'm revising" / "I'm teaching"). Curriculum picker revealed after role selection, tiles tinted to role colour. Back arrow returns to role gate. Password hint under teacher card. |
| `PasswordGate.js` | Single password (croc). Wraps teacher pages only. Student world is open. |
| `GlossaryTerm.js` | Inline tooltip. Dotted underline. Hover opens white panel: term label (blue, mono), Define level, "Explain →" expands More level inline, "Full entry →" links to term page. 120ms close delay. Uses `glossaryHref()`. |

---

## Data architecture

### `app/data/metrics.js`
Named export `{ metrics }`. Keyed by metric slug. Written by `sync_edu.py` (pipeline). **Never edited by hand.**

Structure per country entry:
```js
metrics['inflation']['uk'] = {
  flag, name, value, direction, releasedDaysAgo,
  icon,         // editorial: ☀️ ☁️ ⛈️
  reveal,       // editorial: judgment text shown on teacher/student reveal
  blurb,        // array of 3 strings — generated via Claude API (Haiku) on each release
  chartDates,   // array of date strings
  chartSeries,  // array of numeric values (last point forced to match value)
  movePercent,  // FX only: % move year-on-year; null for non-FX metrics
}
```

**Blurb rule:** Always an array of exactly 3 strings. Generated via Claude API for all 36 cards. Cached in `blurb-cache.json`; regenerated on new release day (FX: daily).

**Exchange rate filter:** `releasedDaysAgo` is set to `null` for FX entries where `abs(movePercent) < 5`. These entries are excluded from teacher homepage stats.

### `app/data/aqa-alevel.js`
Named export `{ lesson }`. Keyed by metric slug. **Edited by hand.** Never touched by pipeline.

**3-bullet rule:** `chartDiscussion` arrays must contain exactly 3 bullets. Enforced editorially and capped at 3 in components via `.slice(0, 3)`.

Structure per concept:
```js
{
  exercisePrompt, exerciseOptions,
  chartDiscussion: [3 strings],
  classroomTime: { five, ten, twenty },
  sampleQuestions: [{ q }],
  discussionPrompts: [{ p }],
}
```

Note: `keyPoints` and per-item `notes` arrays are no longer rendered. They can remain in the data file but are ignored by the component.

---

## Typography

- Display/headings: Instrument Serif (loaded via `<link>` in `app/layout.js`)
- Body/UI: IBM Plex Sans / sans-serif
- Data values/labels/numbered circles/UI mono: IBM Plex Mono

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
- **Python invoked as `python3`.** Never `python`.
- **Next.js 16 async params.** All `page.js` files that use `params` must `await params` before destructuring. Both `generateMetadata` and the page function must be `async`.
- **All glossary URLs constructed via `glossaryHref()` / `glossaryIndexHref()`.** Never hardcode `/glossary/...` strings in components.
- **Teacher-generated student links always include `?t=1`.** Never generate a bare `/student/...` URL from the share button. This distinguishes teacher-sent links from direct student navigation.

---

## Glossary layer (scope)

Macro-only for MVP. 136 platform-relevant terms across 6 topic groups. AQA official subject-specific vocabulary document is the canonical source plus 30 additional terms identified by gap analysis against live lesson content (Session 22). Term inclusion rule: technical definitions only — generic words excluded. If a term does not have a definition a student could be asked to reproduce in an exam, it is not in the glossary.

---

## Multi-curriculum expansion strategy

**Architecture is already curriculum-parameterised.** The `[curriculum]` segment in the URL structure means adding a second curriculum requires no routing changes.

**Curriculum roadmap (in priority order):**

1. **AQA A-Level** — live. MVP curriculum.
2. **AP Economics (USA)** — confirmed next. After A-Level is fully stable.
3. **AQA GCSE** — third curriculum. Bigger market than university, cleaner syllabus anchor. Mostly a content simplification exercise; lesson framing needs rethinking ("What does this mean for households?" not AD/AS machinery).
4. **IB Economics** — globally standardised, 160 countries, huge in US/UK private and international schools. Shares most glossary terms with A-Level.
5. **Cambridge International A-Level (CIE)** — massive in South/Southeast Asia, East Africa, Middle East. ~80% content overlap with AQA A-Level.
6. **CBSE India (Class 11-12)** — strategic priority at scale. 20,000+ schools. Less demanding than A-Level but enormous market. Note: bilingual/Hindi content may be expected eventually.
7. **HSC Economics (NSW, Australia)** — English-language, data-hungry teachers, commercially interesting.
8. **UK/US University Year 1 and Year 2** — UK has no standardised syllabus (problematic); US "Principles" maps well onto AP extension.

**What AP expansion involves:**
- `ap-economics.js` — new lesson content file, same structure as `aqa-alevel.js`. US English, College Board framing.
- Glossary: shared for now. At AP sprint: add `curricula[]` tags to all entries, write ~20 AP-specific terms, migrate routes to `/glossary/[curriculum]/[term]`, wire depth filtering.
- `metrics.js`: shared. Live data feeds are already global.
- `sync_edu.py`: add `curriculum: "ap-economics"` flag to question/prompt generation calls.
- Audit for hardcoded AQA/A-level references in components and replace with curriculum-derived values.
- `CURRICULUM_LABELS` in `TeacherHomePage.js` already has `ap-economics` entry ready.

**Glossary future:** The 3-level definition system (Define/Explain/Evaluate) is designed to become curriculum-aware: GCSE pulls Define, A-Level pulls Explain, undergraduate pulls Evaluate. Same 136 terms, no new data, curriculum-appropriate depth automatically.

**UI changes made to A-Level automatically apply to all curricula.** Components are shared.

---

## Session history

| Session | Summary |
|---------|---------|
| 1-14 | Iterative build of old architecture. LessonPage, TeacherHomePage, StudentLessonPage built and refined. |
| 15 | Student lesson page. Weather exercise with icon select. |
| 16 | Header redesign. Various fixes. |
| 17 | Blank-slate rewrite. New architecture: two-layer model, new URL structure, new data layer. 78 static pages. Build clean. Deployed. |
| 18 | Full visual design pass. Teacher homepage redesigned. Snapshot card redesigned. Teaching Notes redesigned. Bar charts for GDP and Trade. Header tinted by role. Landing page redesigned. Humour/humanity principle established. |
| 19 | UI session. TeacherHomePage: IBM Plex Mono throughout, dark navy selector panel, pulsing pink "updated today" count. Teaching Notes: chart discussion section added (collapsible, grey circles), key points converted from hints to 3-bullet arrays (collapsible, pink circles), discussion prompts converted to {p, notes} structure (collapsible, pink circles), pink eyes-only disclaimer added, per-item collapsible notes (Option B). aqa-alevel.js: full content rewrite -- no double hyphens, no AI phrasing, teacher voice throughout. Blurbs converted from prose to 3-bullet arrays in metrics.js. Numbered circle bullet system introduced site-wide (white/grey/pink by context). 3-bullet rule formalised as site-wide design principle and USP. |
| 20 | Glossary planning and data generation. Copy discipline rules formalised and added to brief as NON-NEGOTIABLE block. Glossary architecture fully specified: 3-level definitions (Brief/More/Detailed), interaction model, URL structure, data schema. AQA official macro vocabulary fetched and curated to 106 platform-relevant terms across 6 topic groups. 106 entries generated via Claude API (claude-opus-4-5) using 5 few-shot examples. Full Brief-level review pass completed: 3 fixes applied (one "theory that" opener, two em dash violations). `app/data/glossary.js` written and ready. |
| 21 | Glossary integration. `GlossaryTerm.js` tooltip component built: always-light white panel, 120ms close delay (fixes tooltip disappearing on mouse travel), Brief + More levels, Full entry link hidden until glossary pages exist. `wrapGlossaryTerms.js` utility built: longest-match-first, word-boundary aware, first-match-only per string. Wired into SnapshotCard (blurb bullets) and LessonOverlay (chartDiscussion, question text, prompt text -- teacher and student). Pink notes content deliberately excluded from tooltip wiring. Global workflow rules formalised: scripts to Downloads, full paths in all bash commands, clickable URLs always, Header student fix (site name unlinked on student pages) noted as pending. |
| 22 | Strategic discussion: AP Economics (USA) expansion confirmed as next curriculum after A-Level is stable. Architecture already supports it via `[curriculum]` URL param. Multi-curriculum strategy section added to brief. Gap analysis of live lesson content vs glossary: 30 genuine missing terms identified and written. `add_glossary_terms.py` ran successfully. Glossary now 136 terms. sync_edu.py rewritten: writes metrics.js directly, blurbs as 3-string arrays, Claude Haiku API for all 36 cards, blurb-cache.json, chartSeries last point forced to match value. |
| 23 | Landing page rebuilt as 3-row curriculum picker (UK 4 tiles, US 3 tiles, International 4 tiles). A-Level only live link; all others "Soon". Flags on row labels. Teacher homepage: centred curriculum badge (country + name) at top of navy panel. Stats line bumped to 14px. SnapshotCard: `~Nd` in cyan (#00e5ff) with 1.1s throb animation. LessonOverlay: "Try again" button removed from weather exercise reveal -- exercise is editorial judgment not a quiz. Glossary comma bug fixed (yield entry line 849). |
| 24 | Glossary index + term pages built (Notion-inspired: full white, sidebar letter nav, live client-side search, clean type hierarchy). GlossaryTerm.js: "Full entry →" link restored and live. Header.js: Glossary link added to all lesson pages (teacher and student); student site name rendered as plain unlinked text. TeacherHomePage.js: all IBM Plex Mono throughout (Instrument Serif removed from curriculum badge); eyebrow and headline centred. Exchange rate 5% movement filter added to sync_edu.py: FX entries with abs(movePercent) < 5% year-on-year are excluded from homepage stats (releasedDaysAgo set to null). Questions and prompts confirmed as country-specific and pipeline-generated. |
| 25 | Architectural prep for curriculum-aware glossary. Strategic discussion: glossary will eventually need curriculum filtering (term relevance) and depth filtering (Brief/More/Detailed by curriculum level), plus route migration to `/glossary/[curriculum]/[term]`. Decision: build none of this now -- do it at the AP Economics sprint. One thing done immediately: `app/utils/glossaryHref.js` created with `glossaryHref(term, curriculum)` and `glossaryIndexHref(curriculum)`. Both functions accept curriculum param (currently ignored). Wired into `GlossaryTerm.js` and `Header.js`. Rule added: no component constructs glossary URL strings directly. |
| 26 | Major student fork built. Strategic discussions: student-first product direction confirmed; exam connection as core USP; "Define / Explain / Evaluate" glossary labels adopted (maps to AQA command words). Built: landing page role gate (LandingPage.js client component -- "I'm revising" / "I'm teaching", tiles tinted by role); student homepage (StudentHomePage.js -- live strip with FX rule, topic tiles expand inline); teacher lesson page redesigned (framing band "Your lesson is ready.", lesson plan box constrained to 864px, vertical spine with 4 blue beats, "Today's data" label, per-question pink notes removed); student lesson page rebuilt with two modes (direct vs tasked, detected via ?t=1 param); StudentLessonClient.js created as client wrapper for param detection; SnapshotCard.js updated with showBlurb prop; LessonOverlay.js fully rewritten with teacher/direct/tasked mode logic, WeatherBeat extracted as sub-component, share button always appends ?t=1. Glossary labels patched: Define/Explain/Evaluate in GlossaryTerm.js tooltip and glossary/[term]/page.js. |

---

## To-do list

- **Glossary next session:** Content pass on ~10 Evaluate-level entries that read as extra definition rather than genuine evaluation. Tooltip depth review (should Evaluate be accessible from tooltip?). Any index or term page design changes.
- **Two-password role system:** Teacher password protects blue world. Student world remains open. Currently single password (croc) wraps everything -- needs splitting so only teacher routes are gated.
- **AP Economics curriculum:** After A-Level is fully stable. Create `ap-economics.js`, audit hardcoded AQA references, update `sync_edu.py` with AP prompt flag. At the same time: migrate glossary routes to `/glossary/[curriculum]/[term]`, add `curricula[]` tags to all 136 glossary entries, write ~20 AP-specific terms, wire depth filtering (Define/Explain/Evaluate by curriculum).
- **Long-term:** Cambridge IGCSE, IB Economics, CBSE India (strategic priority at scale), HSC Australia, multilingual expansion, mobile app, data layer API, AI-assisted live assessment.
