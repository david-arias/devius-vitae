import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProjectForm from '@/components/admin/ProjectForm'
import { getProject, updateProject } from '@/lib/actions/projects'

interface Props { params: { id: string } }

export default async function EditProjectPage({ params }: Props) {
  const project = await getProject(params.id)
  if (!project) notFound()

  const action = async (formData: FormData) => {
    'use server'
    await updateProject(params.id, formData)
  }

  return (
    <div className="flex-1 p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects"
          className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Editar proyecto</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{project.title}</p>
        </div>
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-white/10 font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            Ver live
          </a>
        )}
      </div>

      <div className="glass-panel rounded-2xl p-8">
        <ProjectForm action={action} defaultValues={project} isEdit />
      </div>
    </div>
  )
}
