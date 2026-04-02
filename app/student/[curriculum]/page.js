import { metrics } from '../../data/metrics'
import Header from '../../components/Header'
import StudentHomePage from '../../components/StudentHomePage'

export async function generateStaticParams() {
  return [{ curriculum: 'alevel' }, { curriculum: 'ap-economics' }]
}

export async function generateMetadata({ params }) {
  return {
    title: `A-level Economics | macroeconomics.education`,
  }
}

export default async function StudentCurriculumPage({ params }) {
  const { curriculum } = await params
  return (
    <>
      <Header role="student" homeHref="/" />
      <StudentHomePage metrics={metrics} curriculum={curriculum} />
    </>
  )
}
