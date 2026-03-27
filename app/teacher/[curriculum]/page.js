import { metrics } from '../../data/metrics'
import Header from '../../components/Header'
import TeacherHomePage from '../../components/TeacherHomePage'

export async function generateStaticParams() {
  return [{ curriculum: 'alevel' }]
}

export async function generateMetadata({ params }) {
  const { curriculum } = await params
  return {
    title: `Teacher dashboard | macroeconomics.education`,
  }
}

export default async function TeacherCurriculumPage({ params }) {
  const { curriculum } = await params
  return (
    <>
      <Header role="teacher" homeHref={`/teacher/${curriculum}`} />
      <TeacherHomePage metrics={metrics} curriculum={curriculum} />
    </>
  )
}
