import { getProjects } from '@/lib/actions/projects'
import { projectsData } from '@/lib/data'
import ProjectCard from './ProjectCard'

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
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
            Portafolio
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Proyectos seleccionados que muestran mi enfoque en diseño, desarrollo e innovación.
          </p>
        </div>

        {/* Proyectos destacados */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {featured.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Resto de proyectos */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rest.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* TODO: reemplazar con paginación / "Ver más" cuando haya más proyectos */}
      </div>
    </section>
  )
}
