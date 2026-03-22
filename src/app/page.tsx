import CalendarPortal from '@/components/calendar/CalendarPortal'
import Navbar from '@/components/ui/Navbar'
import ProjectsSection from '@/components/sections/ProjectsSection'
import Footer from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <Navbar />
      <CalendarPortal />
      <ProjectsSection />
      <Footer />
    </main>
  )
}