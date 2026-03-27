export const lesson = {

  inflation: {
    exercisePrompt: 'Based on what you can see -- what icon would you give this economy right now?',
    exerciseOptions: [
      { icon: '☀️', label: 'At or near target',  cls: 'sunny'  },
      { icon: '☁️', label: 'Mixed picture',       cls: 'cloudy' },
      { icon: '⛈️', label: 'Significant concern', cls: 'stormy' },
    ],
    classroomTime: {
      five:   'Discuss what\'s going on in the chart.',
      ten:    'Add the Weather Icon exercise.',
      twenty: 'Full activity with a written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q:    'Is monetary policy working to bring UK inflation back to target?',
        hint: 'Listen for: the difference between inflation falling and inflation reaching target. Disinflation is not the same as success.',
      },
      {
        q:    'Why has UK inflation proved sticky above the 2% target?',
        hint: 'Listen for: services inflation vs goods inflation, wage growth feeding into costs, and energy price base effects unwinding.',
      },
      {
        q:    'What are the likely effects of persistent above-target inflation on households with variable-rate mortgages?',
        hint: 'Listen for: real income squeeze, higher mortgage payments, reduced discretionary spending, and distributional effects between owners and renters.',
      },
    ],
    discussionPrompts: [
      'Disinflation vs deflation: what is the difference and why does it matter?',
      'Demand-pull vs cost-push: which better explains the current UK inflation situation?',
      'Should central banks target 2% inflation, or would a higher target make macroeconomic management easier?',
    ],
  },

  unemployment: {
    exercisePrompt: "Based on what you can see -- what icon would you give this economy's labour market right now?",
    exerciseOptions: [
      { icon: '☀️', label: 'Near or below structural rate',  cls: 'sunny'  },
      { icon: '☁️', label: 'Elevated or rising',             cls: 'cloudy' },
      { icon: '⛈️', label: 'Significantly above structural', cls: 'stormy' },
    ],
    classroomTime: {
      five:   'Discuss what\'s going on in the chart.',
      ten:    'Add the Weather Icon exercise.',
      twenty: 'Full activity with a written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q:    'Is the rise in UK unemployment a sign of cyclical weakness or a structural shift in the labour market?',
        hint: 'Listen for: whether students can distinguish demand-deficient unemployment from structural change, and what evidence would distinguish the two.',
      },
      {
        q:    'How might higher interest rates contribute to rising unemployment?',
        hint: 'Listen for: the transmission mechanism -- higher rates reduce investment and consumption, which reduces demand for labour.',
      },
      {
        q:    'Assess the view that a low unemployment rate is always a sign of a healthy economy.',
        hint: 'Listen for: underemployment, discouraged workers, zero-hours contracts, and the distinction between the headline rate and labour market quality.',
      },
    ],
    discussionPrompts: [
      'What distinguishes cyclical from structural unemployment, and why does the distinction matter for policy?',
      'Is full employment a realistic policy target, or does some unemployment serve a useful economic function?',
      "How does the UK's current unemployment rate compare with its long-run average, and what does the trend suggest?",
    ],
  },

  gdp: {
    exercisePrompt: "Based on what you can see -- what icon would you give this economy's growth right now?",
    exerciseOptions: [
      { icon: '☀️', label: 'Growing above trend',      cls: 'sunny'  },
      { icon: '☁️', label: 'Slowing or recovering',    cls: 'cloudy' },
      { icon: '⛈️', label: 'Contracting or recession', cls: 'stormy' },
    ],
    classroomTime: {
      five:   'Discuss what\'s going on in the chart.',
      ten:    'Add the Weather Icon exercise.',
      twenty: 'Full activity with a written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q:    "What does a GDP growth rate of 0.1% per quarter tell us about the UK's economic trajectory?",
        hint: 'Listen for: the difference between positive growth and trend growth, the risk of stagnation, and what the output gap implies for policy.',
      },
      {
        q:    'Why might GDP growth be a misleading measure of national wellbeing?',
        hint: 'Listen for: distribution of gains, environmental costs, unpaid work, and alternatives such as HDI or wellbeing indices.',
      },
      {
        q:    "To what extent can monetary policy alone restore UK growth to its long-run trend rate?",
        hint: 'Listen for: the limits of demand-side policy on supply-side problems, and the case for structural reform alongside rate cuts.',
      },
    ],
    discussionPrompts: [
      'Is GDP growth the right measure of economic success, or should governments pursue wellbeing measures instead?',
      "Demand-side vs supply-side: which approach is more likely to raise the UK's long-run growth rate?",
      'What are the risks of a prolonged period of near-zero growth, even if it stops short of recession?',
    ],
  },

  'interest-rates': {
    exercisePrompt: "Given what you know about this country's inflation and growth -- what would you expect this central bank to do next?",
    exerciseOptions: [
      { icon: '☀️', label: 'Raise rates', cls: 'sunny'  },
      { icon: '☁️', label: 'Hold rates',  cls: 'cloudy' },
      { icon: '⛈️', label: 'Cut rates',   cls: 'stormy' },
    ],
    classroomTime: {
      five:   'Discuss what\'s going on in the chart.',
      ten:    'Add the Weather Icon exercise.',
      twenty: 'Full activity with a written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q:    'Explain the transmission mechanism through which a cut in the Bank Rate might increase consumer spending.',
        hint: 'Listen for: the chain from Bank Rate to mortgage rates to disposable income to spending -- and the lags at each stage.',
      },
      {
        q:    'Why might the Bank of England cut rates even when inflation remains above the 2% target?',
        hint: 'Listen for: forward-looking policy, the growth-inflation trade-off, and the argument that rates act with a lag so cutting now targets future inflation.',
      },
      {
        q:    'Compare the current monetary policy stance of the Bank of England and the Bank of Japan. What accounts for the difference?',
        hint: 'Listen for: Japan normalising after decades of near-zero rates and deflation, while the UK is easing from a high. Different histories, different directions.',
      },
    ],
    discussionPrompts: [
      'Is monetary policy an effective tool for controlling inflation, or do the long and variable lags limit its usefulness?',
      'What are the distributional effects of higher interest rates, and who bears the greatest burden?',
      'At what point does tight monetary policy risk tipping an economy into recession?',
    ],
  },

  'exchange-rates': {
    exercisePrompt: 'This currency has moved against the dollar over the past month. Based on the direction -- who gains and who loses?',
    exerciseOptions: [
      { icon: '☀️', label: 'Good for importers', cls: 'sunny'  },
      { icon: '☁️', label: 'Mixed / depends',    cls: 'cloudy' },
      { icon: '⛈️', label: 'Bad for exporters',  cls: 'stormy' },
    ],
    classroomTime: {
      five:   'Discuss what\'s going on in the chart.',
      ten:    'Add the Weather Icon exercise.',
      twenty: 'Full activity with a written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q:    'Explain how a depreciation of the pound affects UK consumers and UK exporters differently.',
        hint: 'Listen for: imports become more expensive for consumers, exports become cheaper for foreign buyers -- students should name specific sectors.',
      },
      {
        q:    'Why might a central bank choose to intervene in the foreign exchange market?',
        hint: 'Listen for: to prevent excessive volatility, protect import prices, or defend a peg -- and the limits of intervention against market pressure.',
      },
      {
        q:    'The J-curve effect suggests a depreciation may worsen the trade balance before it improves it. Explain why.',
        hint: 'Listen for: contracts are fixed in the short run so volumes do not adjust immediately, but prices do -- the value of imports rises before export volumes respond.',
      },
    ],
    discussionPrompts: [
      'Should the UK prefer a strong or a weak pound? Is there a right answer?',
      'Floating vs managed exchange rates: what are the trade-offs?',
      'How does purchasing power parity help explain long-run exchange rate movements, and what are its limitations?',
    ],
  },

  trade: {
    exercisePrompt: "Based on this country's current account position -- is this a sign of a healthy economy or a cause for concern?",
    exerciseOptions: [
      { icon: '☀️', label: 'Not concerning',    cls: 'sunny'  },
      { icon: '☁️', label: 'Watch closely',     cls: 'cloudy' },
      { icon: '⛈️', label: 'Cause for concern', cls: 'stormy' },
    ],
    classroomTime: {
      five:   'Discuss what\'s going on in the chart.',
      ten:    'Add the Weather Icon exercise.',
      twenty: 'Full activity with a written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q:    "Is a current account deficit always harmful to an economy? Use evidence from the UK to support your answer.",
        hint: "Listen for: financing matters as much as the deficit itself -- if it attracts productive FDI it may not be harmful. The UK's deficit has been stable and financed for decades.",
      },
      {
        q:    "Explain why a current account deficit of 1.8% of GDP might be more concerning for Brazil than a deficit of 3.1% is for the UK.",
        hint: 'Listen for: currency vulnerability, external debt levels, depth of capital markets, and the role of the pound vs the real as reserve currencies.',
      },
      {
        q:    "What are the likely causes of the UK's persistent current account deficit?",
        hint: 'Listen for: deindustrialisation reducing export capacity, strong consumer demand for imports, and the shift to a services-led economy with lower export intensity.',
      },
    ],
    discussionPrompts: [
      'Is free trade always beneficial, or are there circumstances where protectionism can be justified?',
      'What does it mean for a country to finance a current account deficit, and what long-run risks does that create?',
      'Comparative advantage argues that trade benefits all participants. Does the current global trade picture support this view?',
    ],
  },

}
