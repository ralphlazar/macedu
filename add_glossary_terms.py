#!/usr/bin/env python3
"""Appends 30 new glossary entries to glossary.js"""

import re

GLOSSARY_PATH = "/Users/lisaswerling/RALPH/AI/macedu/app/data/glossary.js"

new_entries = """
  {
    slug: "appreciation",
    term: "Appreciation",
    brief: "A rise in the value of a currency relative to another, so each unit buys more foreign currency than before.",
    more: "Appreciation makes imports cheaper and exports more expensive abroad. This tends to reduce inflation by lowering import costs but can harm export competitiveness and widen a current account deficit.",
    detailed: "Appreciation occurs in freely floating exchange rate systems when demand for a currency rises relative to supply, often driven by higher interest rates, strong economic data, or safe-haven flows. The effects work through two channels: the price channel (cheaper imports reduce CPI directly) and the demand channel (exports become less competitive, reducing output and employment in export sectors). The Marshall-Lerner condition determines whether appreciation improves or worsens the current account: if the combined price elasticity of demand for exports and imports exceeds one, appreciation worsens the trade balance. Common mistake: students assume appreciation is always good because it sounds strong. It depends entirely on the economic context.",
    seeAlso: ["depreciation", "exchange-rate", "current-account", "current-account-deficit", "freely-floating-exchange-rate"],
  },
  {
    slug: "base-effect",
    term: "Base effect",
    brief: "The distortion in a year-on-year rate caused by an unusually high or low starting point in the same month of the previous year.",
    more: "If energy prices spiked sharply in January last year, January this year will show low inflation even if prices are unchanged, simply because the comparison point is high. The base effect can make inflation look artificially low or high without any change in underlying price momentum.",
    detailed: "Base effects matter most when interpreting inflation data following a period of unusual price movement, such as the energy price surge after Russia's invasion of Ukraine in 2022. As those extreme months roll out of the twelve-month window, inflation falls mechanically even if energy prices have stopped falling. Central banks and analysts strip out base effects to assess underlying inflationary pressure. A positive base effect (high prior-year level) drags reported inflation down; a negative base effect (low prior-year level) pushes it up. Common mistake: students interpret a fall in the inflation rate driven by base effects as evidence that monetary policy is working, when prices may be rising just as fast as before.",
    seeAlso: ["inflation", "consumer-prices-index-cpi", "disinflation", "supply-side-shock"],
  },
  {
    slug: "basket-of-goods",
    term: "Basket of goods",
    brief: "The representative collection of goods and services used to measure changes in the price level over time.",
    more: "The basket is designed to reflect the spending patterns of a typical household. Its composition is updated periodically to account for changing consumption habits, such as the addition of streaming services and removal of obsolete products.",
    detailed: "In the UK, the Office for National Statistics constructs the CPI basket by surveying actual household spending. Each item is weighted according to its share of total spending, so a rise in food prices has a larger impact on measured inflation than a rise in the price of, say, postage stamps. The basket contains around 700 items across categories including food, clothing, housing, transport, and recreation. Because the basket is fixed between updates, it can overstate inflation (it cannot account for consumers switching to cheaper substitutes) or understate it (it may not capture new goods quickly enough). Common mistake: students describe the basket as fixed permanently. It is updated each year, though not in response to short-term price changes.",
    seeAlso: ["consumer-prices-index-cpi", "inflation", "price-level"],
  },
  {
    slug: "confidence",
    term: "Confidence",
    brief: "The degree of optimism or pessimism that consumers and businesses hold about future economic conditions, which directly influences their spending and investment decisions.",
    more: "Consumer confidence affects willingness to spend and borrow; business confidence affects investment plans and hiring. Both are forward-looking and can shift rapidly in response to news, creating self-fulfilling cycles.",
    detailed: "Confidence is a key driver of the consumption and investment components of aggregate demand. Keynes described unpredictable shifts in business expectations as animal spirits, recognising that investment decisions depend heavily on subjective beliefs about future returns. Confidence indices such as the GfK Consumer Confidence Barometer or the CBI Business Optimism Index are leading indicators watched closely by policymakers. A collapse in confidence can trigger recession even when underlying economic fundamentals are sound, as firms cut investment and households increase precautionary saving simultaneously. Common mistake: students treat confidence as a consequence of economic conditions rather than a cause. It operates in both directions and can amplify booms and busts independently.",
    seeAlso: ["consumption", "investment", "aggregate-demand", "economic-cycle", "multiplier"],
  },
  {
    slug: "credit",
    term: "Credit",
    brief: "Borrowed money made available by banks and other lenders to households and firms, allowing spending beyond current income.",
    more: "Expanding credit increases purchasing power and stimulates aggregate demand; contracting credit has the reverse effect. The availability and cost of credit is therefore a key channel through which monetary policy influences the economy.",
    detailed: "Credit flows through the economy via multiple channels: mortgage lending to households, business loans to firms, and consumer credit for purchases. The credit cycle tends to amplify the business cycle: in upswings, lenders relax standards and extend more credit, boosting demand; in downswings, tightening credit conditions reduce spending and investment, deepening the contraction. The 2008 financial crisis demonstrated how a sudden collapse in credit availability (a credit crunch) can push an economy into severe recession even when other fundamentals are relatively stable. Common mistake: students conflate credit with money. Credit is a claim on future income; money is a medium of exchange. Credit expansion creates purchasing power but also creates debt that must eventually be repaid.",
    seeAlso: ["commercial-bank", "monetary-policy", "monetary-policy-transmission-mechanism", "aggregate-demand", "systemic-risk"],
  },
  {
    slug: "crowding-out",
    term: "Crowding out",
    brief: "The displacement of private sector investment that occurs when increased government borrowing raises interest rates or absorbs available savings.",
    more: "If the government borrows heavily to fund a fiscal stimulus, it competes with private borrowers for loanable funds, pushing up interest rates and reducing private investment. The net effect on aggregate demand may therefore be smaller than the initial stimulus.",
    detailed: "Financial crowding out occurs through the interest rate channel: higher government borrowing increases demand for funds, raising the price of borrowing and deterring private investment. Resource crowding out occurs when the economy is near full capacity and government spending draws labour and capital away from the private sector. The degree of crowding out is hotly contested: Keynesians argue it is minimal when there is spare capacity (as idle resources are activated, not displaced); monetarists and classical economists argue it is substantial and may fully offset fiscal stimulus. In practice, crowding out is weaker during recessions and stronger during booms. Common mistake: students assume crowding out always negates fiscal policy. The empirical evidence suggests partial, not full, crowding out in most circumstances.",
    seeAlso: ["fiscal-policy", "fiscal-stimulus", "national-debt", "investment", "aggregate-demand"],
  },
  {
    slug: "depreciation",
    term: "Depreciation",
    brief: "A fall in the value of a currency relative to another, so each unit buys less foreign currency than before.",
    more: "Depreciation raises the cost of imports and reduces the price of exports in foreign markets, tending to boost export demand and worsen import costs. The net effect on the current account depends on how price-sensitive trade flows are.",
    detailed: "Currency depreciation affects the economy through several channels. Inflation rises as import costs pass through to consumer prices, a process called import cost pass-through. Export competitiveness improves as goods become cheaper for foreign buyers. However, the J-curve effect means the current account may worsen initially before improving, as trade contracts already in place take time to adjust. Depreciation can also trigger capital flight if investors fear further falls, creating a self-reinforcing spiral. In an open economy such as the UK, sterling depreciation has historically been a significant driver of imported inflation. Common mistake: students assume depreciation automatically improves the trade balance. Whether it does depends on the Marshall-Lerner condition.",
    seeAlso: ["appreciation", "exchange-rate", "current-account", "j-curve-effect", "inflation"],
  },
  {
    slug: "disposable-income",
    term: "Disposable income",
    brief: "Household income after income tax and National Insurance contributions have been deducted; the amount available to spend or save.",
    more: "Real disposable income adjusts for inflation, measuring actual purchasing power. When real disposable income rises, consumption tends to rise; when it falls, households cut spending or draw down savings.",
    detailed: "Disposable income is the primary driver of consumer spending and therefore a key determinant of aggregate demand. It is influenced by changes in tax rates, benefit levels, wages, and employment. The distinction between gross and disposable income matters for policy analysis: a tax cut raises disposable income directly, but its effect on consumption depends on the marginal propensity to consume. During periods of high inflation and stagnant wages, real disposable income can fall even when nominal wages are rising, creating a cost-of-living squeeze. Household debt also affects effective disposable income: high mortgage or consumer debt payments reduce the portion available for discretionary spending. Common mistake: students use income and disposable income interchangeably. Tax and benefit changes can significantly separate the two.",
    seeAlso: ["consumption", "real-income", "taxation", "marginal-propensity-to-consume-mpc", "saving"],
  },
  {
    slug: "economic-inactivity",
    term: "Economic inactivity",
    brief: "People of working age who are neither employed nor actively seeking work, and therefore excluded from both employment and unemployment statistics.",
    more: "Reasons include long-term sickness, caring responsibilities, early retirement, and full-time study. The economically inactive are not counted as unemployed because they are not actively looking for work.",
    detailed: "Economic inactivity became a major policy concern in the UK after the Covid-19 pandemic, when long-term sickness drove inactivity to record levels. A rise in inactivity tightens the labour market just as falling unemployment does, because it reduces the pool of available workers and can push up wages. However, some inactivity represents a hidden labour reserve that could re-enter employment with the right incentives or improved health. Policymakers distinguish between those who are inactive and want a job (discouraged workers, who are not counted in unemployment figures) and those who have permanently left the labour market. Common mistake: students assume low unemployment means a healthy labour market. High inactivity can coexist with low unemployment, masking significant underutilisation of the workforce.",
    seeAlso: ["unemployment", "labour-force-survey-measure", "structural-unemployment", "natural-rate-of-unemployment"],
  },
  {
    slug: "fdi",
    term: "Foreign direct investment (FDI)",
    brief: "Investment by a firm or individual in one country into business operations in another, typically involving ownership or control of productive assets.",
    more: "FDI differs from portfolio investment in that it involves a lasting interest and significant influence. Inward FDI brings capital, technology, and jobs; outward FDI can reflect domestic competitiveness but may shift employment abroad.",
    detailed: "FDI takes the form of greenfield investment (building new facilities) or mergers and acquisitions (buying existing firms). Countries compete for inward FDI through low corporation tax, skilled labour forces, stable institutions, and market access. For recipient economies, FDI can boost productive capacity, transfer technology and management practices, and support the current account via financial account inflows. However, profit repatriation subsequently creates outflows on the income component of the current account. The UK's vote to leave the EU prompted concern about a loss of inward FDI from firms using the UK as a base for accessing the single market. Common mistake: students confuse FDI with portfolio investment. FDI involves control and a long-term relationship; portfolio investment is purely financial with no management interest.",
    seeAlso: ["globalisation", "current-account", "balance-of-payments", "multinational-corporation-mnc", "capital-market"],
  },
  {
    slug: "fiscal-stimulus",
    term: "Fiscal stimulus",
    brief: "An increase in government spending or reduction in taxation designed to boost aggregate demand during a slowdown or recession.",
    more: "The stimulus works by injecting additional demand into the circular flow, with the initial impact amplified through the multiplier as income recipients spend a proportion of their gains. Its effectiveness depends on the size of the multiplier and the degree of crowding out.",
    detailed: "Fiscal stimulus can take the form of infrastructure spending (which boosts both demand and supply-side capacity), transfer payments (which put money directly into household pockets), or tax cuts (which raise disposable income). Keynesian economists favour large stimulus during recessions when the multiplier is high and crowding out is limited. Critics argue that time lags, implementation costs, and the need to finance borrowing reduce its effectiveness. The 2008 financial crisis prompted coordinated global fiscal stimulus, which most economists credited with preventing a deeper depression. Post-2010 austerity in the UK demonstrated the contractionary effects of withdrawing stimulus prematurely. Common mistake: students assume fiscal stimulus always works quickly. In practice, spending increases take time to design and implement, meaning the economy may have already begun recovering by the time the stimulus arrives.",
    seeAlso: ["fiscal-policy", "aggregate-demand", "multiplier", "crowding-out", "budget-deficit"],
  },
  {
    slug: "forward-guidance",
    term: "Forward guidance",
    brief: "Communication by a central bank about the likely future path of interest rates, intended to influence expectations and current financial conditions without changing rates today.",
    more: "By signalling that rates will remain low for an extended period, a central bank can reduce long-term borrowing costs and stimulate spending even when short-term rates are already at or near zero.",
    detailed: "Forward guidance became a key policy tool after the 2008 financial crisis when central banks hit the zero lower bound and conventional rate cuts were exhausted. The Bank of England and Federal Reserve used guidance linked to specific thresholds (such as unemployment falling below a set level) or time horizons to anchor expectations. The effectiveness of forward guidance depends entirely on its credibility: if markets believe the central bank will deviate from its stated path, the guidance has little impact. Forward guidance can also work in the opposite direction: signalling imminent rate rises can tighten financial conditions immediately, without the central bank having to act. Common mistake: students treat forward guidance as a guarantee. It is a signal, not a commitment, and central banks retain the right to change course as conditions evolve.",
    seeAlso: ["monetary-policy", "bank-rate", "quantitative-easing", "monetary-policy-committee-mpc", "inflation-targeting"],
  },
  {
    slug: "gni",
    term: "GNI (Gross National Income)",
    brief: "The total income earned by a country's residents, regardless of where that income is generated, equal to GDP plus net income received from abroad.",
    more: "GNI adjusts GDP by adding income earned by residents overseas and subtracting income earned by foreigners within the country. It is a better measure of a nation's actual income than GDP when the two diverge significantly.",
    detailed: "For most large economies, GDP and GNI are close. They diverge sharply in countries with large overseas workforces sending remittances home (where GNI exceeds GDP) or where significant profit repatriation by multinationals creates large outflows (where GNI falls below GDP). Ireland is the classic example of the latter: its GDP is substantially inflated by multinational profits booked in Dublin, making GNI a more meaningful measure of Irish residents' actual living standards. GNI per capita is used by the World Bank to classify countries by income level and determine eligibility for concessional lending. Common mistake: students use GDP and GNI interchangeably. The distinction matters most for small, open economies with large multinational sectors or diaspora populations.",
    seeAlso: ["gdp-gross-domestic-product", "national-income", "real-gdp-per-capita", "standard-of-living", "multinational-corporation-mnc"],
  },
  {
    slug: "goods-inflation",
    term: "Goods inflation",
    brief: "The rate of price increase for physical products such as food, clothing, and manufactured goods, as distinct from services.",
    more: "Goods prices are more sensitive to global supply chain conditions, energy costs, and commodity prices, making goods inflation more volatile and often more responsive to international shocks than services inflation.",
    detailed: "The distinction between goods and services inflation became critically important during and after the Covid-19 pandemic. Goods inflation surged as supply chains broke down and shipping costs spiked, while services inflation remained subdued because consumer-facing services were restricted. As economies reopened, goods inflation eased as supply chains normalised, while services inflation proved stickier because it is more closely tied to domestic wage growth. Central banks therefore look at both components to understand the sources of inflationary pressure and their likely persistence. Goods prices are also more exposed to exchange rate movements, because many goods are traded internationally. Common mistake: students treat inflation as a single uniform phenomenon. Disaggregating into goods and services reveals very different dynamics and policy implications.",
    seeAlso: ["inflation", "services-inflation", "supply-side-shock", "consumer-prices-index-cpi", "supply-chain-disruption"],
  },
  {
    slug: "interest-rate",
    term: "Interest rate",
    brief: "The cost of borrowing money, expressed as a percentage of the amount borrowed per year, or the return paid to savers for depositing funds.",
    more: "Interest rates affect consumption, investment, exchange rates, and asset prices simultaneously, making them the primary lever of monetary policy. The Bank of England sets the policy rate (Bank Rate), which anchors rates across the economy.",
    detailed: "Interest rates work through multiple channels. Higher rates raise the cost of mortgages and business loans, reducing consumption and investment. They attract foreign capital, appreciating the exchange rate and reducing import prices. They raise the return on saving, shifting income from borrowers to savers. And they reduce asset prices (particularly bonds and equities), reducing household wealth and confidence. The relationship between short-term policy rates and long-term market rates is not automatic: it depends on expectations about future rate paths and credit risk. Real interest rates (adjusted for inflation) matter more than nominal rates for economic decisions: if inflation is 5% and the bank rate is 4%, the real rate is negative, meaning borrowers are effectively being subsidised. Common mistake: students focus only on the nominal rate. A rate of 5% is very different in a 2% inflation environment versus a 10% inflation environment.",
    seeAlso: ["bank-rate", "monetary-policy", "monetary-policy-transmission-mechanism", "real-gdp", "aggregate-demand"],
  },
  {
    slug: "j-curve-effect",
    term: "J-curve effect",
    brief: "The tendency for a currency depreciation to worsen the trade balance initially before improving it, tracing a J-shaped path over time.",
    more: "Immediately after depreciation, import costs rise faster than export volumes increase, because existing trade contracts are fixed in price and quantity. Over time, volumes adjust as exporters gain competitiveness and consumers substitute away from expensive imports.",
    detailed: "The J-curve arises from the lag between a change in the exchange rate and the adjustment of trade volumes. In the short run, the quantity of imports and exports is determined by contracts signed before the depreciation, so the trade balance deteriorates as import bills rise in domestic currency terms. Over 6 to 18 months, firms and consumers respond to the changed relative prices: foreign buyers increase purchases of now-cheaper domestic exports and domestic consumers reduce purchases of now-costlier imports. Whether the balance eventually improves depends on the Marshall-Lerner condition: the sum of the price elasticities of demand for exports and imports must exceed one. Common mistake: students assume depreciation immediately improves the trade balance. The initial deterioration is the key empirical regularity that catches students out.",
    seeAlso: ["depreciation", "exchange-rate", "current-account", "exports", "imports"],
  },
  {
    slug: "labour-market",
    term: "Labour market",
    brief: "The market in which workers supply labour and employers demand it, with wages determined by the interaction of supply and demand.",
    more: "Labour markets determine wages, employment levels, and the distribution of income. Unlike goods markets, they are heavily influenced by institutions (trade unions, minimum wage legislation), search frictions, and information asymmetries.",
    detailed: "Labour market equilibrium occurs when the demand for labour from firms equals the supply of labour from workers at the prevailing wage. In practice, labour markets are segmented: skilled and unskilled workers, different sectors, and different regions operate in partially separate markets with different wage dynamics. Labour market tightness (low unemployment relative to vacancies) tends to push up wages, which can feed into inflation. Slack (high unemployment relative to vacancies) suppresses wage growth. Structural features such as trade union power, minimum wages, and employment protection legislation affect how quickly wages and employment respond to demand changes. Common mistake: students model the labour market as perfectly competitive. In reality, monopsony power, search frictions, and institutional rigidities mean wages are often sticky and employment adjusts incompletely.",
    seeAlso: ["unemployment", "natural-rate-of-unemployment", "wage-growth", "structural-unemployment", "cyclical-unemployment"],
  },
  {
    slug: "mortgage",
    term: "Mortgage",
    brief: "A loan secured against property, typically used to finance a house purchase, repaid with interest over a long period.",
    more: "Mortgages are the largest financial commitment for most households, making mortgage rates a powerful transmission channel for monetary policy. When Bank Rate rises, variable-rate mortgage holders face higher monthly payments immediately; fixed-rate holders are insulated until their deal expires.",
    detailed: "The UK mortgage market is dominated by fixed-rate deals, typically of two or five year terms, which means monetary policy tightening feeds into household finances gradually as fixed deals roll off rather than instantly. The size of the mortgage stock relative to household income determines how sensitive aggregate consumption is to interest rate changes. High house prices relative to incomes have increased the size of the average mortgage, amplifying the impact of rate changes on disposable income. Mortgage arrears and repossessions rise during periods of high rates or falling house prices, with broader effects on consumer confidence and bank balance sheets. Common mistake: students assume all mortgage holders are immediately affected by Bank Rate changes. The proportion on variable versus fixed rates, and the remaining term of fixed deals, fundamentally shapes the pace of transmission.",
    seeAlso: ["interest-rate", "bank-rate", "monetary-policy-transmission-mechanism", "disposable-income", "consumption"],
  },
  {
    slug: "nairu",
    term: "NAIRU",
    brief: "The Non-Accelerating Inflation Rate of Unemployment: the unemployment rate at which inflation is stable, neither rising nor falling.",
    more: "Below the NAIRU, labour markets are tight, wages rise faster than productivity, and inflation accelerates. Above it, spare capacity in the labour market puts downward pressure on wages and inflation tends to fall.",
    detailed: "NAIRU is closely related to but distinct from the natural rate of unemployment. It is sometimes described as the rate consistent with stable inflation given current institutional conditions, whereas the natural rate is framed in terms of equilibrium between labour supply and demand. Neither is directly observable; both must be estimated, typically using statistical models that relate unemployment to changes in inflation. The NAIRU is not fixed: it shifts with changes in labour market structure, the generosity of unemployment benefits, the degree of skills mismatch, and the rate of technological change. Policymakers use NAIRU estimates to judge whether the economy is operating above or below its sustainable level. Common mistake: students treat NAIRU as a precise, stable number. It is an estimate with wide uncertainty bands, and getting it wrong has significant consequences for monetary policy.",
    seeAlso: ["natural-rate-of-unemployment", "inflation", "unemployment", "labour-market", "short-run-phillips-curve"],
  },
  {
    slug: "productive-capacity",
    term: "Productive capacity",
    brief: "The maximum output an economy can sustainably produce when all factors of production are fully and efficiently employed.",
    more: "Productive capacity determines the position of the long-run aggregate supply curve. It grows over time through investment, improvements in technology, and increases in the size or quality of the labour force.",
    detailed: "Productive capacity is the supply-side ceiling on the economy. When actual output approaches productive capacity, spare capacity is exhausted, labour markets tighten, and inflationary pressure builds. Expanding productive capacity is the goal of supply-side policies: infrastructure investment raises it by reducing bottlenecks; education and training raise it by improving human capital; deregulation can raise it by removing barriers to entry and competition. The output gap measures the difference between actual output and productive capacity: a negative output gap means the economy is producing below its potential; a positive gap means it is temporarily above it, typically generating inflationary pressure. Common mistake: students confuse productive capacity with current output. An economy can operate well below its capacity during a recession, or briefly above it during a boom.",
    seeAlso: ["long-run-aggregate-supply", "spare-capacity", "output-gap", "supply-side-policies", "long-run-economic-growth"],
  },
  {
    slug: "productivity",
    term: "Productivity",
    brief: "Output produced per unit of input, most commonly measured as output per worker or output per hour worked.",
    more: "Productivity growth is the primary driver of long-run improvements in living standards, because it allows more to be produced with the same resources. Stagnant productivity translates directly into stagnant real wages.",
    detailed: "Labour productivity (output per worker or per hour) is the most widely used measure. Total factor productivity (TFP) measures efficiency across all inputs and is often taken as a proxy for technological progress. The UK has experienced a persistent productivity puzzle since the 2008 financial crisis, with productivity growth well below its pre-crisis trend despite low unemployment. Explanations include weak investment, misallocation of resources, zombie firms kept alive by low interest rates, and measurement problems in the growing services sector. Higher productivity allows firms to pay higher wages without raising prices, expanding the non-inflationary growth potential of the economy. Common mistake: students conflate output growth with productivity growth. Output can grow simply by adding more workers; productivity growth means each worker produces more.",
    seeAlso: ["long-run-economic-growth", "human-capital", "supply-side-policies", "real-gdp-per-capita", "productive-capacity"],
  },
  {
    slug: "real-income",
    term: "Real income",
    brief: "Income adjusted for inflation, measuring actual purchasing power rather than the nominal amount received.",
    more: "When inflation exceeds nominal wage growth, real incomes fall even though workers are being paid more in cash terms. Sustained real income growth requires nominal wages to rise faster than prices.",
    detailed: "Real income is calculated by deflating nominal income by a price index such as CPI. It is the economically meaningful measure of living standards because it reflects what income can actually buy. The period from 2021 to 2023 saw UK real incomes squeezed severely as inflation rose faster than wages, resulting in the biggest fall in living standards since comparable records began. Real income effects have distributional consequences: lower-income households spend a larger share of income on necessities (energy, food) whose prices rose most sharply, meaning official CPI underestimated the inflation experienced by the poorest. Common mistake: students report nominal wage growth as evidence that workers are better off. Without adjusting for inflation, this is meaningless. A 5% pay rise in a 7% inflation environment represents a real pay cut.",
    seeAlso: ["disposable-income", "inflation", "consumer-prices-index-cpi", "consumption", "standard-of-living"],
  },
  {
    slug: "recession",
    term: "Recession",
    brief: "A significant decline in economic activity lasting at least two consecutive quarters of negative GDP growth.",
    more: "Recessions are characterised by falling output, rising unemployment, reduced investment, and typically lower inflation as demand weakens. They are the contractionary phase of the economic cycle.",
    detailed: "The technical definition of two consecutive quarters of negative GDP growth is widely used but somewhat arbitrary. Some economists prefer broader definitions that include measures of unemployment, industrial production, and real income alongside GDP. Recessions vary enormously in depth and duration: shallow recessions may barely register in unemployment; severe recessions (such as 2008 to 2009) can leave lasting scarring through business failures, long-term unemployment, and reduced investment. Policy responses typically combine monetary easing (rate cuts, quantitative easing) and fiscal stimulus, though the appropriate mix depends on the recession's cause. Supply-side recessions (caused by energy shocks) are harder to address with demand-side policy than demand-side recessions. Common mistake: students assume all recessions are the same. The 2020 Covid recession was the sharpest on record but also the shortest; the 2008 recession was slower but left deeper structural damage.",
    seeAlso: ["gdp-gross-domestic-product", "economic-cycle", "aggregate-demand", "cyclical-unemployment", "fiscal-stimulus"],
  },
  {
    slug: "services-inflation",
    term: "Services inflation",
    brief: "The rate of price increase for services such as hospitality, education, transport, and financial services, as distinct from physical goods.",
    more: "Services inflation is primarily driven by wage costs, since services are labour-intensive to produce. It tends to be stickier and slower to respond to monetary policy than goods inflation.",
    detailed: "Because services cannot be easily traded internationally and rely heavily on domestic labour, services inflation tracks domestic wage growth closely. This is why central banks pay close attention to wage settlements when assessing the persistence of inflation: even after goods inflation normalises, services inflation can remain elevated if wages are rising rapidly. During 2023 and 2024, UK services inflation proved particularly stubborn above 6% even as headline CPI fell sharply, complicating the Bank of England's rate-cutting decisions. Services also have a high weighting in the CPI basket for developed economies, meaning persistent services inflation can keep headline inflation above target even if goods prices are falling. Common mistake: students assume monetary policy affects all inflation equally. It acts more powerfully on demand-sensitive goods prices than on wage-driven services prices.",
    seeAlso: ["inflation", "goods-inflation", "wage-growth", "consumer-prices-index-cpi", "monetary-policy"],
  },
  {
    slug: "skills-mismatch",
    term: "Skills mismatch",
    brief: "A mismatch between the skills workers possess and the skills employers require, resulting in vacancies coexisting with unemployment.",
    more: "Skills mismatch is a form of structural unemployment. It arises from technological change, industrial restructuring, or inadequate training provision, and cannot be resolved by boosting aggregate demand alone.",
    detailed: "Skills mismatch takes two forms: horizontal mismatch (workers have the right level of qualifications but in the wrong subject area) and vertical mismatch (workers are over- or under-qualified for available roles). As economies shift from manufacturing to services and from routine to non-routine tasks, workers in declining sectors face skill obsolescence. The UK's manufacturing regions have experienced persistent skills mismatch as industrial jobs disappeared and replacement service jobs required different competencies. Skills mismatch raises the NAIRU because the labour market cannot clear efficiently: firms raise wages to attract scarce skilled workers while unemployed workers with obsolete skills cannot fill the vacancies. Supply-side policies including vocational training and apprenticeships are the appropriate response. Common mistake: students prescribe demand-side stimulus for skills mismatch unemployment. Higher aggregate demand will not help a redundant steelworker fill a software engineering vacancy.",
    seeAlso: ["structural-unemployment", "natural-rate-of-unemployment", "nairu", "supply-side-policies", "human-capital"],
  },
  {
    slug: "spare-capacity",
    term: "Spare capacity",
    brief: "The difference between what an economy (or firm) is currently producing and what it could produce at full utilisation of its resources.",
    more: "Spare capacity means the economy has room to grow without generating inflationary pressure. It is the real-world counterpart to a negative output gap and is central to Keynesian arguments for fiscal stimulus during downturns.",
    detailed: "Spare capacity exists in both the labour market (unemployment and underemployment) and the capital stock (idle machinery, empty office space, under-utilised factories). When the economy has substantial spare capacity, an increase in aggregate demand primarily raises output rather than prices, because firms can expand production by employing idle resources rather than bidding up input costs. As spare capacity is exhausted and the economy approaches its productive potential, additional demand increasingly manifests as inflation rather than output growth. The Bank of England's assessment of spare capacity is central to its monetary policy decisions: significant spare capacity justifies looser policy; limited spare capacity argues for tighter policy even before inflation rises. Common mistake: students assume spare capacity is always eliminated during a recovery. In practice, structural shifts can leave some capacity permanently stranded and unavailable for reactivation.",
    seeAlso: ["productive-capacity", "negative-output-gap", "aggregate-supply", "aggregate-demand", "unemployment"],
  },
  {
    slug: "supply-chain-disruption",
    term: "Supply chain disruption",
    brief: "Interruption to the flow of goods, components, or materials between producers at different stages of the production process, raising costs and reducing availability.",
    more: "Supply chain disruptions act as a cost-push shock, pushing up prices and reducing productive capacity simultaneously. They can originate from natural disasters, geopolitical events, pandemics, or transport bottlenecks.",
    detailed: "Global supply chains amplify both the risks and the benefits of international specialisation. Just-in-time manufacturing systems, which hold minimal inventory, are particularly vulnerable to disruption because there is no buffer. The Covid-19 pandemic exposed the fragility of extended global supply chains: semiconductor shortages halted car production worldwide; container shipping costs rose by over 500% in 2021. These disruptions contributed significantly to goods inflation in 2021 and 2022. In response, firms and governments began reshoring production and diversifying supply chains, accepting higher costs in exchange for greater resilience. Common mistake: students treat supply chain disruption as a temporary demand-side problem. It is a supply-side shock that simultaneously raises costs and constrains output, making it harder to address with conventional macroeconomic policy.",
    seeAlso: ["supply-side-shock", "cost-push-inflation", "goods-inflation", "inflation", "globalisation"],
  },
  {
    slug: "underemployment",
    term: "Underemployment",
    brief: "A situation in which workers are employed for fewer hours than they want, or in roles that underutilise their skills, so the official unemployment rate overstates labour market health.",
    more: "Underemployment captures labour market slack missed by the headline unemployment rate. A worker on a zero-hours contract who works four hours a week when they want thirty is employed but underemployed.",
    detailed: "Underemployment rose sharply after the 2008 financial crisis as firms cut hours rather than headcounts. The Office for National Statistics produces underemployment measures including the proportion wanting more hours and involuntary part-time workers. High underemployment suppresses wage growth even when headline unemployment is low, because employers face little pressure to raise pay when they can simply offer existing underemployed workers more hours. This helps explain why wage growth remained weak for years after unemployment fell post-2008. The gig economy has increased the prevalence of underemployment by normalising variable-hours working arrangements that leave workers formally employed but economically insecure. Common mistake: students treat low unemployment as evidence of a tight labour market. Significant underemployment can coexist with low unemployment, leaving substantial spare capacity in the labour market.",
    seeAlso: ["unemployment", "labour-market", "economic-inactivity", "spare-capacity", "wage-growth"],
  },
  {
    slug: "wage-growth",
    term: "Wage growth",
    brief: "The rate at which average earnings rise over time, measured in nominal terms and compared with inflation to assess real purchasing power.",
    more: "Wage growth is a critical input into inflation forecasts because labour costs are the largest component of services prices. When wage growth exceeds productivity growth, unit labour costs rise and firms typically pass the increase on through higher prices.",
    detailed: "The Bank of England monitors wage growth closely because it is a leading indicator of domestically generated inflation. Regular pay growth (excluding bonuses) is preferred as a measure because bonuses are lumpy and volatile. Wage growth above the level consistent with the 2% inflation target (roughly 3 to 3.5% given trend productivity growth) signals inflationary pressure. The post-pandemic period saw UK wage growth rise to over 7% as workers sought to recoup real income lost to inflation, creating a wage-price dynamic that kept services inflation elevated. Wage growth varies significantly by sector, occupation, and bargaining power, meaning aggregate figures can mask very different experiences across the workforce. Common mistake: students assume strong wage growth is unambiguously good. If it exceeds productivity growth, it adds to inflationary pressure and may prompt rate rises that reduce employment.",
    seeAlso: ["services-inflation", "inflation", "real-income", "productivity", "monetary-policy"],
  },
  {
    slug: "wage-price-spiral",
    term: "Wage-price spiral",
    brief: "A self-reinforcing cycle in which rising prices prompt workers to demand higher wages, which raises firms' costs and leads to further price increases.",
    more: "The spiral is a key risk when inflation becomes embedded in expectations. If workers and firms both anticipate persistent inflation, their behaviour in wage negotiations and price-setting can cause it to persist even after the original shock has passed.",
    detailed: "The wage-price spiral was a defining feature of UK inflation in the 1970s, when accommodating monetary policy allowed a series of oil price shocks to become entrenched in wage bargaining. Breaking the spiral required Paul Volcker's severe monetary tightening in the US and Geoffrey Howe's deflationary budget in the UK, both of which caused deep recessions. Central banks are acutely sensitive to any signs of spiral dynamics because re-anchoring expectations once they have become unmoored is extremely costly. The risk of a spiral depends on the degree of indexation in wage contracts, the bargaining power of workers, and the credibility of the central bank's commitment to the inflation target. Common mistake: students describe any period of rising wages and prices as a wage-price spiral. A true spiral requires each round of price increases to feed back into wage demands and then into further price increases, not merely a one-off adjustment.",
    seeAlso: ["inflation", "wage-growth", "services-inflation", "inflation-targeting", "monetary-policy"],
  },
"""

with open(GLOSSARY_PATH, 'r') as f:
    content = f.read()

# Find the closing bracket of the glossary array
# Insert new entries before the final ];
insert_point = content.rfind('];')
if insert_point == -1:
    print("ERROR: Could not find closing ]; in glossary.js")
    exit(1)

new_content = content[:insert_point] + new_entries + content[insert_point:]

with open(GLOSSARY_PATH, 'w') as f:
    f.write(new_content)

print(f"Done. Added 30 new glossary entries to {GLOSSARY_PATH}")
