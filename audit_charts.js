const m = require('./app/data/metrics.js');
const metrics = ['inflation','unemployment','gdp','interest-rates','exchange-rates','trade'];
const countries = ['uk','us','eurozone','china','japan','brazil'];
let clean = 0;

for (const metric of metrics) {
  for (const country of countries) {
    const entry = m[metric] && m[metric][country];
    if (!entry) { console.log('[MISSING] ', metric, country); continue; }
    const cs = entry.chartSeries || [];
    const nulls = cs.filter(function(p) { return p.value === null || p.value === undefined; }).length;
    if (cs.length === 0) {
      console.log('[EMPTY]   ', metric, country);
    } else if (nulls === cs.length) {
      console.log('[ALL NULL]', metric, country, '(' + cs.length + ' pts)');
    } else if (nulls > 0) {
      console.log('[PARTIAL] ', metric, country, nulls + '/' + cs.length + ' null');
    } else {
      clean++;
    }
  }
}
console.log('\nClean entries: ' + clean + '/36');
