import Link from 'next/link'
import { notFound } from 'next/navigation'
import EducationForm from '@/components/admin/EducationForm'
import { getEducationItem, updateEducationItem } from '@/lib/actions/education'

interface Props { params: { id: string } }

export default async function EditEducationPage({ params }: Props) {
  const item = await getEducationItem(params.id)
  if (!item) notFound()

  const action = async (formData: FormData) => {
    'use server'
    await updateEducationItem(params.id, formData)
  }

  return (
    <div className="flex-1 p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/education"
          className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Editar educación</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{item.degree} · {item.institution}</p>
        </div>
      </div>
      <div className="glass-panel rounded-2xl p-8">
        <EducationForm action={action} defaultValues={item} isEdit />
      </div>
    </div>
  )
}
