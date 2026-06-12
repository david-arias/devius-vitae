import Navbar    from '@/components/layout/Navbar'
import Hero       from '@/components/sections/Hero'
import Services   from '@/components/sections/Services'
import Experience from '@/components/sections/Experience'
import Skills     from '@/components/sections/Skills'
import Portfolio  from '@/components/sections/Portfolio'
import Contact    from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Services />
        <Experience />
        <Skills />
        <Portfolio />
      </main>
      <Contact />
    </>
  )
}
