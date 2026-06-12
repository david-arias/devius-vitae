import Link from 'next/link'
import Image from 'next/image'
import { getSkills } from '@/lib/actions/skills'
import { deleteSkill } from '@/lib/actions/skills'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminSkillsPage() {
  const skills = await getSkills()

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Habilidades</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{skills.length} habilidad{skills.length !== 1 ? 'es' : ''} en total</p>
        </div>
        <Link href="/admin/skills/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors shadow-glow-primary">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nueva habilidad
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="glass-panel rounded-2xl p-16 text-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-4 block">auto_awesome</span>
          <p className="font-body-lg text-body-lg text-on-surface-variant">No hay habilidades aún</p>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Habilidad</th>
                <th className="text-left px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase hidden md:table-cell">Categoría</th>
                <th className="text-left px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Nivel</th>
                <th className="text-right px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill: any) => (
                <tr key={skill.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {skill.icon_url && (
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                          <Image src={skill.icon_url} alt={skill.label} width={32} height={32} className="object-cover" />
                        </div>
                      )}
                      <span className="font-body-md text-body-md text-on-surface font-semibold">{skill.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{skill.category ?? '—'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[120px] h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${skill.percentage}%` }} />
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{skill.percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/skills/${skill.id}`}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <DeleteButton id={skill.id} label={skill.label} onDelete={deleteSkill} />
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
