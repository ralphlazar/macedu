# EDU_BRIEF.md
## MacroSnaps Education Platform (macedu)
### Living brief — updated Session 18

---

## Project context

Next.js 16 App Router, statically exported, Cloudflare Pages. Live at macroeconomics.education. Repo: https://github.com/ralphlazar/macedu. Local: `/Users/lisaswerling/RALPH/AI/macedu`. Ralph is non-technical; Claude writes all code. UK English throughout; no em dashes.

---

## Product philosophy (NON-NEGOTIABLE)

**This platform is the opposite of a dry textbook.** It must feel constantly fresh, alive, and full of humanity. Every design decision should reinforce the feeling of being wired into the live global economy. The tone is confident, wry, and on the teacher's side — never municipal, never bureaucratic, never worthy. If it feels like a government website or a school intranet, something has gone wrong.

**The Bloomberg principle:** Teachers and students should feel like they are looking at a live terminal, not reading a static resource.

---

## Architecture (locked)

**36 cards = 6 metrics × 6 countries.**

**Layer 1 (Snapshot card):** Dark navy. Flag, country name, metric label (descriptive), large value, blurb (teacher) or "What is this chart telling you?" (student), chart. Release date (cyan number) and AQA ref top-right. No weather icon or direction arrow on the card.

**Layer 2 (Teaching Notes / Your tasks for the lesson):** White box below the card. Teacher sees four sections (dot bullet, navy): How to use in class, Weather icon exercise, Sample questions (with checkboxes), Wider discussion prompts (with checkboxes). Share button encodes selected questions (?q=) and prompts (?d=) in student URL. Student sees: Weather icon exercise (auto-reveal on selection) + selected questions and prompts passed via URL params.

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
**Colours:** Teacher `#378ADD` (blue), Student `#F0843C` (orange)
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
  blurb,       // editorial: UK only currently; others empty string
  chartDates,  // array of date strings
  chartSeries, // array of numeric values
}
```

### `app/data/aqa-alevel.js`
Named export `{ lesson }`. Keyed by metric slug. **Edited by hand.** Never touched by pipeline.

Standard classroomTime across all 6 metrics:
```js
five:   'Discuss what\'s going on in the chart.'
ten:    'Add the Weather Icon exercise.'
twenty: 'Full activity with a written response to one or more of the questions below.'
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
| `Header.js` | Role stripe (blue/orange top border) + tinted background by role. Props: `role, homeHref`. Site name links to homeHref. |
| `SnapshotCard.js` | Layer 1. Props: `metric, country, data, aqaRef, metricTitle, allCountries, studentMode`. Metric label uses descriptive text (e.g. "Inflation (year-on-year, %)") and FX cross rate for exchange-rates. Release date top-right (cyan number), AQA ref below it. Value same size as country name. `studentMode` swaps blurb for "What is this chart telling you?" |
| `LessonOverlay.js` | Layer 2. Props: `metric, country, lessonData, reveal, curriculum, showReveal, studentMode`. Section heads use navy dot bullets. Checkboxes on sample questions and discussion prompts. Share button encodes ?q= and ?d= params. Student auto-reveals weather icon on selection. |
| `TeacherHomePage.js` | Two dropdowns (topic + country) + Go button + stats line ("36 data points · X updated today · Y updated this week"). Light blue-grey page background. |
| `StudentHomePage.js` | Exists but not linked. Student-facing homepage not in use. |
| `PasswordGate.js` | Single password (croc). Wraps all pages via `app/layout.js`. |

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
| `/teacher/[curriculum]/[metric]/[country]` | `app/teacher/[curriculum]/[metric]/[country]/page.js` — `homeHref={/teacher/${curriculum}}` |
| `/student/[curriculum]` | `app/student/[curriculum]/page.js` |
| `/student/[curriculum]/[metric]/[country]` | `app/student/[curriculum]/[metric]/[country]/page.js` — `homeHref={/student/${curriculum}}` |

---

## Typography

- Display/headings: Instrument Serif (loaded via `<link>` in `app/layout.js`)
- Body/UI: IBM Plex Sans / sans-serif
- Data values/labels: IBM Plex Mono

---

## Key technical rules

- **Static export only.** No `cookies()`, no middleware, no server-side features.
- **Python scripts for all file writes.** Never bash heredocs (mangle JSX).
- **`metrics.js` never edited by hand.** Pipeline writes it exclusively.
- **Emoji written directly in Python source.** Never as Unicode escape sequences.
- **Patch scripts are disposable.** Run once, then deleted. Never committed.
- **`app/data/` for data layer; `app/components/` for all components.**
- **Local preview before every push.**
- **Three weather icons only:** ☀️ ☁️ ⛈️
- **Questions and prompts labelled A, B, C (uppercase) throughout.**

---

## Session history

| Session | Summary |
|---------|---------|
| 1--14 | Iterative build of old architecture. LessonPage, TeacherHomePage, StudentLessonPage built and refined. |
| 15 | Student lesson page. Weather exercise with icon select. |
| 16 | Header redesign. Various fixes. |
| 17 | Blank-slate rewrite. New architecture: two-layer model, new URL structure, new data layer. 78 static pages. Build clean. Deployed. |
| 18 | Full visual design pass. Teacher homepage redesigned (dropdowns + stats line). Snapshot card: descriptive metric labels, FX cross rates, badges top-right, cyan release number, student mode prompt. Teaching Notes: navy dot bullets, section dividers, checkboxes on questions and prompts, ?q= and ?d= URL encoding, student auto-reveal. Bar charts for GDP and Trade. Header tinted by role. Landing page: new headline, orange "live data", single entry point. Humour/humanity principle established. |

---

## To-do list

- **Two-password system:** Teacher password and student password, checked against URL role prefix. Students cannot access `/teacher/` pages.
- **AI-generated country-specific questions and prompts:** `sync_edu.py` calls Claude API for each of the 36 cards, generating tailored `sampleQuestions` and `discussionPrompts` using country data as context. Output stored in `metrics.js`. Current UK-only questions in `aqa-alevel.js` serve as reference. (Option C agreed.)
- **Rotating humorous greeting on teacher homepage:** 50 lines, dry/wry tone, treats teacher as intelligent adult. Examples: "Your students think you just know this stuff. Let's keep it that way." / "The IMF doesn't make it this easy." Small Instrument Serif italic, muted colour, above the card. Refreshes on every visit.
- **Exchange rate 5% movement filter:** Only include exchange rate entries in feed/stats if currency moved >5% vs USD (or DXY for USD). Logic in `sync_edu.py`, not in component.
- **Pipeline fix — value vs chart last point:** `sync_edu.py` must ensure last element of `chartSeries` matches `value` exactly. (e.g. US unemployment showed 4.2% value but 4.4% as last chart point.)
- **`sync_edu.py` rewrite:** Write `metrics.js` (new format) instead of `edu-data.json`.
- **Blurbs for all 36 cards:** Currently only UK has blurbs. Pipeline-based generation for all cards.
- **Glossary layer:** 300--400 terms, two diagram renderer types (curve renderer, flow diagram renderer).
- **Upcoming curricula:** Cambridge IGCSE, India CBSE (strategic priority at scale).
- **Long-term:** Multilingual expansion, mobile app, data layer API, AI-assisted live assessment.
