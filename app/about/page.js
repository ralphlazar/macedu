import Header from '../components/Header'
import ContactForm from '../components/ContactForm'

export const metadata = {
  title: 'About · macroeconomics.education',
}

const NAVY = '#0f1e35'
const BLUE = '#378ADD'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2 style={{
      fontFamily: "'Instrument Serif', serif",
      fontStyle: 'italic',
      fontSize: 28,
      fontWeight: 400,
      color: NAVY,
      margin: '0 0 1rem',
      lineHeight: 1.2,
    }}>
      {title}
    </h2>
    {children}
  </div>
)

const Body = ({ children }) => (
  <p style={{
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 15,
    lineHeight: 1.75,
    color: '#333',
    margin: '0 0 0.85rem',
    maxWidth: 580,
  }}>
    {children}
  </p>
)

const Link = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: BLUE, textDecoration: 'underline' }}
  >
    {children}
  </a>
)

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header homeHref="/" />
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>

        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontSize: 42,
          fontWeight: 400,
          color: NAVY,
          lineHeight: 1.1,
          margin: '0 0 3rem',
        }}>
          About
        </h1>

        <Section title="How it works">
          <Body>
            Every data point on this site is pulled automatically from live global sources: central banks, statistical agencies, and financial data providers. Nothing is entered by hand.
          </Body>
          <Body>
            An automated pipeline called <Link href="https://macrosnaps.app/">MacroSnaps</Link> runs daily, fetching the latest figures for inflation, interest rates, unemployment, exchange rates, and more across the economies covered. Those figures flow directly into the site. When the Bank of England moves rates, it shows up here. When the BLS releases payrolls, it shows up here.
          </Body>
          <Body>
            The data is real. The update is automatic. There is no editorial step between the source and what students and teachers see.
          </Body>
        </Section>

        <Section title="Who built this">
          <Body>
            macroeconomics.education is built by Ralph Lazar, creator of <Link href="https://macrosnaps.app/">MacroSnaps</Link>, a daily macroeconomic data pipeline.
          </Body>
          <Body>
            The platform is designed for AQA A-Level and AP Economics students and teachers who want to work with live data rather than textbook examples.
          </Body>
        </Section>

        <Section title="Contact">
          <Body>
            Questions, feedback, or school enquiries.
          </Body>
          <ContactForm />
        </Section>

      </div>
    </div>
  )
}
