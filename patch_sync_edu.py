#!/usr/bin/env python3
import re

PATH = '/Users/lisaswerling/RALPH/AI/macrosnaps/sync_edu.py'

with open(PATH, encoding='utf-8') as f:
    src = f.read()

# ── 1. Rewrite inflation icon strings ────────────────────────────────────────
old = """def inflation_icon_label(country, val, direction):
    target = INFLATION_TARGETS.get(country, 2.0)
    name   = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'Good example of missing inflation data. Worth discussing why data gaps occur.'
    diff = val - target
    if abs(diff) <= 0.3:
        return 'sunny',  f'Good example of inflation on target. {name} CPI is sitting right where the central bank wants it.'
    elif diff > 0:
        if direction == 'up':
            return 'stormy', f'Good example of a central bank under pressure. {name} inflation is above target and still rising.'
        else:
            return 'cloudy', f'Good example of inflation coming under control. {name} CPI is above target but heading in the right direction.'
    else:
        if direction == 'down':
            return 'cloudy', f'Good example of below-target inflation. {name} CPI is low and falling, raising questions about deflation risk.'
        else:
            return 'sunny',  f'Good example of inflation running slightly cool. {name} CPI is just below target.'"""

new = """def inflation_icon_label(country, val, direction):
    target = INFLATION_TARGETS.get(country, 2.0)
    name   = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'No inflation data available for {name} right now.'
    diff = val - target
    if abs(diff) <= 0.3:
        return 'sunny',  f'Inflation is right on the {name} central bank target -- that is a sunny read.'
    elif diff > 0:
        if direction == 'up':
            return 'stormy', f'Inflation in {name} is above target and still rising -- stormy.'
        else:
            return 'cloudy', f'Inflation in {name} is above target but falling -- cloudy, heading in the right direction.'
    else:
        if direction == 'down':
            return 'cloudy', f'Inflation in {name} is below target and still dropping -- deflation risk makes this cloudy.'
        else:
            return 'sunny',  f'Inflation in {name} is just below target and stable -- close enough to call it sunny.'"""

assert old in src, "FAILED: inflation block not found"
src = src.replace(old, new)

# ── 2. Rewrite unemployment icon strings ─────────────────────────────────────
old = """def unemployment_icon_label(country, val, direction):
    structural = STRUCTURAL_U.get(country, 5.0)
    name       = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'Good example of missing labour market data. Worth discussing measurement challenges.'
    diff = val - structural
    if diff <= 0.3:
        return 'sunny',  f'Good example of a tight labour market. {name} unemployment is at or below its normal level.'
    elif diff <= 2.0:
        if direction == 'up':
            return 'stormy', f'Good example of a weakening labour market. {name} unemployment is rising above its structural rate.'
        else:
            return 'cloudy', f'Good example of elevated unemployment. {name} is above its structural rate but improving.'
    else:
        return 'stormy', f'Good example of a labour market under serious strain. {name} unemployment is well above its normal level.'"""

new = """def unemployment_icon_label(country, val, direction):
    structural = STRUCTURAL_U.get(country, 5.0)
    name       = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'No unemployment data available for {name} right now.'
    diff = val - structural
    if diff <= 0.3:
        return 'sunny',  f'Unemployment in {name} is at or below its normal level -- a sunny labour market.'
    elif diff <= 2.0:
        if direction == 'up':
            return 'stormy', f'Unemployment in {name} is above its normal level and rising -- that is a stormy read.'
        else:
            return 'cloudy', f'Unemployment in {name} is above its normal level but improving -- cloudy for now.'
    else:
        return 'stormy', f'Unemployment in {name} is well above its normal level -- stormy.'"""

assert old in src, "FAILED: unemployment block not found"
src = src.replace(old, new)

# ── 3. Rewrite GDP icon strings ───────────────────────────────────────────────
old = """def gdp_icon_label(country, val, direction):
    trend = GDP_TREND.get(country, 2.0)
    name  = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'Good example of missing growth data. Worth discussing GDP measurement.'
    if val < 0:
        return 'stormy', f'Good example of a contracting economy. {name} is in negative growth territory right now.'
    elif val >= trend * 0.75:
        return 'sunny',  f'Good example of healthy growth. {name} is expanding at or above its trend rate.'
    else:
        return 'cloudy', f'Good example of sluggish growth. {name} is growing but well below its historical trend.'"""

new = """def gdp_icon_label(country, val, direction):
    trend = GDP_TREND.get(country, 2.0)
    name  = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'No GDP data available for {name} right now.'
    if val < 0:
        return 'stormy', f'The {name} economy is shrinking -- negative growth is a stormy read.'
    elif val >= trend * 0.75:
        return 'sunny',  f'{name} is growing at or near its normal rate -- that is a sunny read.'
    else:
        return 'cloudy', f'{name} is growing, but well below its usual pace -- cloudy.'"""

assert old in src, "FAILED: gdp block not found"
src = src.replace(old, new)

# ── 4. Rewrite interest rate icon strings ────────────────────────────────────
old = """def interest_icon_label(country, val, direction):
    name = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'Good example of missing monetary policy data.'
    if val <= 1.0:
        return 'sunny',  f'Good example of loose monetary policy. {name} rates are very low, designed to stimulate the economy.'
    elif val <= 4.0:
        if direction == 'down':
            return 'sunny',  f'Good example of a central bank easing. {name} is cutting rates as inflation comes under control.'
        elif direction == 'up':
            return 'cloudy', f'Good example of a central bank tightening. {name} is raising rates to bear down on inflation.'
        else:
            return 'cloudy', f'Good example of a central bank on hold. {name} is watching the data before moving rates.'
    else:
        return 'stormy', f'Good example of restrictive monetary policy. {name} rates are high and squeezing the economy.'"""

