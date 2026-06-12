import { getServices } from '@/lib/actions/services'
import { servicesData } from '@/lib/data'
import type { Service } from '@/lib/types'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ServicesGrid from './ServicesGrid'

export default async function Services() {
  const dbServices = await getServices()
  const services: Service[] = dbServices.length > 0 ? dbServices : servicesData

  return (
    <section id="servicios" className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-section-padding">
      <ScrollReveal className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Los Servicios Que Proveo</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Soluciones integrales de diseño centrado en el usuario y desarrollo técnico avanzado.
        </p>
      </ScrollReveal>

      <ServicesGrid services={services} />
    </section>
  )
}
