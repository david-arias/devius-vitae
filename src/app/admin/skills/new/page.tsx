import Link from 'next/link'
import SkillForm from '@/components/admin/SkillForm'
import { createSkill } from '@/lib/actions/skills'

export default function NewSkillPage() {
  return (
    <div className="flex-1 p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/skills"
          className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Nueva habilidad</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Completa los datos de la habilidad</p>
        </div>
      </div>
      <div className="glass-panel rounded-2xl p-8">
        <SkillForm action={createSkill} />
      </div>
    </div>
  )
}
