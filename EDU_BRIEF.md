# EDU_BRIEF.md
## MacroSnaps Education Platform (macedu)
### Living brief — updated Session 33

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
- **EDU_BRIEF.md updated at every session close** — always without being asked.
- **Python is invoked as `python3` on this machine.** Never `python`.
- **Static export preview:** `npx serve@latest out` -- not `npm run start` (which errors with output: export).

---

## Product philosophy (NON-NEGOTIABLE)

**This platform is the opposite of a dry textbook.** It must feel constantly fresh, alive, and full of humanity. Every design decision should reinforce the feeling of being wired into the live global economy. The tone is confident, wry, and on the teacher's side — never municipal, never bureaucratic, never worthy. If it feels like a government website or a school intranet, something has gone wrong.

**The Bloomberg principle:** Teachers and students should feel like they are looking at a live terminal, not reading a static resource.

**Less is more (NON-NEGOTIABLE).** Every element on every page must earn its place. When in doubt, remove it. Decoration that does not carry information is clutter. A tooltip that adds nothing to the reading flow is noise. This principle applies to UI elements, copy, labels, footers, badges, and links.

**No prose anywhere.** All content is 3 bullet points. This is a USP and a design rule enforced across the entire site.

**No AI-generated writing.** All copy must read as if written by an experienced A-level economics teacher. No double hyphens, no long hyphens (em dashes), no "on the one hand / on the other hand" boilerplate, no hedging.

