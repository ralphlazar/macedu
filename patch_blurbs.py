import re, json

MACEDU = '/Users/lisaswerling/RALPH/AI/macedu/app/data/metrics.js'

# Rule: exactly 3 bullets per blurb. No prose anywhere.
UK_BLURBS = {
    'inflation': [
        "Inflation is falling but has not landed. At 2.5%, it remains above the Bank of England's 2% target.",
        "Services inflation is the stubborn part. Wage growth is keeping price pressure alive in the non-goods economy.",
        "The last mile is always the hardest. Disinflation slows as it approaches target.",
    ],
    'unemployment': [
        "Unemployment has drifted up from its post-pandemic low of 3.7%. The direction is the story, not the level.",
        "At 4.4%, the rate is not alarming in isolation, but a rising trend signals the labour market is cooling.",
        "Higher interest rates are likely a factor: firms are hiring less as borrowing costs and uncertainty bite.",
    ],
    'gdp': [
        "The economy is growing, but only just. Output at this level is positive in name only.",
        "Well below the long-run trend of around 2% annually. The economy is not in recession, but it is not far from one.",
        "Business investment remains weak and consumer confidence is fragile. Growth is unlikely to accelerate quickly.",
    ],
    'interest-rates': [
        "The Bank of England has been cutting gradually from its 5.25% peak, with rates now at 4.5%.",
        "Further cuts are signalled, but the pace is cautious. Inflation above target limits how fast the MPC can move.",
        "The Bank is balancing the risk of cutting too soon against the cost of holding rates too long on a weakening economy.",
    ],
    'exchange-rates': [
        "Sterling is trading at 1.29 against the dollar, having strengthened modestly in recent months.",
        "A stronger pound is good news for consumers and firms with dollar costs, but squeezes UK exporters.",
        "Currency moves at this scale are driven more by interest rate expectations than by trade flows.",
    ],
    'trade': [
        "The UK runs a persistent current account deficit of around 3% of GDP. It has done so for decades.",
        "The deficit reflects an economy that imports more than it exports and finances the gap with foreign investment.",
        "Stable and financeable for now, but not a position of strength if global risk appetite turns against sterling.",
    ],
}

with open(MACEDU, 'r') as f:
    content = f.read()

# For each concept, replace the UK blurb prose string with the array
for concept, bullets in UK_BLURBS.items():
    # Build the JS array string
    arr_lines = '[\n'
    for i, b in enumerate(bullets):
        comma = ',' if i < len(bullets) - 1 else ''
        arr_lines += f'          "{b}"{comma}\n'
    arr_lines += '        ]'

    # Match the existing blurb line in the uk block for this concept
    # Strategy: find the concept block, then find the uk blurb line within it
    # and replace it with the array
    pattern = r'(blurb: ")([^"]+)(")'

    # We need to be surgical -- find the right occurrence
    # Locate the concept section, then the uk sub-section, then replace blurb
    concept_idx = content.find(f'"{ concept }":')
    if concept_idx == -1:
        concept_idx = content.find(f'"{concept}":')
    if concept_idx == -1:
        print(f'Could not find concept: {concept}')
        continue

    uk_idx = content.find('"uk":', concept_idx)
    if uk_idx == -1:
        print(f'Could not find uk block in {concept}')
        continue

    # Find blurb line after uk_idx
    blurb_idx = content.find('blurb:', uk_idx)
    if blurb_idx == -1:
        print(f'Could not find blurb in {concept}/uk')
        continue

    # Find end of blurb line (next newline after closing quote)
    line_end = content.find('\n', blurb_idx)
    old_line = content[blurb_idx:line_end]

    new_line = f'blurb: {arr_lines},'
    content = content[:blurb_idx] + new_line + content[line_end:]
    print(f'Patched: {concept}/uk')

with open(MACEDU, 'w') as f:
    f.write(content)

print('\nDone.')
