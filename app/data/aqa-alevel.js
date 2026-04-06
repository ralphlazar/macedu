// Rule: keyPoints and notes arrays must contain exactly 3 bullets each. No more, no less.
export const lesson = {

  inflation: {
    exercisePrompt: 'Based on what you can see, what icon would you give this economy right now?',
    exerciseOptions: [
      { icon: '☀️', label: 'At or near target',  cls: 'sunny'  },
      { icon: '☁️', label: 'Mixed picture',       cls: 'cloudy' },
      { icon: '⛈️', label: 'Significant concern', cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows the year-on-year change in consumer prices: how much more expensive a typical basket of goods is compared with a year ago.',
      "The 2% target line is the Bank of England's mandate. Above it means inflation is still a problem; below it raises deflation risk.",
      'Watch the direction as much as the level. A falling line means disinflation (slowing price rises), not falling prices.',
      'Students often say inflation falling means prices are falling. It does not. Prices are still rising, just more slowly.',
    ],
    classroomTime: {
      five:   "Discuss what's going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: 'Is monetary policy working to bring UK inflation back to target?',
        keyPoints: [
          'Disinflation is not the same as success. Inflation falling is not the same as reaching 2%.',
          'Rate cuts may be premature if services inflation and wage growth remain elevated.',
          'The Bank targets inflation 12 to 18 months ahead, not today. Policy acts with a significant lag.',
        ],
      },
      {
        q: 'Why has UK inflation proved sticky above the 2% target?',
        keyPoints: [
          'Services inflation is driven by wage growth, which has remained well above 5%.',
          'Goods inflation has eased but energy base effects are fading, removing a disinflationary tailwind.',
          'Post-Brexit supply-side frictions have added structural upward pressure on import costs.',
        ],
      },
      {
        q: 'What are the likely effects of persistent above-target inflation on households with variable-rate mortgages?',
        keyPoints: [
          'Real incomes fall as wages lag price rises, squeezing discretionary spending.',
          'Higher mortgage payments reduce net disposable income directly and immediately.',
          'Renters are insulated from mortgage rate risk but face rising rents as landlord costs pass through.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'Disinflation vs deflation: what is the difference and why does it matter?',
        notes: [
          'Disinflation is slowing price growth; deflation is falling prices. Students conflate them constantly.',
          'Deflation sounds good but is dangerous: consumers delay purchases expecting further falls, investment collapses, and debt burdens rise in real terms. Japan in the 1990s is the textbook case.',
          'Strong answers will explain why central banks fear deflation more than moderate inflation.',
        ],
      },
      {
        p: 'Demand-pull vs cost-push: which better explains the current UK inflation situation?',
        notes: [
          'Neither alone is sufficient. The honest answer is both played a role at different stages.',
          'Cost-push dominated early: energy prices and supply chain disruption after Covid and the Ukraine war. Demand-pull followed as pandemic savings were spent and the labour market tightened.',
          'Strong answers will distinguish the two phases and note that the policy response is the same either way (raise rates), even though the underlying cause differs.',
        ],
      },
      {
        p: 'Should central banks target 2% inflation, or would a higher target make macroeconomic management easier?',
        notes: [
          'The case for a higher target (say 4%) is that it gives central banks more room to cut rates before hitting zero, avoiding the trap Japan and the eurozone fell into.',
          'The case against is credibility. Shifting the target once raises the question of whether it will be shifted again, and inflation expectations could become unanchored.',
          'Strong answers will engage with the trade-off between flexibility and credibility rather than treating 2% as obviously correct.',
        ],
      },
    ],
  },

  unemployment: {
    exercisePrompt: "Based on what you can see, what icon would you give this economy's labour market right now?",
    exerciseOptions: [
      { icon: '☀️', label: 'Near or below structural rate',  cls: 'sunny'  },
      { icon: '☁️', label: 'Elevated or rising',             cls: 'cloudy' },
      { icon: '⛈️', label: 'Significantly above structural', cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows the ILO unemployment rate: the share of people actively looking for work but unable to find it.',
      'Around 4 to 5% is considered close to the structural rate for the UK. Below that, labour markets are tight and wage pressure tends to build.',
      'A rising trend matters more than the level. Even a low rate is concerning if it has been climbing for several months.',
      'Students often miss that people who have stopped looking for work are not counted. The headline rate can paint a more flattering picture than the reality.',
    ],
    classroomTime: {
      five:   "Discuss what's going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: 'Is the rise in UK unemployment a sign of cyclical weakness or a structural shift in the labour market?',
        keyPoints: [
          'Cyclical case: demand weakness from higher rates and squeezed real incomes is reducing hiring.',
          'Structural case: long-term sickness, post-pandemic inactivity, and skills mismatches point to something deeper than a cycle.',
          'The distinction matters for policy. Rate cuts address cyclical unemployment; structural unemployment requires training and health reform.',
        ],
      },
      {
        q: 'How might higher interest rates contribute to rising unemployment?',
        keyPoints: [
          'Higher rates raise the cost of borrowing for firms, reducing investment and headcount.',
          'Consumer spending falls, reducing demand for goods and services and therefore labour.',
          'Rate rises act with a lag of 12 to 18 months, so the full employment effect may not yet be visible in the data.',
        ],
      },
      {
        q: 'Assess the view that a low unemployment rate is always a sign of a healthy economy.',
        keyPoints: [
          'Underemployment and zero-hours contracts can mask poor quality work behind a flattering headline rate.',
          'Discouraged workers who have stopped searching are excluded from the ILO measure entirely.',
          'Low unemployment alongside stagnant productivity growth is not a sign of genuine economic health.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'What distinguishes cyclical from structural unemployment, and why does the distinction matter for policy?',
        notes: [
          'Cyclical unemployment is caused by insufficient demand in the economy and responds to monetary and fiscal stimulus.',
          'Structural unemployment reflects a mismatch between the skills workers have and the skills employers need. Stimulus does not fix it.',
          'Strong answers will give a concrete example of each and explain why diagnosing the wrong type leads to the wrong policy response.',
        ],
      },
      {
        p: 'Is full employment a realistic policy target, or does some unemployment serve a useful economic function?',
        notes: [
          'Some economists argue a degree of unemployment (the natural rate or NAIRU) is necessary to prevent runaway wage inflation.',
          'Full employment is therefore typically defined as the level consistent with stable inflation, not zero unemployment.',
          'Strong answers will question whether the natural rate is fixed or can be lowered through better training, childcare, and labour market reform.',
        ],
      },
      {
        p: "How does the UK's current unemployment rate compare with its long-run average, and what does the trend suggest?",
        notes: [
          'The UK long-run average is around 5 to 6%. Rates consistently below that tend to generate wage pressure; rates above suggest spare capacity.',
          'The trend matters as much as the level. A rising rate, even from a low base, often signals deteriorating conditions ahead.',
          'Strong answers will avoid treating any single data point as definitive and will look for corroborating signals in wage growth and vacancies data.',
        ],
      },
    ],
  },

  gdp: {
    exercisePrompt: "Based on what you can see, what icon would you give this economy's growth right now?",
    exerciseOptions: [
      { icon: '☀️', label: 'Growing above trend',      cls: 'sunny'  },
      { icon: '☁️', label: 'Slowing or recovering',    cls: 'cloudy' },
      { icon: '⛈️', label: 'Contracting or recession', cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows year-on-year GDP growth: how much larger the economy is compared with the same quarter a year ago.',
      'Positive but low growth (under 1%) means the economy is stagnating. Not shrinking, but not generating meaningful new income either.',
      'Two consecutive quarters of negative growth is the technical definition of recession. Watch for that pattern in the trend.',
      'Students often assume a growing economy means most people are better off. GDP measures total output, not how gains are shared.',
    ],
    classroomTime: {
      five:   "Discuss what's going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: "What does near-zero annual GDP growth tell us about the UK's economic trajectory?",
        keyPoints: [
          'Positive but negligible. The economy is not contracting but is far below trend growth of around 2% annually.',
          'The output gap is likely negative, implying spare capacity and downward pressure on inflation.',
          'Stagnation risk: repeated near-zero quarters can become self-reinforcing as business investment dries up.',
        ],
      },
      {
        q: 'Why might GDP growth be a misleading measure of national wellbeing?',
        keyPoints: [
          'GDP measures output, not distribution. A growing economy can leave most households worse off.',
          'Environmental degradation and carbon emissions are not deducted from the headline figure.',
          'Unpaid care work, volunteering, and leisure are excluded entirely, despite contributing significantly to wellbeing.',
        ],
      },
      {
        q: "To what extent can monetary policy alone restore UK growth to its long-run trend rate?",
        keyPoints: [
          'Rate cuts support demand-side spending but cannot fix supply-side constraints such as low productivity.',
          'Poor infrastructure, planning bottlenecks, and skills gaps require structural reform, not monetary easing.',
          'Monetary policy is a blunt instrument. It affects all sectors equally, not the specific ones holding growth back.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'Is GDP growth the right measure of economic success, or should governments pursue wellbeing measures instead?',
        notes: [
          'GDP is a measure of economic activity, not welfare. It counts hospital visits and car crashes as positives because they generate spending.',
          'Alternatives like the HDI, the Genuine Progress Indicator, and the ONS wellbeing framework try to capture what GDP misses.',
          'Strong answers will acknowledge that GDP is useful precisely because it is simple and comparable across countries, then explain what it sacrifices to achieve that.',
        ],
      },
      {
        p: "Demand-side vs supply-side: which approach is more likely to raise the UK's long-run growth rate?",
        notes: [
          "The UK's growth problem is largely structural: low productivity, underinvestment, and a planning system that blocks housebuilding and infrastructure. These are supply-side constraints.",
          'Demand-side policy (fiscal stimulus, rate cuts) can close an output gap but cannot raise the trend rate of growth.',
          'Strong answers will distinguish between short-run stabilisation and long-run growth, and argue that the UK needs both but in the right sequence.',
        ],
      },
      {
        p: 'What are the risks of a prolonged period of near-zero growth, even if it stops short of recession?',
        notes: [
          'Stagnation erodes business confidence and suppresses investment, which itself reduces future productive capacity.',
          'Public finances deteriorate as tax revenues disappoint and welfare spending rises, narrowing the room for fiscal policy.',
          'Strong answers will make the point that near-zero growth compounding over a decade is as damaging as a sharp recession, just less visible.',
        ],
      },
    ],
  },

  'interest-rates': {
    exercisePrompt: "Given what you know about this country's inflation and growth, what would you expect this central bank to do next?",
    exerciseOptions: [
      { icon: '☀️', label: 'Raise rates', cls: 'sunny'  },
      { icon: '☁️', label: 'Hold rates',  cls: 'cloudy' },
      { icon: '⛈️', label: 'Cut rates',   cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows the policy rate set by the central bank: the rate at which it lends to commercial banks, which anchors all other borrowing rates in the economy.',
      'Higher rates make borrowing more expensive for households and firms, cooling demand and reducing inflationary pressure.',
      'The direction of travel matters. A rate that has been cut several times signals the central bank believes the inflation fight is largely won.',
      'Students often assume rate changes have immediate effects. In practice the full impact takes 12 to 18 months to feed through.',
    ],
    classroomTime: {
      five:   "Discuss what's going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: 'Explain the transmission mechanism through which a cut in the Bank Rate might increase consumer spending.',
        keyPoints: [
          'Lower Bank Rate feeds through to mortgage and loan rates, raising disposable income for borrowers.',
          'Cheaper credit encourages household and business borrowing, supporting consumption and investment.',
          'The effect is uneven and lagged. Borrowers gain, savers lose, and the full impact takes over a year to materialise.',
        ],
      },
      {
        q: 'Why might the Bank of England cut rates even when inflation remains above the 2% target?',
        keyPoints: [
          "Monetary policy acts with a lag, so cuts today are targeting inflation 12 to 18 months ahead, not today's figure.",
          'If the growth outlook deteriorates sharply, the balance of risks can shift toward supporting output.',
          'Forward guidance matters. The Bank signals future cuts to shape expectations and pull down long-term rates now.',
        ],
      },
      {
        q: 'Compare the current monetary policy stance of the Bank of England and the Bank of Japan. What accounts for the difference?',
        keyPoints: [
          'The BoE is easing from a post-2022 peak, responding to falling inflation and a weakening economy.',
          'The BoJ is tightening for the first time in decades, finally exiting negative rates as inflation returns.',
          'Japan spent 25 years fighting deflation; the UK is managing a post-pandemic inflation shock. Different histories, opposite policy directions.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'Is monetary policy an effective tool for controlling inflation, or do the long and variable lags limit its usefulness?',
        notes: [
          'The case for: monetary policy has a clear and credible transmission mechanism, and independent central banks have successfully anchored inflation expectations in most advanced economies.',
          'The case against: the lags are long and unpredictable, the effects are uneven across income groups, and monetary policy cannot address supply-side inflation at all.',
          'Strong answers will note that the 2021 to 2023 inflation episode was largely cost-push, which raised genuine questions about how much rate rises could actually do.',
        ],
      },
      {
        p: 'What are the distributional effects of higher interest rates, and who bears the greatest burden?',
        notes: [
          'Higher rates hurt borrowers (mortgage holders, indebted firms) and benefit savers. These groups are not evenly distributed across the income spectrum.',
          'Younger households are more likely to have variable-rate mortgages and less likely to hold significant savings, so rate rises are regressive in effect.',
          'Strong answers will connect this to the broader debate about whether monetary policy is the right tool when its costs fall so unevenly.',
        ],
      },
      {
        p: 'At what point does tight monetary policy risk tipping an economy into recession?',
        notes: [
          'This is the central dilemma of monetary policy: rates high enough to kill inflation may also kill growth.',
          "The risk is greatest when the economy is already slowing, debt levels are high, and consumer confidence is fragile. The UK's position in 2023 to 2024 illustrated all three.",
          'Strong answers will discuss the concept of a soft landing and why it is historically difficult to achieve.',
        ],
      },
    ],
  },

  'exchange-rates': {
    exercisePrompt: 'This currency has moved against the dollar over the past month. Based on the direction, who gains and who loses?',
    exerciseOptions: [
      { icon: '☀️', label: 'Good for importers', cls: 'sunny'  },
      { icon: '☁️', label: 'Mixed / depends',    cls: 'cloudy' },
      { icon: '⛈️', label: 'Bad for exporters',  cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows how many units of the foreign currency one unit of the domestic currency buys. A rising line means the domestic currency is appreciating.',
      'Appreciation makes imports cheaper and exports more expensive for foreign buyers. Depreciation does the opposite.',
      'Large moves in a short period signal something significant: a political shock, a rate decision, or a shift in global risk appetite.',
      'Students often assume a strong currency is good news. It depends entirely on whether the economy relies more on cheap imports or competitive exports.',
    ],
    classroomTime: {
      five:   "Discuss what's going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: 'Explain how a depreciation of the pound affects UK consumers and UK exporters differently.',
        keyPoints: [
          'Depreciation raises import prices, squeezing real incomes for households. Energy, food, and goods all cost more.',
          'UK exporters become more price-competitive in foreign markets, potentially boosting volumes and revenues.',
          'The net effect depends on the price elasticity of demand for UK exports and imports.',
        ],
      },
      {
        q: 'Why might a central bank choose to intervene in the foreign exchange market?',
        keyPoints: [
          'To dampen excessive volatility that disrupts trade pricing and business planning.',
          'To prevent a depreciating currency from feeding directly into import price inflation.',
          'Intervention is limited. Reserves are finite and currency markets are far larger than any single central bank.',
        ],
      },
      {
        q: 'The J-curve effect suggests a depreciation may worsen the trade balance before it improves it. Explain why.',
        keyPoints: [
          'In the short run, import and export contracts are fixed, so volumes do not respond immediately to price changes.',
          'Sterling import prices rise instantly, increasing the value of imports and worsening the trade balance.',
          'Over 12 to 18 months, buyers respond to price signals and volumes adjust. The balance then improves.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'Should the UK prefer a strong or a weak pound? Is there a right answer?',
        notes: [
          'There is no universally correct answer, which is the point. A strong pound benefits consumers and importers; a weak pound benefits exporters and tourism.',
          'The UK is a net importer, so a weak pound tends to be more inflationary than growth-generating. But exporters and manufacturers would argue the opposite.',
          'Strong answers will resist the instinct to say one is always better and instead explain the trade-offs, noting that the right level depends on the wider state of the economy.',
        ],
      },
      {
        p: 'Floating vs managed exchange rates: what are the trade-offs?',
        notes: [
          'Floating rates adjust automatically to economic conditions, preserving monetary policy independence. The downside is volatility, which creates uncertainty for trade and investment.',
          'Managed or fixed rates reduce uncertainty but require the central bank to hold large reserves and may force interest rate decisions that conflict with domestic needs.',
          'Strong answers will use a real example: the ERM crisis of 1992, when the UK could not sustain its fixed rate and was forced to exit, is the classic case study.',
        ],
      },
      {
        p: 'How does purchasing power parity help explain long-run exchange rate movements, and what are its limitations?',
        notes: [
          'PPP argues that exchange rates should adjust so that identical goods cost the same in different countries. In the long run, currencies tend to move in this direction.',
          'In the short run, PPP is a poor predictor. Capital flows, interest rate differentials, and speculation dominate exchange rate movements over months and years.',
          'Strong answers will use the Big Mac Index as an accessible illustration of PPP and then explain why it fails as a short-run forecasting tool.',
        ],
      },
    ],
  },

  trade: {
    exercisePrompt: "Based on this country's current account position, is this a sign of a healthy economy or a cause for concern?",
    exerciseOptions: [
      { icon: '☀️', label: 'Not concerning',    cls: 'sunny'  },
      { icon: '☁️', label: 'Watch closely',     cls: 'cloudy' },
      { icon: '⛈️', label: 'Cause for concern', cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows the current account balance as a percentage of GDP. It captures trade in goods, services, income flows, and transfers combined.',
      'A deficit means the country is spending more abroad than it earns and must finance the gap by borrowing or selling assets to foreigners.',
      'Size relative to GDP matters. A deficit of 1 to 2% is generally manageable; above 4 to 5% starts to raise serious questions about sustainability.',
      "Students often confuse the current account deficit with government borrowing. They are different things. The current account is the whole economy's external balance, not just the public sector.",
    ],
    classroomTime: {
      five:   "Discuss what's going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: "Is a current account deficit always harmful to an economy? Use evidence from the UK to support your answer.",
        keyPoints: [
          'Deficits financed by productive FDI are far less concerning than those financed by short-term debt flows.',
          'The UK has run a persistent deficit for decades without a funding crisis. Credibility and reserve currency status matter.',
          'Risk rises if the deficit widens sharply or global investors lose confidence in sterling assets.',
        ],
      },
      {
        q: "Explain why a current account deficit of similar size might be more concerning for Brazil than for the UK.",
        keyPoints: [
          'Sterling has reserve currency status; the Brazilian real is far more vulnerable to sudden capital flight.',
          'The UK has deep, liquid capital markets that absorb financing needs at relatively low cost.',
          "Brazil's external debt is largely dollar-denominated, creating currency mismatch risk when the real depreciates.",
        ],
      },
      {
        q: "What are the likely causes of the UK's persistent current account deficit?",
        keyPoints: [
          'Decades of deindustrialisation have eroded goods export capacity and widened the trade in goods deficit.',
          'Strong consumer demand sustains high import volumes, particularly for manufactured goods.',
          'The services surplus in finance, education, and professional services partially offsets but does not close the gap.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'Is free trade always beneficial, or are there circumstances where protectionism can be justified?',
        notes: [
          'The standard economic case for free trade rests on comparative advantage: all countries gain by specialising in what they produce most efficiently.',
          'The case for protectionism is strongest in three situations: infant industry protection in developing economies, national security (semiconductors, food), and reciprocity when trading partners do not play by the same rules.',
          'Strong answers will avoid treating free trade as self-evidently good or bad, and will instead identify the conditions under which protectionism can be justified without becoming a cover for domestic rent-seeking.',
        ],
      },
      {
        p: 'What does it mean for a country to finance a current account deficit, and what long-run risks does that create?',
        notes: [
          'Financing a deficit means either borrowing from abroad or selling domestic assets (property, businesses, government bonds) to foreign investors.',
          'The long-run risk is that accumulated liabilities eventually generate income outflows (interest, dividends, profits) that widen the deficit further. This is sometimes called the external debt trap.',
          'Strong answers will distinguish between financing that builds productive capacity (FDI in factories) and financing that does not (selling off existing assets), and explain why the composition matters.',
        ],
      },
      {
        p: 'Comparative advantage argues that trade benefits all participants. Does the current global trade picture support this view?',
        notes: [
          'In aggregate, trade has increased global output enormously. The gains are real. The problem is distribution: the benefits have been concentrated and the costs dispersed unevenly across regions and workers.',
          'The rise of China and the hollowing out of manufacturing in the UK and US show that comparative advantage creates winners and losers within countries, not just between them.',
          'Strong answers will separate the theoretical case (which is robust) from the political reality (which is more complicated) and explain why the gains from trade require redistribution to remain politically sustainable.',
        ],
      },
    ],
  },

}
