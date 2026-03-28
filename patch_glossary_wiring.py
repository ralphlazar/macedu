BASE = '/Users/lisaswerling/RALPH/AI/macedu/app'

def patch(path, replacements, label):
    with open(path, 'r') as f:
        src = f.read()
    original = src
    for old, new in replacements:
        if old not in src:
            print(f'  ✗ NOT FOUND in {label}: {repr(old[:60])}')
            continue
        src = src.replace(old, new, 1)
    if src != original:
        with open(path, 'w') as f:
            f.write(src)
        print(f'✓ {label} patched')
    else:
        print(f'  (no changes written to {label})')

# ── SnapshotCard.js ───────────────────────────────────────────────────────────

patch(
    f'{BASE}/components/SnapshotCard.js',
    [
        # 1. Add import
        (
            "import TradeChart from './TradeChart'",
            "import TradeChart from './TradeChart'\nimport { wrapGlossaryTerms } from '../utils/wrapGlossaryTerms'",
        ),
        # 2. Wrap blurb bullet text
        (
            "              <span>{point}</span>",
            "              <span>{wrapGlossaryTerms(point)}</span>",
        ),
    ],
    'SnapshotCard.js',
)

# ── LessonOverlay.js ──────────────────────────────────────────────────────────

patch(
    f'{BASE}/components/LessonOverlay.js',
    [
        # 1. Add import
        (
            "import { useSearchParams } from 'next/navigation'",
            "import { useSearchParams } from 'next/navigation'\nimport { wrapGlossaryTerms } from '../utils/wrapGlossaryTerms'",
        ),
        # 2. Chart discussion bullet
        (
            "                  <span style={{ color: PINK }}>{point}</span>",
            "                  <span style={{ color: PINK }}>{wrapGlossaryTerms(point)}</span>",
        ),
        # 3. Teacher sample question q text
        (
            "                <div style={{ fontSize: 14, color: NAVY, lineHeight: 1.5 }}>\n                  {String.fromCharCode(65 + i)}. {item.q}\n                </div>",
            "                <div style={{ fontSize: 14, color: NAVY, lineHeight: 1.5 }}>\n                  {String.fromCharCode(65 + i)}. {wrapGlossaryTerms(item.q)}\n                </div>",
        ),
        # 4. Teacher discussion prompt text
        (
            "                  <div style={{ fontSize: 14, color: NAVY, lineHeight: 1.55 }}>\n                    {String.fromCharCode(65 + i)}. {promptText}\n                  </div>",
            "                  <div style={{ fontSize: 14, color: NAVY, lineHeight: 1.55 }}>\n                    {String.fromCharCode(65 + i)}. {wrapGlossaryTerms(promptText)}\n                  </div>",
        ),
        # 5. Student question q text
        (
            "              <div key={qi} style={{ fontSize: 14, color: NAVY, lineHeight: 1.5, marginBottom: 16 }}>\n                {String.fromCharCode(65 + i)}. {item.q}\n              </div>",
            "              <div key={qi} style={{ fontSize: 14, color: NAVY, lineHeight: 1.5, marginBottom: 16 }}>\n                {String.fromCharCode(65 + i)}. {wrapGlossaryTerms(item.q)}\n              </div>",
        ),
        # 6. Student discussion prompt text
        (
            "              <div key={di} style={{ fontSize: 14, color: NAVY, lineHeight: 1.55, marginBottom: 12 }}>\n                {String.fromCharCode(65 + i)}. {promptText}\n              </div>",
            "              <div key={di} style={{ fontSize: 14, color: NAVY, lineHeight: 1.55, marginBottom: 12 }}>\n                {String.fromCharCode(65 + i)}. {wrapGlossaryTerms(promptText)}\n              </div>",
        ),
    ],
    'LessonOverlay.js',
)
