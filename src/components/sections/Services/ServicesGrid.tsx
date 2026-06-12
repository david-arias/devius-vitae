'use client'

import { motion } from 'framer-motion'
import type { Service } from '@/lib/types'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item = {
  hidden:  { opacity: 0, y: 36, scale: 0.92 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

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

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {services.map((service) => (
        <motion.div key={service.id} variants={item}>
          <ServiceCard service={service} />
        </motion.div>
      ))}
    </motion.div>
  )
}