**Copy discipline (NON-NEGOTIABLE).** Every word is load-bearing. These rules apply across all content on the platform -- blurbs, questions, prompts, glossary definitions, UI labels, everything:
- No synonyms used as padding. Pick one formulation and use it.
- No exam-board throat-clearing. ("According to the AQA specification..." -- never.)
- No hedging on definitions. ("Generally speaking..." -- no. It either is or it isn't.)
- No wasted openers. ("It is worth noting that..." -- cut.)
- No double-barrelled definitions. One sentence per Brief-level definition. If it needs two sentences, the definition is wrong.
- Related terms expressed as links, not prose. "See also: demand-pull inflation, cost-push inflation." Not two sentences joining the dots.
- Compression signals confidence. Fluff signals the opposite.
- **No em dashes or long hyphens anywhere. Ever. Use a regular hyphen (-) or restructure the sentence.**

---

## Architecture (locked)

**36 cards = 6 metrics × 6 countries.**

**Layer 1 (Snapshot card):** Dark navy. Flag, country name, metric label (descriptive), large value, 3-bullet blurb (teacher + direct student) or "What is this chart telling you?" (tasked student), chart. `Next release: ~Nd` top-right with Nd in bright cyan (#00e5ff) throbbing at 1.1s. AQA ref below that. No weather icon or direction arrow on the card. **DXY callout:** US exchange rates card only -- a blue left-bordered callout below the value explaining what the DXY index is (3 sentences). Wired as a conditional in `SnapshotCard.js`.

**Layer 2 (Lesson overlay):** Teacher sees: 4-beat vertical spine (chart discussion, weather icon, written response, discussion) with checkboxes on beats 3 and 4. Share button always encodes `?t=1` plus any selected `?q=` and `?d=` params. Direct student sees: 3-beat vertical spine (what the chart shows, weather icon with reveal, exam questions). Tasked student sees: weather icon + teacher-selected questions and prompts only.

**Weather icon exercise:** Student picks sunny/cloudy/stormy for the specific metric being viewed (not the overall economy). On reveal: correct icon gets a green highlight ring, wrong icons dim to opacity 0.4, and a one-sentence `weatherReason` appears below explaining the judgment. `correctIcon` (one of `sunny`/`cloudy`/`stormy`) and `weatherReason` are generated by `sync_edu.py` for each metric/country combination and written to `metrics.js`. The icon functions in `sync_edu.py` determine the correct icon via rule-based logic (thresholds for each metric); `weatherReason` is a student-level one-sentence explanation written in the same function. Both fields replace the old `reveal` field.

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
/glossary                                      glossary index (topic groups)
/glossary/[term]                               individual term page
```
MVP curriculum slug: `alevel`

**Metric slugs:** `inflation`, `unemployment`, `gdp`, `interest-rates`, `exchange-rates`, `trade`
**Country slugs:** `uk`, `us`, `eurozone`, `china`, `japan`, `brazil`
**Colours:** Teacher `#378ADD` (blue), Student `#F0843C` (orange), Pink `#c2185b` (teacher-only content), Cyan `#00e5ff` (next release throb), Green `#2e9e5b` (weather icon correct answer highlight)
**Password:** croc (teacher only -- student world is open, no password)

---

## Pulse/ping animations

All pulsing dots on the site use the **ping pattern** (dark core + expanding lighter ring), not the old throb (opacity/scale fade). This reads as "transmitting signal" -- consistent with the Bloomberg principle.

- **FramingHeader.js** (teacher): blue ping. Core `#0C447C`, ring `#85B7EB`. 1.4s.
- **StudentFramingHeader.js** (student): orange ping. Core `#b45309`, ring `#fbbf24`. 1.4s.
- **StudentHomePage.js** stamp (0-1d): orange ping. Same as above.
- **LandingPage.js**: alternating blue/orange ping. Same 1.4s rhythm; colour switches every 2 pings (5.6s cycle) -- blue, blue, orange, orange, repeat.
- **SnapshotCard.js** `~Nd` text: retains cyan throb (text, not a dot -- ping doesn't apply to text).
- **StudentHomePage.js** age stamps: retains cyan throb on text (same reason).

---

## Landing page

Role gate first, curriculum picker second. Two cards on load: "I'm revising" (orange) and "I'm teaching" (blue). Clicking a role reveals the curriculum picker with tiles tinted to match the role. Back arrow returns to role picker and shows the **opposite** role label -- i.e. teacher view shows "← I'm revising", student view shows "← I'm teaching". Password hint shown under the teacher card only ("You will need a password on the next screen."). No site name displayed anywhere on this page.

Headline: "Live global data. Wired to your syllabus."
Subhead: "Updated automatically. No textbook lag."
Curriculum tiles: centre-aligned text, "Soon" badge inline (not absolute positioned).

**Updated date:** `lastUpdated` exported from `metrics.js` (written by `sync_edu.py` on every pipeline run as `%-d %B %Y` format). Displayed centred below the role picker cards as small IBM Plex Mono 700 11px muted grey (`#c0cad8`). Format: `Updated 2 April 2026`. Not shown when curriculum picker is open. Reflects actual pipeline run date, not build date.

Teacher tiles link to `/teacher/[curriculum]`. Student tiles link to `/student/[curriculum]`.

**Row 1 -- 🇬🇧 United Kingdom (4 tiles):**
- A-Level Economics · AQA -- only live tile
- GCSE Economics · AQA
- Macro · Year 1 · UK
- Macro · Year 2 · UK

**Row 2 -- 🇺🇸 United States (3 tiles):**
- AP Economics · College Board
- Macro · Year 1 · US
- Macro · Year 2 · US

**Row 3 -- 🌍 International (4 tiles):**
- Cambridge A-Level · CIE
- CBSE Economics · Class 11-12 · 🇮🇳
- IB Economics · IBO
- HSC Economics · NSW · 🇦🇺

---

## Teacher homepage

Dark navy selector panel. No site name displayed. No curriculum badge. No "Today's data is live" eyebrow. Headline "Pick a topic and a country." centred. Two dropdowns (topic + country) + "Open this lesson →" button. Stats line at 14px IBM Plex Mono: green dot · 36 data points · N updated today (pulsing pink) · N updated this week. Schedule note below in italic mono.

`CURRICULUM_LABELS` map in `TeacherHomePage.js` retains `alevel` and `ap-economics` entries for future use.

---

## Student homepage (`/student/alevel`)

No site name displayed. No dates shown anywhere (dates make the site feel stale to students). Three zones, top to bottom:

**Zone 1 -- Pick a topic to start:** Heading in orange IBM Plex Mono 17px. Subline: "Each topic has live data from 6 countries - the kind your examiner will use in Paper 2." (14px, muted). 6 metric tiles in a 2-column grid. Each shows metric name (orange, IBM Plex Mono), one-line syllabus description, and 6 country flags collapsed. Click a tile to expand country flags as links (2-column grid, flag stacked above country name). Click again to collapse. One tile open at a time.

**Zone 2 -- ...Or choose one of these black boxes below:** Heading in orange IBM Plex Mono 17px, 40px top margin. Subline: "They are showing the most recently updated data across all topics." 3 dark navy cards showing freshest data points. Sorted by `releasedDaysAgo` ascending. No dates shown on cards.

**FX rule on live strip:** Exchange rates get one slot maximum. Only eligible on even calendar days. Best mover wins (highest absolute `movePercent`). Must be >= 1% to qualify. If conditions not met, slot goes to next freshest non-FX entry.

**Zone 3 -- Glossary footer:** "Glossary · 136 AQA A-Level terms · What, How, So what? →"

---

## Teacher lesson page

**Framing band** (full width, light blue `#eef5fc`): Blue ping dot + typewriter effect on "Build your lesson plan." (Instrument Serif 30px, 38ms/char) with subline "30 minutes · latest data · share with one click" (IBM Plex Mono 15px, muted, fades in on typewriter completion).

**Lesson plan box** (white card, constrained to 864px): 4 beats in a horizontal timeline connected by lines. Stacks vertically on mobile (max-width 600px). Labels: 1 · 5 min · Chart discussion / 2 · +5 min · Weather icon / 3 · +10 min · Written response / 4 · +10 min · Discussion.

No "Today's data" label. Snapshot card (dark navy, blurb bullets visible) directly below lesson plan box.

**Vertical spine** (4 blue numbered dots connected by line): beat content sections in white cards below the snapshot card.

**Share button** (beat 4): "Share with students →" -- on click turns blue and reads "Copied. Paste the link anywhere to share." for 2.5s then resets. No alert(). Works on mobile.

Per-question and per-prompt pink notes are removed. Teacher notes appear as pink left-bordered callouts inside beat cards only when genuinely useful.

---

## Student lesson page

**Framing band** (full width, warm `#fff4ee`): Orange ping dot + typewriter effect on "This is what's happening right now." with dynamic subtitle (countryLabel + metricLabel + aqaRef).

No "Today's data" label. Snapshot card directly below framing band.

**Vertical spine** (3 orange numbered dots): direct student beats. Beat 1: chart discussion bullets. Beat 2: weather icon exercise (auto-reveal on selection). Beat 3: exam questions with "These are the types of question you will see in Paper 2."

Tasked mode (via `?t=1`): weather icon + teacher-selected questions and prompts only.

---

## Glossary

137 terms (136 AQA A-Level + DXY as supplementary). Organised in 7 topic groups. Three definition levels: What / How / So what? (maps to AQA command words Define / Explain / Evaluate).

**DXY:** Added as a supplementary entry in International Economics group. Brief explains it is not an AQA named concept but is directly relevant to US exchange rate discussion. Excluded from auto-wrapping via `WRAP_BLOCKLIST` in `wrapGlossaryTerms.js` -- explained contextually via the DXY callout on the SnapshotCard instead.

**Glossary index subheading:** "{n} terms · every term on the AQA A-Level specification"

**Tooltip:** Opens below the word, white panel, pill tabs (What/How/So what?), X close button top-right, mobile-safe (fixed centred on screen at max-width 640px).

**`wrapGlossaryTerms.js`:** Longest-match-first, word-boundary aware, first-match-only per string. `WRAP_BLOCKLIST` set excludes terms handled contextually (currently: `dxy`).

**Glossary footer (student homepage):** "Glossary · 136 AQA A-Level terms · What, How, So what? →"

---

## Key files

| File | Owner | Notes |
|------|-------|-------|
| `app/data/metrics.js` | Pipeline | Never hand-edited. Written by `sync_edu.py`. Exports `metrics` and `lastUpdated`. |
| `app/data/aqa-alevel.js` | Hand-edited | Lesson overlay content. Never touched by pipeline. |
| `app/data/glossary.js` | Hand-edited | 137 terms. |
| `app/components/SnapshotCard.js` | Shared | DXY callout conditional wired in. |
| `app/components/LessonOverlay.js` | Shared | WeatherBeat sub-component. Share button. correctIcon + weatherReason wired. |
| `app/components/FramingHeader.js` | Teacher | Blue ping dot + typewriter. |
| `app/components/StudentFramingHeader.js` | Student | Orange ping dot + typewriter. |
| `app/components/TeacherHomePage.js` | Teacher | Navy panel, dropdowns, stats line. |
| `app/components/StudentHomePage.js` | Student | Topic tiles, live strip, glossary footer. |
| `app/components/LandingPage.js` | Shared | Role gate + curriculum picker. Back arrow shows opposite role label. Updated date below role cards. |
| `app/components/GlossaryTerm.js` | Shared | Tooltip with X button, mobile-safe positioning. |
| `app/components/GlossaryIndexClient.js` | Shared | 7-group index with search. |
| `app/utils/wrapGlossaryTerms.js` | Shared | WRAP_BLOCKLIST added. |
| `app/utils/glossaryHref.js` | Shared | Centralised URL construction. |
| `EDU_BRIEF.md` | Hand-edited | Updated every session. |

---

## Pipeline boundary (NON-NEGOTIABLE)

`metrics.js` is the only file the pipeline writes. No tooling spans both repos. `macedu` consumes `metrics.js` only. Patch logic belongs in existing scripts -- no new scripts added to the daily ritual.

---

## Multi-curriculum strategy

**Curriculum roadmap (in priority order):**

1. **AQA A-Level** -- live. MVP curriculum.
2. **AP Economics (USA)** -- confirmed next. After A-Level is fully stable.
3. **AQA GCSE** -- third curriculum. Bigger market than university, cleaner syllabus anchor.
4. **IB Economics** -- globally standardised, 160 countries, huge in US/UK private and international schools.
5. **Cambridge International A-Level (CIE)** -- massive in South/Southeast Asia, East Africa, Middle East.
6. **CBSE India (Class 11-12)** -- strategic priority at scale. 20,000+ schools.
7. **HSC Economics (NSW, Australia)** -- English-language, data-hungry teachers.
8. **UK/US University Year 1 and Year 2** -- UK has no standardised syllabus (problematic); US "Principles" maps well onto AP extension.

**What AP expansion involves:**
- `ap-economics.js` -- new lesson content file, same structure as `aqa-alevel.js`. US English, College Board framing.
- Glossary: shared for now. At AP sprint: add `curricula[]` tags to all entries, write ~20 AP-specific terms, migrate routes to `/glossary/[curriculum]/[term]`, wire depth filtering.
- `metrics.js`: shared. Live data feeds are already global.
- `sync_edu.py`: add `curriculum: "ap-economics"` flag to question/prompt generation calls.
- Audit for hardcoded AQA/A-level references in components and replace with curriculum-derived values.
- `CURRICULUM_LABELS` in `TeacherHomePage.js` already has `ap-economics` entry ready.

**Glossary future:** The 3-level system (What/How/So what?) is designed to become curriculum-aware: GCSE pulls What, A-Level pulls How, undergraduate pulls So what?. Same terms, no new data, curriculum-appropriate depth automatically.

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
| 27 | Glossary redesigned end-to-end. Index rebuilt as 7-group topic view (National Income & Growth, Aggregate Demand & Supply, Inflation, Unemployment & Labour, Money & Monetary Policy, Fiscal Policy, International Economics); chips now fire inline tooltips -- no page navigation. Term page rebuilt with pill tabs. Tooltip rebuilt with pill tabs, opens below the word, footer removed entirely (group badge and Full entry link gone -- less is more). Definition level labels changed from Define/Explain/Evaluate to What/How/So what? -- casual, potent, student-first. Pill tab style locked: navy fill active, transparent inactive, border-radius 20. All 136 glossary entries API-rewritten: zero em dashes, "Common mistake: Students" capitalised throughout, group field added. 12 So what? entries rewritten with genuine evaluation (critique, tradeoffs, policy limits) rather than extended mechanism. Landing page: site name removed, password hint moved inside teacher card, curriculum tiles centre-aligned. Student/teacher homepages: site name removed. globals.css: html { overflow-y: scroll } added. Less is more principle added as NON-NEGOTIABLE. New components: GlossaryIndexClient.js, GlossaryTermClient.js. |
| 28 | Branding and animation session. Header.js: site name replaced with MACRO wordmark (IBM Plex Mono, 700, 0.08em tracking); always a link (removed student exception); MACRO and Glossary links now role-coloured (blue for teacher, orange for student, blue for landing). Footer.js created: two-line centred footer (disclaimer + MacroSnaps hyperlink to macrosnaps.app with _blank); shown on landing, teacher homepage, student homepage, glossary index -- hidden on card pages. LandingPage.js: MACRO wordmark wired, Footer wired, old "Powered by MacroSnaps" inline line removed; pulsing dot added above headline -- 2-blue-2-orange alternating 6s CSS keyframe animation (brand colours in a single glyph); subtitle updated to "Updated automatically. No textbook lag." next.config.js: devIndicators: false. FramingHeader.js and StudentFramingHeader.js created with typewriter effects. |
| 29 | Data pipeline audit session. Diagnosed 3 empty sparklines: CHN unemployment, BRA unemployment, CHN interest-rates. Fix: extended `sync_monthly_actuals.py` with `FROZEN_BACKFILL_TARGETS`. CHN/BRA unemployment now live. CHN interest-rates remains empty -- no sheet data yet. 35/36 sparklines live. |
| 30 | Mobile and UX session. Pulse animations upgraded site-wide from throb to ping (dark core + expanding ring). Landing page dot: 2-blue-2-orange alternation at 5.6s cycle. Student homepage restructured: topic tiles first, black box strip second; copy overhauled for first-time students ("Pick a topic to start", exam hook line, "...Or choose one of these black boxes below"); dates removed from student pages entirely. Teacher homepage: curriculum badge and "Today's data is live" eyebrow removed; button renamed "Open this lesson →". Teacher/student lesson pages: "Today's data" label removed. FramingHeader: "Build your lesson plan." headline, "latest data" subtitle. Share button: "Share with students →" with inline "Copied. Paste the link anywhere to share." confirmation (no alert). Glossary tooltip: X close button added, mobile-safe positioning (fixed centred on small screens). Lesson plan timeline: stacks vertically on mobile. Country cards in topic tiles: flag stacked above name (2-col grid). DXY: callout added to US exchange rates SnapshotCard; glossary entry added (137 terms total); excluded from wrapGlossaryTerms auto-wrap via WRAP_BLOCKLIST. Copy discipline: em dash / long hyphen ban made explicit in brief. |
| 31 | Weather icon exercise given a correct answer and payoff. Old `reveal` field (evergreen boilerplate, teacher-framing) replaced with `correctIcon` and `weatherReason` in `sync_edu.py`. Icon functions rewritten with student-level one-sentence reason per condition. Both fields written to `metrics.js` per metric/country. `WeatherBeat` component updated: correct icon gets green ring + green background on reveal, wrong icons dim to opacity 0.4, `weatherReason` appears in a green-tinted box below. Teacher and student page.js files and `StudentLessonClient.js` updated to pass new props. `sync_edu.py` confirmed to live in macrosnaps repo, not macedu. |
| 32 | Bug fix: landing page back arrow label was showing the current role instead of the opposite role. Teacher view now correctly shows "← I'm revising"; student view shows "← I'm teaching". One-line fix in `LandingPage.js`. |
| 33 | Daily update ritual run and deployed. `lastUpdated` added to pipeline: `sync_edu.py` now appends `export const lastUpdated = "D Month YYYY";` to `metrics.js` on every run (using `%-d %B %Y` strftime format). `LandingPage.js` imports `lastUpdated` and displays it centred below the role picker cards -- small IBM Plex Mono 700 11px muted grey (`#c0cad8`), format "Updated 2 April 2026". Not shown when curriculum picker is open. Workflow rule added: static export preview command is `npx serve@latest out`, not `npm run start`. |

---

## To-do list

- **CHN interest-rates sparkline:** Sheet column is empty. When a data source is found and the column is populated, `sync_monthly_actuals.py --apply` will pick it up automatically via `FROZEN_BACKFILL_TARGETS` -- no code change needed.
- **Two-password role system:** Teacher password protects blue world. Student world remains open. Currently single password (croc) wraps everything -- needs splitting so only teacher routes are gated.
- **AP Economics curriculum:** After A-Level is fully stable. Create `ap-economics.js`, audit hardcoded AQA references, update `sync_edu.py` with AP prompt flag. At the same time: migrate glossary routes to `/glossary/[curriculum]/[term]`, add `curricula[]` tags to all 136 glossary entries, write ~20 AP-specific terms, wire depth filtering (What/How/So what? by curriculum).
- **Long-term:** Cambridge IGCSE, IB Economics, CBSE India (strategic priority at scale), HSC Australia, multilingual expansion, mobile app, data layer API, AI-assisted live assessment.
