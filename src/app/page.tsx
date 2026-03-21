import CalendarPortal from '@/components/calendar/CalendarPortal'
import Footer from '@/components/sections/Footer'
import ProjectsSection from '@/components/sections/ProjectsSection'
import Navbar from '@/components/ui/Navbar'

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