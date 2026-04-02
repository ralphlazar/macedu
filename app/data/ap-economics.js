// Rule: keyPoints and notes arrays must contain exactly 3 bullets each. No more, no less.
export const lesson = {

  gdp: {
    exercisePrompt: "Based on what you can see, what icon would you give this economy\'s growth right now?",
    exerciseOptions: [
      { icon: '☀️', label: 'Growing above trend',      cls: 'sunny'  },
      { icon: '☁️', label: 'Slowing or recovering',    cls: 'cloudy' },
      { icon: '⛈️', label: 'Contracting or recession', cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows year-on-year real GDP growth: how much larger the economy is compared with the same period a year ago, after stripping out the effect of price changes.',
      'Positive but low growth (under 1%) means the economy is stagnating. Not shrinking, but not generating meaningful new income or jobs either.',
      'Two consecutive quarters of negative growth is the standard definition of recession. Watch for that pattern in the trend, not just the latest data point.',
      'Students often assume a growing economy means most people are better off. GDP measures total output, not how the gains are distributed.',
    ],
    classroomTime: {
      five:   "Discuss what\'s going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: 'What does the current GDP growth rate tell us about where this economy sits in the business cycle?',
        keyPoints: [
          'Growth above the long-run trend (around 2 to 2.5% for the US) suggests a positive output gap and rising inflationary pressure.',
          'Growth below trend implies spare capacity, downward pressure on prices, and a case for looser monetary or fiscal policy.',
          'Stagnation risk: repeated near-zero quarters can become self-reinforcing as business investment dries up and hiring freezes.',
        ],
      },
      {
        q: 'Why might GDP growth be a misleading measure of economic wellbeing?',
        keyPoints: [
          'GDP measures output, not distribution. A growing economy can leave most households worse off if gains are concentrated at the top.',
          'Environmental degradation and carbon emissions are not deducted from the headline figure.',
          'Unpaid care work, volunteering, and leisure are excluded entirely, despite contributing significantly to living standards.',
        ],
      },
      {
        q: 'To what extent can the Federal Reserve restore GDP growth to its long-run trend through monetary policy alone?',
        keyPoints: [
          'Rate cuts support demand-side spending but cannot fix supply-side constraints such as low productivity or poor infrastructure.',
          'Monetary policy is a blunt instrument: it affects all sectors equally rather than the specific ones holding growth back.',
          'The transmission lag of 12 to 18 months means the Fed is always acting on incomplete information about current conditions.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'Is GDP growth the right measure of economic success, or should governments pursue wellbeing indicators instead?',
        notes: [
          'GDP is a measure of economic activity, not welfare. It counts hospital visits and car accidents as positives because they generate spending.',
          'Alternatives like the Human Development Index, the Genuine Progress Indicator, and dashboard approaches try to capture what GDP misses.',
          'Strong answers will acknowledge that GDP is useful precisely because it is simple and internationally comparable, then explain what it sacrifices to achieve that simplicity.',
        ],
      },
      {
        p: 'Demand-side vs supply-side: which approach is more likely to raise an economy\'s long-run growth rate?',
        notes: [
          'Demand-side policy (fiscal stimulus, rate cuts) can close an output gap but cannot raise the trend rate of growth.',
          'Supply-side reforms — investment in infrastructure, education, deregulation, and technology — are what shift the long-run aggregate supply curve outward.',
          'Strong answers will distinguish between short-run stabilization and long-run growth, and argue that both matter but operate through different mechanisms.',
        ],
      },
      {
        p: 'What are the risks of a prolonged period of near-zero growth, even if it stops short of recession?',
        notes: [
          'Stagnation erodes business confidence and suppresses investment, which itself reduces future productive capacity — a self-reinforcing trap.',
          'Public finances deteriorate as tax revenues disappoint and welfare spending rises, narrowing the room for fiscal policy response.',
          'Strong answers will make the point that near-zero growth compounding over a decade is as damaging as a sharp recession, just less visible and politically harder to address.',
        ],
      },
    ],
  },

  inflation: {
    exercisePrompt: 'Based on what you can see, what icon would you give this economy right now?',
    exerciseOptions: [
      { icon: '☀️', label: 'At or near the 2% target', cls: 'sunny'  },
      { icon: '☁️', label: 'Mixed picture',             cls: 'cloudy' },
      { icon: '⛈️', label: 'Significant concern',       cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows the year-on-year change in consumer prices: how much more expensive a typical basket of goods and services is compared with a year ago.',
      'The Federal Reserve targets 2% inflation. Above it means price stability has not been restored; below it raises deflation risk and limits room to cut rates.',
      'Watch the direction as much as the level. A falling line means disinflation — slowing price rises — not falling prices. Students conflate these constantly.',
      'Core inflation, which strips out food and energy, is often more useful for reading underlying trend. Headline figures can be distorted by volatile commodity prices.',
    ],
    classroomTime: {
      five:   "Discuss what\'s going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: 'The Federal Reserve targets 2% inflation rather than zero. Explain the economic case for a positive inflation target.',
        keyPoints: [
          'A positive target preserves room to cut nominal interest rates before hitting zero, avoiding the liquidity trap that constrained Japan for decades.',
          'Moderate inflation reduces the real burden of debt over time and gives firms flexibility to cut real wages without nominal cuts, reducing unemployment.',
          'Deflation is more damaging than low positive inflation: consumers delay purchases expecting further price falls, investment collapses, and real debt burdens rise.',
        ],
      },
      {
        q: 'Explain the difference between demand-pull and cost-push inflation, using examples from recent US experience.',
        keyPoints: [
          'Demand-pull: excess aggregate demand pulls prices up. The 2021 stimulus checks and suppressed pandemic savings created a surge in consumer spending that outpaced supply.',
          'Cost-push: supply-side shocks raise production costs and push prices up independently of demand. Energy price spikes and supply chain disruption drove this phase.',
          'Both operated simultaneously in 2021 to 2023, which is why the inflation episode was unusually persistent and difficult to diagnose.',
        ],
      },
      {
        q: 'Assess whether raising interest rates is an effective policy response to cost-push inflation.',
        keyPoints: [
          'Rate rises work by cooling demand, but cost-push inflation originates on the supply side. Raising rates addresses the symptom, not the cause.',
          'The risk is that rate rises reduce output and raise unemployment without eliminating the supply shock — stagflation rather than stabilization.',
          'Strong answers will note that the Fed has no better short-run tool available, even if it is imperfect, and that credibility requires it to act regardless of the source of inflation.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'Disinflation vs deflation: what is the difference and why does it matter for policy?',
        notes: [
          'Disinflation is slowing price growth; deflation is falling prices. Students conflate them constantly, and the policy implications are opposite.',
          'Deflation sounds benign but is dangerous: consumers delay purchases expecting further falls, investment collapses, and debt burdens rise in real terms. Japan in the 1990s is the AP textbook case.',
          'Strong answers will explain why central banks fear deflation more than moderate inflation, and why the Fed\'s 2% target exists partly as a buffer against the deflationary trap.',
        ],
      },
      {
        p: 'Demand-pull vs cost-push: does the source of inflation change the appropriate policy response?',
        notes: [
          'In theory, yes. Demand-pull calls for tighter monetary policy to cool excess demand. Cost-push from a supply shock calls for patience, not rate rises that add unemployment to the problem.',
          'In practice, the Fed cannot afford to wait. If inflation expectations become unanchored — if workers and firms start assuming high inflation will persist — it becomes self-fulfilling regardless of the original cause.',
          'Strong answers will engage with the credibility argument: the Fed raises rates even against cost-push inflation not because it solves the supply problem, but because failing to act would destroy its inflation-fighting credibility.',
        ],
      },
      {
        p: 'Should central banks target 2% inflation, or would a higher target make macroeconomic management easier?',
        notes: [
          'The case for a higher target (say 4%) is that it gives central banks more room to cut rates before hitting zero, avoiding the trap the Fed faced after 2008 and again in 2020.',
          'The case against is credibility. Shifting the target once raises the question of whether it will be shifted again. Inflation expectations could become unanchored, making the target self-defeating.',
          'Strong answers will engage with the trade-off between policy flexibility and credibility rather than treating 2% as obviously correct or obviously wrong.',
        ],
      },
    ],
  },

  unemployment: {
    exercisePrompt: "Based on what you can see, what icon would you give this economy\'s labor market right now?",
    exerciseOptions: [
      { icon: '☀️', label: 'Near or below the natural rate', cls: 'sunny'  },
      { icon: '☁️', label: 'Elevated or rising',             cls: 'cloudy' },
      { icon: '⛈️', label: 'Significantly above natural',    cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows the unemployment rate: the share of people in the labor force who are actively seeking work but unable to find it.',
      'The natural rate of unemployment (NAIRU) for the US is estimated at around 4 to 4.5%. Below that, the labor market is tight and wage pressure tends to build.',
      'A rising trend matters more than the level. Even a low rate is concerning if it has been climbing for several consecutive months.',
      'Students often miss that people who have stopped looking for work are not counted. The headline rate can paint a more flattering picture than the underlying reality.',
    ],
    classroomTime: {
      five:   "Discuss what\'s going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: 'Explain why the headline unemployment rate may understate the true level of labor market weakness.',
        keyPoints: [
          'Discouraged workers who have stopped searching are classified as economically inactive and excluded from the headline rate entirely.',
          'Involuntary part-time workers — those working fewer hours than they want — are counted as employed despite significant underemployment.',
          'Gig economy workers classified as self-employed may have little work and low earnings but do not appear in unemployment data.',
        ],
      },
      {
        q: 'Distinguish between frictional, structural, and cyclical unemployment. Which type is the Federal Reserve best placed to address?',
        keyPoints: [
          'Frictional: temporary unemployment between jobs. Normal and unavoidable. Not a target for monetary policy.',
          'Structural: skills mismatch between workers and available jobs. Requires retraining and labor market reform, not rate cuts.',
          'Cyclical: caused by insufficient aggregate demand. The Fed directly addresses this through the interest rate, making it the most policy-responsive type.',
        ],
      },
      {
        q: 'Explain the short-run Phillips Curve trade-off and why it breaks down in the long run.',
        keyPoints: [
          'In the short run, lower unemployment is associated with higher inflation: a tight labor market pushes up wages, which feeds into prices.',
          'In the long run, adaptive expectations shift the short-run Phillips Curve upward. Attempts to hold unemployment below NAIRU produce higher inflation, not lower unemployment.',
          'The long-run Phillips Curve is therefore vertical at the natural rate: there is no permanent trade-off between inflation and unemployment.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'What distinguishes cyclical from structural unemployment, and why does the distinction matter for policy?',
        notes: [
          'Cyclical unemployment responds to aggregate demand: rate cuts, fiscal stimulus, and consumer confidence shifts can reduce it directly.',
          'Structural unemployment reflects a mismatch between skills and available jobs. Stimulus does not fix it — retraining programs, geographic mobility support, and education reform are needed.',
          'Strong answers will give a concrete example of each and explain why diagnosing the wrong type leads to the wrong policy response — and can make things worse.',
        ],
      },
      {
        p: 'Is full employment a realistic policy goal, or does some unemployment serve a useful economic function?',
        notes: [
          'Some economists argue a degree of unemployment (NAIRU) is necessary to prevent runaway wage inflation: without a pool of available workers, bargaining power shifts entirely to labor.',
          'Full employment is therefore defined as the level consistent with stable inflation, not zero unemployment. This is a technical and contested concept, not a moral one.',
          'Strong answers will question whether the natural rate is fixed or can be lowered through better job matching, childcare provision, and labor market reform — a live policy debate in the US.',
        ],
      },
      {
        p: 'Has the gig economy made the unemployment rate a less reliable indicator of labor market health?',
        notes: [
          'Gig workers are classified as self-employed regardless of earnings or hours. A surge in gig work can reduce the headline rate while concealing widespread precarity.',
          'The employment-population ratio and the U-6 underemployment measure offer a fuller picture than the headline U-3 rate alone.',
          'Strong answers will explain that no single indicator captures labor market health completely, and that the Fed monitors a dashboard of indicators rather than the headline rate alone.',
        ],
      },
    ],
  },

  'interest-rates': {
    exercisePrompt: "Given what you know about this country\'s inflation and growth, what would you expect this central bank to do next?",
    exerciseOptions: [
      { icon: '☀️', label: 'Raise rates', cls: 'sunny'  },
      { icon: '☁️', label: 'Hold rates',  cls: 'cloudy' },
      { icon: '⛈️', label: 'Cut rates',   cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows the central bank policy rate: the rate at which it lends to commercial banks overnight, which anchors all other borrowing rates across the economy.',
      'Higher rates make borrowing more expensive for households and firms, cooling aggregate demand and reducing inflationary pressure.',
      'The direction of travel matters as much as the level. A rate that has been cut several times signals the central bank believes the inflation fight is largely won.',
      'Students often assume rate changes have immediate effects. In practice, the full impact on output and inflation takes 12 to 18 months to feed through.',
    ],
    classroomTime: {
      five:   "Discuss what\'s going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: 'Explain the transmission mechanism through which a cut in the federal funds rate might increase aggregate demand.',
        keyPoints: [
          'A lower federal funds rate feeds through to mortgage, auto loan, and business borrowing rates, raising disposable income and reducing the cost of investment.',
          'Cheaper credit encourages household borrowing and business investment, shifting the aggregate demand curve to the right.',
          'The effect is uneven and lagged: borrowers gain, savers lose, and the full impact on output and employment takes over a year to materialize.',
        ],
      },
      {
        q: 'Why might the Federal Reserve raise interest rates even when the economy is growing at a healthy pace?',
        keyPoints: [
          'If inflation is above the 2% target or the output gap is positive, preemptive tightening prevents the economy from overheating.',
          'Credibility matters: the Fed\'s ability to anchor inflation expectations depends on markets believing it will act before inflation becomes entrenched.',
          'Monetary policy acts with a lag, so waiting for inflation to peak before raising rates risks falling behind the curve.',
        ],
      },
      {
        q: 'Evaluate the effectiveness of monetary policy as a tool for addressing a recession caused by a supply-side shock.',
        keyPoints: [
          'Rate cuts stimulate aggregate demand but cannot fix a supply-side problem such as an energy price shock or productivity collapse.',
          'Stimulating demand when supply is constrained risks adding inflation to the downturn rather than restoring growth.',
          'Strong answers will argue that fiscal policy and structural reform are better suited to supply-side recessions, and that the Fed\'s role is to prevent secondary demand collapse, not solve the underlying problem.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'Is monetary policy an effective tool for controlling inflation, or do the long and variable lags undermine its usefulness?',
        notes: [
          'The case for: monetary policy has a clear transmission mechanism, and independent central banks have successfully anchored inflation expectations in most advanced economies since the 1980s.',
          'The case against: the lags are long and unpredictable, the effects are uneven across income groups, and monetary policy cannot address supply-side inflation at all.',
          'Strong answers will note that the 2021 to 2023 inflation episode — largely cost-push in origin — raised genuine questions about how much rate rises could do, and whether the Fed moved too slowly regardless.',
        ],
      },
      {
        p: 'What are the distributional effects of higher interest rates, and who bears the greatest burden?',
        notes: [
          'Higher rates hurt borrowers — mortgage holders, indebted firms, student loan holders — and benefit savers. These groups are not evenly distributed across the income spectrum.',
          'Younger households are more likely to carry variable-rate debt and less likely to hold significant savings, so rate rises tend to be regressive in effect even when their stated purpose is neutral.',
          'Strong answers will connect this to the broader debate about whether monetary policy is the right tool when its costs fall so unevenly, and whether fiscal transfers should accompany tightening cycles.',
        ],
      },
      {
        p: 'At what point does tight monetary policy risk tipping an economy into recession?',
        notes: [
          'This is the central dilemma of monetary tightening: rates high enough to kill inflation may also kill growth. The Fed\'s attempt to achieve a soft landing is historically rare.',
          'The risk is greatest when the economy is already slowing, debt levels are high, and consumer confidence is fragile — conditions that characterized the US in 2023.',
          'Strong answers will discuss what a soft landing requires (inflation falling while unemployment stays low), why it is hard to engineer, and what historical precedents suggest about the odds.',
        ],
      },
    ],
  },

  'exchange-rates': {
    exercisePrompt: 'This currency has moved recently. Based on the direction, who gains and who loses in this economy?',
    exerciseOptions: [
      { icon: '☀️', label: 'Good for importers', cls: 'sunny'  },
      { icon: '☁️', label: 'Mixed / depends',    cls: 'cloudy' },
      { icon: '⛈️', label: 'Bad for exporters',  cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows how many units of the foreign currency one unit of the domestic currency buys. A rising line means the domestic currency is appreciating.',
      'Appreciation makes imports cheaper and exports more expensive for foreign buyers. Depreciation does the opposite.',
      'Large moves in a short period signal something significant: a central bank decision, a political shock, or a shift in global risk appetite.',
      'Students often assume a stronger currency is good news. It depends entirely on whether the economy relies more on cheap imports or competitive exports.',
    ],
    classroomTime: {
      five:   "Discuss what\'s going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: 'Explain how an appreciation of the US dollar affects US exporters and US consumers differently.',
        keyPoints: [
          'US exporters: their goods become more expensive in foreign currency terms, reducing price competitiveness and potentially cutting export volumes and revenues.',
          'US consumers: imports become cheaper in dollar terms, raising purchasing power for foreign goods, electronics, and energy.',
          'The net effect on GDP depends on the relative size of the export and import sectors and the price elasticity of demand for each.',
        ],
      },
      {
        q: 'Using a foreign exchange market diagram, explain the effect of a Federal Reserve rate increase on the dollar exchange rate.',
        keyPoints: [
          'Higher US interest rates attract capital inflows as foreign investors seek better returns on dollar-denominated assets.',
          'Increased demand for dollars shifts the demand curve for the dollar to the right, causing the dollar to appreciate.',
          'The diagram must show supply and demand for dollars, the shift in demand, and the new higher equilibrium exchange rate.',
        ],
      },
      {
        q: 'Why does the US dollar retain its status as the world\'s primary reserve currency, and what economic advantages does this create?',
        keyPoints: [
          'The dollar\'s reserve status reflects the depth of US capital markets, political stability, and the dollar\'s role in pricing global commodities including oil.',
          'Reserve status allows the US to finance current account deficits at lower cost: foreign central banks hold dollars regardless of US fundamentals.',
          'This "exorbitant privilege" means the US faces fewer constraints than other countries when running persistent external deficits.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'Should the US prefer a strong or a weak dollar? Is there a right answer?',
        notes: [
          'There is no universally correct answer. A strong dollar benefits consumers and importers — cheaper goods and lower energy bills — and helps the Fed fight imported inflation.',
          'A weak dollar benefits exporters and US manufacturers, supports tourism earnings, and can help close the current account deficit by making US goods more competitive abroad.',
          'Strong answers will resist the instinct to say one is always better and instead explain the trade-offs, noting that the optimal level depends on the current state of inflation, growth, and the external balance.',
        ],
      },
      {
        p: 'Floating vs managed exchange rates: what are the trade-offs?',
        notes: [
          'Floating rates adjust automatically to economic conditions, preserving monetary policy independence. The cost is volatility, which creates uncertainty for trade pricing and cross-border investment.',
          'Managed or fixed rates reduce uncertainty and can anchor inflation expectations, but require holding large foreign exchange reserves and may force interest rate decisions that conflict with domestic needs.',
          'Strong answers will use a real example: China\'s managed float, or the 1994 Mexican peso crisis, where a fixed rate became unsustainable and triggered a sudden painful adjustment.',
        ],
      },
      {
        p: 'How does purchasing power parity help explain long-run exchange rate movements, and what are its limitations as a short-run forecasting tool?',
        notes: [
          'PPP argues that exchange rates should adjust so that identical goods cost the same across countries in a common currency. In the long run, currencies tend to move in this direction.',
          'In the short run, PPP is a poor predictor. Capital flows, interest rate differentials, and speculation dominate exchange rate movements over months and years.',
          'Strong answers will use the Big Mac Index as an accessible illustration of PPP and then explain why it fails as a short-run tool: currencies can deviate from PPP for years without triggering correction.',
        ],
      },
    ],
  },

  trade: {
    exercisePrompt: "Based on this country\'s current account position, is this a sign of a healthy economy or a cause for concern?",
    exerciseOptions: [
      { icon: '☀️', label: 'Not concerning',    cls: 'sunny'  },
      { icon: '☁️', label: 'Watch closely',     cls: 'cloudy' },
      { icon: '⛈️', label: 'Cause for concern', cls: 'stormy' },
    ],
    chartDiscussion: [
      'The chart shows the current account balance as a percentage of GDP. It captures trade in goods and services, income flows, and transfers combined.',
      'A deficit means the country is spending more abroad than it earns and must finance the gap by borrowing or selling assets to foreigners.',
      'Size relative to GDP matters. A deficit of 1 to 2% is generally manageable; above 4 to 5% starts to raise serious questions about long-run sustainability.',
      'Students often confuse the current account deficit with the government budget deficit. They are different things: the current account is the whole economy\'s external balance, not the public sector\'s balance sheet.',
    ],
    classroomTime: {
      five:   "Discuss what\'s going on in the chart.",
      ten:    'Weather Icon exercise. See below.',
      twenty: 'Written response to one or more of the questions below.',
    },
    sampleQuestions: [
      {
        q: 'Explain why the United States has run a persistent current account deficit for decades.',
        keyPoints: [
          'Strong consumer demand sustains high import volumes: US households buy large quantities of foreign manufactured goods, electronics, and energy.',
          'The dollar\'s reserve currency status allows the US to finance its deficit at low cost, since foreign central banks hold dollar assets regardless of the deficit size.',
          'Decades of deindustrialization have eroded goods export capacity, while the services surplus in finance, technology, and education only partially offsets the goods gap.',
        ],
      },
      {
        q: 'A country runs a current account deficit of 3% of GDP. Explain what this means and how it must be financed.',
        keyPoints: [
          'A deficit of 3% of GDP means the economy is spending 3% more abroad than it earns: imports of goods, services, and income payments to foreigners exceed exports and inflows.',
          'By the balance of payments identity, this must be matched by a capital account surplus of equal size: foreigners are investing in domestic assets to cover the gap.',
          'If financed by productive foreign direct investment, the deficit is less concerning than if financed by short-term debt flows, which can reverse suddenly.',
        ],
      },
      {
        q: 'Is free trade always beneficial? Evaluate the case for selective protectionism.',
        keyPoints: [
          'The case for free trade rests on comparative advantage: all countries gain by specializing in what they produce most efficiently, raising total output and consumer choice.',
          'The case for selective protectionism is strongest in three situations: infant industry development, national security (semiconductors, food supply), and reciprocity when trading partners subsidize their own producers.',
          'Strong answers will avoid treating free trade as self-evidently correct, and identify the conditions under which protection can be justified without becoming a cover for rent-seeking by domestic producers.',
        ],
      },
    ],
    discussionPrompts: [
      {
        p: 'Is a current account deficit always a sign of economic weakness?',
        notes: [
          'Not necessarily. A deficit financed by productive foreign direct investment — factories, technology, infrastructure — reflects an economy that foreign investors find attractive, not one in trouble.',
          'The US has run a persistent current account deficit for decades without a funding crisis, partly because of dollar reserve status and partly because of the depth of US capital markets.',
          'Strong answers will distinguish between the composition and financing of the deficit (productive FDI vs short-term debt flows), and note that a rapidly widening deficit is more concerning than a stable one.',
        ],
      },
      {
        p: 'What does it mean for a country to finance a current account deficit, and what long-run risks does that create?',
        notes: [
          'Financing a deficit means either borrowing from abroad or selling domestic assets — property, businesses, government bonds — to foreign investors. Both accumulate foreign claims on domestic wealth.',
          'The long-run risk is that accumulated liabilities generate rising income outflows (interest, dividends, profits repatriated) that widen the deficit further — sometimes called the external debt trap.',
          'Strong answers will distinguish between financing that builds productive capacity (FDI in new plant) and financing that does not (selling existing assets), and explain why the composition matters for long-run sustainability.',
        ],
      },
      {
        p: 'Comparative advantage argues that trade benefits all participants. Does the current global trade picture support this view?',
        notes: [
          'In aggregate, trade has increased global output enormously since 1945. The gains are real and well-documented. The problem is distribution: benefits have been concentrated and costs dispersed unevenly across regions and workers.',
          'The rise of manufacturing in China and the hollowing out of industrial communities in the US and Europe show that comparative advantage creates winners and losers within countries, not just between them.',
          'Strong answers will separate the theoretical case — which is robust — from the political reality, and explain why the gains from trade require redistribution and adjustment support to remain politically sustainable.',
        ],
      },
    ],
  },

}