new = """def interest_icon_label(country, val, direction):
    name = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'No interest rate data available for {name} right now.'
    if val <= 1.0:
        return 'sunny',  f'{name} rates are very low -- cheap borrowing is designed to boost the economy, a sunny signal.'
    elif val <= 4.0:
        if direction == 'down':
            return 'sunny',  f'{name} is cutting rates -- the central bank thinks inflation is under control, a sunny read.'
        elif direction == 'up':
            return 'cloudy', f'{name} is raising rates to fight inflation -- tightening makes this cloudy.'
        else:
            return 'cloudy', f'{name} rates are on hold -- the central bank is waiting for more data, cloudy.'
    else:
        return 'stormy', f'{name} rates are high and squeezing borrowing -- that is a stormy read.'"""

assert old in src, "FAILED: interest block not found"
src = src.replace(old, new)

# ── 5. Rewrite FX icon strings ────────────────────────────────────────────────
old = """def fx_icon_label(country, val, direction):
    name = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'Good example of missing exchange rate data.'
    if direction == 'up':
        return 'cloudy', f'Good example of currency appreciation. The {name} currency is strengthening, which helps importers but hurts exporters.'
    elif direction == 'down':
        return 'cloudy', f'Good example of currency depreciation. The {name} currency is weakening, which helps exporters but raises import costs.'
    else:
        return 'sunny',  f'Good example of a stable exchange rate. The {name} currency is holding steady against the dollar.'"""

new = """def fx_icon_label(country, val, direction):
    name = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'No exchange rate data available for {name} right now.'
    if direction == 'up':
        return 'cloudy', f'The {name} currency is strengthening -- good for importers, bad for exporters, so cloudy overall.'
    elif direction == 'down':
        return 'cloudy', f'The {name} currency is weakening -- helps exporters but pushes up import costs, cloudy.'
    else:
        return 'sunny',  f'The {name} exchange rate is holding steady -- stability is a sunny signal.'"""

assert old in src, "FAILED: fx block not found"
src = src.replace(old, new)

# ── 6. Rewrite trade icon strings ─────────────────────────────────────────────
old = """def trade_icon_label(country, val, direction):
    name = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'Good example of missing current account data.'
    if abs(val) <= 1.0:
        return 'sunny',  f'Good example of a broadly balanced current account. {name} is neither heavily importing nor exporting on net.'
    elif val > 0:
        if abs(val) > 4.0:
            return 'sunny', f'Good example of a large current account surplus. {name} is selling significantly more to the world than it is buying.'
        return 'sunny',     f'Good example of a current account surplus. {name} is selling more to the world than it is buying.'
    elif abs(val) <= 4.0:
        return 'cloudy', f'Good example of a current account deficit. {name} is buying more from the world than it is selling.'
    else:
        return 'stormy', f'Good example of a large current account deficit. {name} is running a significant external imbalance.'"""

new = """def trade_icon_label(country, val, direction):
    name = COUNTRY_NAMES[country]
    if val is None:
        return 'cloudy', f'No current account data available for {name} right now.'
    if abs(val) <= 1.0:
        return 'sunny',  f'{name} imports and exports are broadly balanced -- a sunny read.'
    elif val > 0:
        if abs(val) > 4.0:
            return 'sunny', f'{name} is selling far more to the world than it buys -- a large surplus, sunny.'
        return 'sunny',     f'{name} is selling more to the world than it buys -- a surplus is a sunny read.'
    elif abs(val) <= 4.0:
        return 'cloudy', f'{name} is buying more from the world than it sells -- a deficit makes this cloudy.'
    else:
        return 'stormy', f'{name} has a large current account deficit -- a significant imbalance, stormy.'"""

assert old in src, "FAILED: trade block not found"
src = src.replace(old, new)

# ── 7. Add correctIcon and rename reveal → weatherReason in countries_out ─────
old = """        countries_out[country_slug] = {
            'flag':            flag,
            'name':            name,
            'value':           value_str,
            'direction':       direction,
            'releasedDaysAgo': released_days_ago,
            'icon':            icon,
            'reveal':          reveal,
            'blurb':           blurb,
            'chartDates':      chart_dates,
            'chartSeries':     chart_series,
            'movePercent':     move_percent,
        }"""

new = """        countries_out[country_slug] = {
            'flag':            flag,
            'name':            name,
            'value':           value_str,
            'direction':       direction,
            'releasedDaysAgo': released_days_ago,
            'icon':            icon,
            'correctIcon':     icon_slug_val,
            'weatherReason':   reveal,
            'blurb':           blurb,
            'chartDates':      chart_dates,
            'chartSeries':     chart_series,
            'movePercent':     move_percent,
        }"""

assert old in src, "FAILED: countries_out block not found"
src = src.replace(old, new)

# ── 8. Update docstring to remove 'reveal' reference ─────────────────────────
src = src.replace(
    "  - Snapshot: value, direction, releasedDaysAgo, icon, reveal per country",
    "  - Snapshot: value, direction, releasedDaysAgo, icon, correctIcon, weatherReason per country"
)

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(src)

print("sync_edu.py patched OK")
