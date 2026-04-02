# EDU_BRIEF.md
## MacroSnaps Education Platform (macedu)
### Living brief — updated Session 37

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

**This platform is the opposite of a dry textbook.** It must feel constantly fresh, alive, and full of humanity. Every design decision should reinforce the feeling of being wired into the live global economy. The tone is confident, wry, and on the teacher's side -- never municipal, never bureaucratic, never worthy. If it feels like a government website or a school intranet, something has gone wrong.

**The Bloomberg principle:** Teachers and students should feel like they are looking at a live terminal, not reading a static resource.

**Less is more (NON-NEGOTIABLE).** Every element on every page must earn its place. When in doubt, remove it. Decoration that does not carry information is clutter. A tooltip that adds nothing to the reading flow is noise. This principle applies to UI elements, copy, labels, footers, badges, and links.

**No prose anywhere.** All content is 3 bullet points. This is a USP and a design rule enforced across the entire site.

**No AI-generated writing.** All copy must read as if written by an experienced economics teacher. No double hyphens, no long hyphens (em dashes), no "on the one hand / on the other hand" boilerplate, no hedging.

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

**36 cards = 6 metrics x 6 countries.**

**Layer 1 (Snapshot card):** Dark navy. Flag, country name, metric label (descriptive), large value, 3-bullet blurb (teacher + direct student) or "What is this chart telling you?" (tasked student), chart. `Next release: ~Nd` top-right with Nd in bright cyan (#00e5ff) throbbing at 1.1s. AQA ref below that (suppressed for AP curriculum). No weather icon or direction arrow on the card. **DXY callout:** US exchange rates card only. Wired as a conditional in `SnapshotCard.js`.

**Layer 2 (Lesson overlay):** Teacher sees: 4-beat vertical spine (chart discussion, weather icon, written response, discussion). Share button always encodes `?t=1`. Direct student sees: 3-beat vertical spine. Tasked student sees: weather icon + teacher-selected questions and prompts only.

**Weather icon exercise:** Student picks sunny/cloudy/stormy. On reveal: correct icon gets green ring, wrong icons dim to 0.4, `weatherReason` appears below. `correctIcon` and `weatherReason` generated by `sync_edu.py` per metric/country. For AP curriculum, `weatherReason` has UK spellings replaced at page level before passing to components.

**Student mode detection (NON-NEGOTIABLE):**
- `?t=1` always present on teacher-generated links
- Direct navigation: no params -- rich direct view with blurb bullets
- Tasked navigation: `?t=1` -- focused tasked view
- Detection lives in `StudentLessonClient.js`

**URL structure (locked):**
```
/                                              landing page (role gate + curriculum picker)
/teacher/[curriculum]                          teacher homepage
/teacher/[curriculum]/[metric]/[country]       teacher lesson page
/student/[curriculum]                          student homepage
/student/[curriculum]/[metric]/[country]       student lesson page
/glossary                                      redirects to /glossary/alevel
/glossary/[curriculum]                         curriculum glossary index
/glossary/[curriculum]/[term]                  canonical glossary term route
/about                                         about page (how it works, who, contact)
```
Live curriculum slugs: `alevel`, `ap-economics`

**Metric slugs:** `inflation`, `unemployment`, `gdp`, `interest-rates`, `exchange-rates`, `trade`
**Country slugs:** `uk`, `us`, `eurozone`, `china`, `japan`, `brazil`
**Colours:** Teacher `#378ADD` (blue), Student `#F0843C` (orange), Pink `#c2185b`, Cyan `#00e5ff`, Green `#2e9e5b`
**Password:** removed -- site is live and open.

---

## Pulse/ping animations

All pulsing dots use the ping pattern (dark core + expanding lighter ring).

- **FramingHeader.js** (teacher): blue ping. Core `#0C447C`, ring `#85B7EB`. 1.4s.
- **StudentFramingHeader.js** (student): orange ping. Core `#b45309`, ring `#fbbf24`. 1.4s.
- **StudentHomePage.js** stamp (0-1d): orange ping.
- **LandingPage.js**: alternating blue/orange ping. 5.6s cycle.
- **SnapshotCard.js** `~Nd` text: cyan throb (text, not a dot).
- **StudentHomePage.js** age stamps: cyan throb on text.

---

## Landing page

Role gate first, curriculum picker second. "I'm revising" (orange) / "I'm teaching" (blue). Back arrow shows opposite role label. No password -- site is open.

Headline: "Live global data. Wired to your syllabus."
Subhead: "Updated automatically. No textbook lag."

**Updated date:** `lastUpdated` from `metrics.js`. IBM Plex Mono 700 11px `#c0cad8`. Format: "Updated 2 April 2026". Hidden when curriculum picker open.

**Row 1 -- United Kingdom:** A-Level Economics (live), GCSE, Macro Y1, Macro Y2
**Row 2 -- United States:** AP Economics (live), AP Micro, AP Macro, College Econ
**Row 3 -- International:** IB Economics, Cambridge A-Level, CBSE India, HSC Australia

---

## Glossary

**Two files:**
- `app/data/glossary.js` -- AQA A-Level. 155 terms. UK English, UK institutions.
- `app/data/glossary-ap.js` -- AP Economics. 134 terms. US English, US institutions, AP FRQ register. Generated Session 37 via 6-part script + stitch.

**Route:** `/glossary/[curriculum]` is the index. `/glossary/[curriculum]/[term]` is the term page. `/glossary` redirects to `/glossary/alevel` via client-side useRouter replace.

**`GlossaryIndexClient.js`:** Curriculum-aware. Shows correct group order (AQA or AP) and correct subtitle (e.g. "134 terms · AP Economics"). Accepts `curriculum` prop.

**AP group order:** Basic Economic Concepts, Aggregate Demand & Supply, National Income & Growth, Financial Sector, Stabilization Policy, Labor Markets, International Trade & Finance.

**AQA group order:** National Income & Growth, Aggregate Demand & Supply, Inflation, Unemployment & Labour, Money & Monetary Policy, Fiscal Policy, International Economics.

**`glossaryHref.js`:** Fully curriculum-aware. `glossaryHref(slug, curriculum)` returns `/glossary/${curriculum}/${slug}`. `glossaryIndexHref(curriculum)` returns `/glossary/${curriculum}`.

**`wrapGlossaryTerms.js`:** Longest-match-first, word-boundary aware, first-match-only. WRAP_BLOCKLIST: `dxy`.

**Header Glossary link:** Curriculum-aware. Passes `curriculum` prop to Header; Header calls `glossaryIndexHref(curriculum)`.

**`curricula` field:** All 155 AQA entries have `curricula` field. AP entries have `curricula: ['ap-economics']`. Ready for curriculum-aware filtering when a third curriculum arrives.

---

## About page

`/about` -- three sections: How it works (data pipeline trust signal for teachers), Who built this (Ralph Lazar / MacroSnaps), Contact (Formspree AJAX form, inline "Received" confirmation).

`app/components/ContactForm.js` -- client component. AJAX POST to `https://formspree.io/f/xaqldbwr`. Shows inline success message on submission.

---

## Footer

Slim single bar. Left: data disclaimer + MacroSnaps credit. Right: About link. No page-break padding excess.

---

## Key files

| File | Owner | Notes |
|------|-------|-------|
| `app/data/metrics.js` | Pipeline | Written by `sync_edu.py`. Exports `metrics` and `lastUpdated`. |
| `app/data/aqa-alevel.js` | Hand-edited | Lesson overlay content for AQA A-Level. |
| `app/data/ap-economics.js` | Hand-edited | Lesson overlay content for AP Economics. 5 tiles. US English, FRQ register. |
| `app/data/glossary.js` | Hand-edited | 155 terms. AQA A-Level. UK English. |
| `app/data/glossary-ap.js` | Generated | 134 terms. AP Economics. US English. Generated via 6-part scripts + stitch. |
| `app/components/SnapshotCard.js` | Shared | curriculum prop, AP_METRIC_DESCRIPTORS, blurbAp/displayBlurb, aqaRef conditional. |
| `app/components/LessonOverlay.js` | Shared | WeatherBeat, share button, correctIcon + weatherReason. |
| `app/components/StudentLessonClient.js` | Student | Passes curriculum to SnapshotCard. |
| `app/components/FramingHeader.js` | Teacher | Blue ping + typewriter. |
| `app/components/StudentFramingHeader.js` | Student | Orange ping + typewriter. |
| `app/components/TeacherHomePage.js` | Teacher | Navy panel, dropdowns, stats, CURRICULUM_LABELS. |
| `app/components/StudentHomePage.js` | Student | Topic tiles, live strip, glossary footer. Curriculum-aware copy. |
| `app/components/LandingPage.js` | Shared | Role gate, curriculum picker, AP tile live, updated date. |
| `app/components/GlossaryTerm.js` | Shared | Tooltip, X button, mobile-safe. |
| `app/components/GlossaryIndexClient.js` | Shared | Curriculum-aware index. Group order + subtitle by curriculum. |
| `app/components/Header.js` | Shared | Accepts `curriculum` prop. Glossary link is curriculum-aware. |
| `app/components/Footer.js` | Shared | Slim bar. Disclaimer + MacroSnaps + About link. |
| `app/components/ContactForm.js` | Shared | AJAX Formspree form. Inline success message. |
| `app/utils/wrapGlossaryTerms.js` | Shared | WRAP_BLOCKLIST includes `dxy`. |
| `app/utils/glossaryHref.js` | Shared | `glossaryHref(slug, curriculum)` and `glossaryIndexHref(curriculum)`. |
| `app/glossary/page.js` | Shared | Client redirect to `/glossary/alevel`. |
| `app/glossary/[curriculum]/page.js` | Shared | Curriculum glossary index. generateStaticParams: alevel + ap-economics. |
| `app/glossary/[curriculum]/[term]/page.js` | Shared | Term page. generateStaticParams for both curricula. Passes curriculum to Header. |
| `app/glossary/[curriculum]/[term]/GlossaryTermClient.js` | Shared | Curriculum-aware seeAlso links. |
| `app/about/page.js` | Shared | About page. Three sections. Uses ContactForm. |
| `EDU_BRIEF.md` | Hand-edited | Updated every session. |

---

## Pipeline boundary (NON-NEGOTIABLE)

`metrics.js` is the only file the pipeline writes. No tooling spans both repos. Patch logic belongs in existing scripts.

---

## sync_edu.py -- AP blurb generation

Generates two blurbs per metric/country:
- `blurb` (AQA): UK English. Cache key: `{metric}:{country}`. System: `BLURB_SYSTEM`.
- `blurbAp` (AP): US English, AP register. Cache key: `ap:{metric}:{country}`. System: `BLURB_SYSTEM_AP`.

72 cache entries total. AP blurbs regenerate on new release and daily for FX.

**Minor cleanup needed:** `BLURB_SYSTEM_AP` appears twice in `sync_edu.py` (harmless -- identical content). Remove duplicate when next editing.

---

## Multi-curriculum strategy

1. **AQA A-Level** -- live.
2. **AP Economics** -- live. Glossary live (134 terms, Session 37).
3. **AQA GCSE** -- next curriculum candidate.
4. **IB Economics** -- global reach.
5. **Cambridge International A-Level (CIE)**
6. **CBSE India** -- strategic priority at scale. 20,000+ schools.
7. **HSC Economics (NSW)**
8. **University Year 1 and 2**

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
| 35 | Glossary Phase 4 (partial). curricula field added to all 155 entries. 18 new entries (14 AP-only + 4 both-curricula). /glossary/[curriculum]/[term] route live. glossaryHref.js curriculum-aware. Old /glossary/[term] preserved. Architecture decision: separate glossary-ap.js per curriculum. 618 static pages. |
| 36 | Bug fixes pre-launch. StudentHomePage copy curriculum-aware. Old /glossary/[term] route deleted. glossary-ap.js content planned: 6-part split strategy agreed. |
| 37 | AP glossary complete: glossary-ap.js (134 terms, 7 groups, US English, AP FRQ register). Generated via 6-part Python scripts + stitch. Curriculum-aware glossary index (/glossary/[curriculum]/page.js). GlossaryIndexClient curriculum-aware (subtitle + group order). glossaryIndexHref() curriculum-aware. Header passes curriculum to Glossary link. About page (/about): how it works, who built this, Formspree AJAX contact form with inline confirmation. Footer updated: slim bar with About link. Password gate removed. Site is live and open. 445 static pages. |

---

## To-do list

- **CHN interest-rates sparkline:** No sheet data yet. Will populate automatically when added.
- **Two-password role system:** Teacher password, student world open. Currently no password (site is open).
- **AP Fiscal Policy tile:** Deferred. Needs MacroSnaps monthly government debt series.
- **BLURB_SYSTEM_AP deduplication:** Minor. Appears twice in sync_edu.py. Remove duplicate when next editing.
- **Glossary curriculum filtering:** Deferred until third curriculum exists. `curricula` field is ready.
- **Glossary depth filtering:** "GCSE pulls What, A-Level pulls How, undergraduate pulls So what?" Deferred until third curriculum.
- **Next curriculum:** AQA GCSE is the likely next candidate after AP is stable.
- **Long-term:** IB, Cambridge, CBSE India, HSC, multilingual, mobile app, data API, AI assessment.
