import Link from 'next/link'
import { getProjects } from '@/lib/actions/projects'
import DeleteButton from '@/components/admin/DeleteButton'
import { deleteProject } from '@/lib/actions/projects'

export default async function AdminProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Proyectos</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{projects.length} proyecto{projects.length !== 1 ? 's' : ''} en total</p>
        </div>
        <Link href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors shadow-glow-primary">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nuevo proyecto
        </Link>
      </div>

      {/* Table */}
      {projects.length === 0 ? (
        <div className="glass-panel rounded-2xl p-16 text-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-4 block">web</span>
          <p className="font-body-lg text-body-lg text-on-surface-variant">No hay proyectos aún</p>
          <Link href="/admin/projects/new" className="inline-flex items-center gap-2 mt-4 text-primary font-label-sm text-label-sm hover:underline">
            <span className="material-symbols-outlined text-[16px]">add</span>Agregar el primero
          </Link>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Proyecto</th>
                <th className="text-left px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase hidden md:table-cell">Tags</th>
                <th className="text-left px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase hidden lg:table-cell">Año</th>
                <th className="text-center px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Destacado</th>
                <th className="text-right px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: any) => (
                <tr key={project.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">{project.title}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">/{project.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(project.tags ?? []).slice(0, 3).map((tag: string) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant border border-white/10">
                          {tag}
                        </span>
                      ))}
                      {(project.tags ?? []).length > 3 && (
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant border border-white/10">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{project.year ?? '—'}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {project.featured
                      ? <span className="material-symbols-outlined text-[20px] text-primary">star</span>
                      : <span className="material-symbols-outlined text-[20px] text-on-surface-variant/30">star</span>
                    }
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        </a>
                      )}
                      <Link href={`/admin/projects/${project.id}`}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <DeleteButton id={project.id} label={project.title} onDelete={deleteProject} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
