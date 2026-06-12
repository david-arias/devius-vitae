import Link from 'next/link'
import { getServices, deleteService } from '@/lib/actions/services'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminServicesPage() {
  const services = await getServices()

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Servicios</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{services.length} servicio{services.length !== 1 ? 's' : ''} en total</p>
        </div>
        <Link href="/admin/services/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors shadow-glow-primary">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nuevo servicio
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="glass-panel rounded-2xl p-16 text-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-4 block">design_services</span>
          <p className="font-body-lg text-body-lg text-on-surface-variant">No hay servicios registrados aún</p>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Servicio</th>
                <th className="text-left px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase hidden md:table-cell">Ícono</th>
                <th className="text-center px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Destacado</th>
                <th className="text-right px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service: any) => (
                <tr key={service.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-body-md text-body-md text-on-surface font-semibold">{service.title}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">{service.description}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {service.icon
                      ? <span className="material-symbols-outlined text-[20px] text-primary">{service.icon}</span>
                      : <span className="text-on-surface-variant/30">—</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-center">
                    {service.featured
                      ? <span className="material-symbols-outlined text-[20px] text-primary">star</span>
                      : <span className="material-symbols-outlined text-[20px] text-on-surface-variant/30">star</span>
                    }
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/services/${service.id}`}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <DeleteButton id={service.id} label={service.title} onDelete={deleteService} />
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
