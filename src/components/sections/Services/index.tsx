import { getServices } from '@/lib/actions/services'
import { servicesData } from '@/lib/data'
import type { Service } from '@/lib/types'

function ServiceCard({ service }: { service: Service }) {
  if (service.featured) {
    return (
      <div className="p-8 rounded-xl hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center text-center relative overflow-hidden group bg-primary/5 border border-primary/30 shadow-glow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none" />
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative z-10">
          <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'wght' 300" }}>
            {service.icon}
          </span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface mb-4 relative z-10">{service.title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-1 relative z-10">{service.description}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-auto relative z-10">
          {service.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm border border-primary/20">{tag}</span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="glass-panel p-8 rounded-xl hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center text-center group">
      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
        <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'wght' 300" }}>
          {service.icon}
        </span>
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-4">{service.title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-1">{service.description}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-auto">
        {service.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm border border-white/5">{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default async function Services() {
  const dbServices = await getServices()
  const services: Service[] = dbServices.length > 0 ? dbServices : servicesData
  return (
    <section id="servicios" className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-section-padding">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Los Servicios Que Proveo</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Soluciones integrales de diseño centrado en el usuario y desarrollo técnico avanzado.
        </p>
      </div>
      {/* Grid: 1 col mobile → 2 col md → 4 col xl (3 visibles en lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}
