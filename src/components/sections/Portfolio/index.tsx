import { getProjects } from '@/lib/actions/projects'
import { projectsData } from '@/lib/data'
import ScrollReveal from '@/components/ui/ScrollReveal'
import PortfolioGrid from './PortfolioGrid'

export default async function Portfolio() {
  const dbProjects = await getProjects()
  const allProjects = dbProjects.length > 0 ? dbProjects : projectsData

  const featured = allProjects.filter((p: any) => p.featured)
  const rest     = allProjects.filter((p: any) => !p.featured)

  return (
    <section
      id="portafolio"
      className="bg-surface-container-lowest/50 py-section-padding"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
            Portafolio
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Proyectos seleccionados que muestran mi enfoque en diseño, desarrollo e innovación.
          </p>
        </ScrollReveal>

        <PortfolioGrid featured={featured} rest={rest} />
      </div>
    </section>
  )
}
