import Link from 'next/link'
import { getEducationItems, deleteEducationItem } from '@/lib/actions/education'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminEducationPage() {
  const items = await getEducationItems()

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Educación</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{items.length} entrada{items.length !== 1 ? 's' : ''} en total</p>
        </div>
        <Link href="/admin/education/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors shadow-glow-primary">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nueva educación
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="glass-panel rounded-2xl p-16 text-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-4 block">school</span>
          <p className="font-body-lg text-body-lg text-on-surface-variant">No hay educación registrada aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div key={item.id} className="glass-panel rounded-2xl px-6 py-5 flex items-start gap-4">
              <div className="mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 bg-secondary/60" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">{item.degree}</p>
                    <p className="font-body-md text-body-md text-secondary">{item.institution}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.period}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link href={`/admin/education/${item.id}`}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </Link>
                    <DeleteButton id={item.id} label={`${item.degree} · ${item.institution}`} onDelete={deleteEducationItem} />
                  </div>
                </div>
                {item.description && (
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">{item.description}</p>
                )}
                {(item.tags ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
