import CalendarPortal from '@/components/calendar/CalendarPortal'
import Footer from '@/components/sections/Footer'
import ProjectsSection from '@/components/sections/ProjectsSection'

export default function HomePage() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <CalendarPortal />
      <ProjectsSection />
      <Footer />
    </main>
  )
}