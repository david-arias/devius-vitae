import Link from 'next/link'
import { notFound } from 'next/navigation'
import ExperienceForm from '@/components/admin/ExperienceForm'
import { getExperienceItem, updateExperienceItem } from '@/lib/actions/experience'

interface Props { params: { id: string } }

export default async function EditExperiencePage({ params }: Props) {
  const item = await getExperienceItem(params.id)
  if (!item) notFound()

  const action = async (formData: FormData) => {
    'use server'
    await updateExperienceItem(params.id, formData)
  }

  return (
    <div className="flex-1 p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/experience"
          className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Editar experiencia</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{item.role} · {item.company}</p>
        </div>
      </div>
      <div className="glass-panel rounded-2xl p-8">
        <ExperienceForm action={action} defaultValues={item} isEdit />
      </div>
    </div>
  )
}
