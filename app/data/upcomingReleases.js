// upcomingReleases.js
// Static calendar of scheduled macro data releases.
// Updated monthly -- check ONS, BLS, Eurostat, ECB release calendars.
// daysFromNow: days from today (0 = today, 1 = tomorrow, etc.)
// This file is maintained manually, not by sync_edu.py.

// NOTE FOR MAINTAINERS:
// Replace daysFromNow values each month based on the official release calendars:
//   UK CPI / ONS:    https://www.ons.gov.uk/releases
//   US CPI / BLS:    https://www.bls.gov/schedule/news_release/cpi.htm
//   US GDP / BEA:    https://www.bea.gov/news/schedule
//   Eurostat:        https://ec.europa.eu/eurostat/news/release-calendar
//   ECB:             https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html
//   Bank of England: https://www.bankofengland.co.uk/monetary-policy/upcoming-mpc-dates

export const upcomingReleases = [
  {
    flag: '🇬🇧',
    country: 'United Kingdom',
    releaseName: 'CPI inflation (March)',
    conceptSlug: 'inflation',
    daysFromNow: 2,
  },
  {
    flag: '🇺🇸',
    country: 'United States',
    releaseName: 'CPI inflation (March)',
    conceptSlug: 'inflation',
    daysFromNow: 3,
  },
  {
    flag: '🇬🇧',
    country: 'United Kingdom',
    releaseName: 'Labour market statistics',
    conceptSlug: 'unemployment',
    daysFromNow: 5,
  },
  {
    flag: '🇪🇺',
    country: 'Eurozone',
    releaseName: 'ECB interest rate decision',
    conceptSlug: 'interest-rates',
    daysFromNow: 7,
  },
  {
    flag: '🇺🇸',
    country: 'United States',
    releaseName: 'GDP advance estimate (Q1)',
    conceptSlug: 'gdp',
    daysFromNow: 10,
  },
  {
    flag: '🇬🇧',
    country: 'United Kingdom',
    releaseName: 'Bank Rate decision (MPC)',
    conceptSlug: 'interest-rates',
    daysFromNow: 13,
  },
  {
    flag: '🇧🇷',
    country: 'Brazil',
    releaseName: 'IPCA inflation (March)',
    conceptSlug: 'inflation',
    daysFromNow: 14,
  },
];
