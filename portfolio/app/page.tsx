import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { ResearchIdentity } from '@/components/sections/ResearchIdentity'
import { Timeline } from '@/components/sections/Timeline'
import { Projects } from '@/components/sections/Projects'
import { CurrentWork } from '@/components/sections/CurrentWork'
import { Methods } from '@/components/sections/Methods'
import { Education } from '@/components/sections/Education'
import { Leadership } from '@/components/sections/Leadership'
import { Outputs } from '@/components/sections/Outputs'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ResearchIdentity />
        <Timeline />
        <Projects />
        <CurrentWork />
        <Methods />
        <Education />
        <Leadership />
        <Outputs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
