import type { ExperienceItem, EducationItem, Skill, Service, Project } from '@/lib/types'

// ─── Experiencia ─────────────────────────────────────────
export const experienceData: ExperienceItem[] = [
  {
    id: '1',
    title: 'Brand Manager - Head UX/UI',
    company: 'Lentesplus.com',
    period: '2020 - Presente',
    current: true,
    description: 'Liderazgo estratégico en diseño de producto, experiencia de usuario e interfaz corporativa para múltiples mercados en LATAM.',
  },
  {
    id: '2',
    title: 'Senior UX/UI Designer',
    company: 'Lentesplus.com',
    period: '2019 - 2020',
    current: false,
    description: 'Diseño e implementación de interfaces de usuario optimizadas para conversión en plataformas e-commerce B2C.',
  },
  {
    id: '3',
    title: 'Consultor UX/UI & Dev',
    company: 'Devius',
    period: '2011 - Presente',
    current: true,
    description: 'Consultoría independiente para startups y empresas, integrando diseño, desarrollo frontend y soluciones tecnológicas.',
  },
]

// ─── Educación ───────────────────────────────────────────
export const educationData: EducationItem[] = [
  {
    id: '1',
    title: 'Front End HTML5-CSS3-UX/UI',
    institution: 'Platzi, Udemy',
    type: 'Certificaciones',
    description: 'Especialización continua en tecnologías frontend modernas, metodologías de diseño centrado en el usuario y frameworks actuales.',
  },
  {
    id: '2',
    title: 'Estudios Superiores',
    institution: 'Universidad de Bogotá Jorge Tadeo Lozano',
    type: 'Universidad',
    description: 'Bases académicas sólidas en diseño y comunicación visual, complementadas con formación técnica en desarrollo de software.',
  },
]

// ─── Habilidades ─────────────────────────────────────────
export const skillsData: Skill[] = [
  { id: '1',  name: 'Photoshop',               percentage: 90, icon_url: 'https://placehold.co/48x48/191f2f/31A8FF?text=Ps' },
  { id: '2',  name: 'Illustrator',             percentage: 90, icon_url: 'https://placehold.co/48x48/191f2f/FF9A00?text=Ai' },
  { id: '3',  name: 'After Effects',           percentage: 70, icon_url: 'https://placehold.co/48x48/191f2f/9999FF?text=Ae' },
  { id: '4',  name: 'Figma',                   percentage: 95, icon_url: 'https://placehold.co/48x48/191f2f/F24E1E?text=Fg' },
  { id: '5',  name: 'HTML 5',                  percentage: 95, icon_url: 'https://placehold.co/48x48/191f2f/E34F26?text=H5' },
  { id: '6',  name: 'CSS',                     percentage: 95, icon_url: 'https://placehold.co/48x48/191f2f/1572B6?text=CSS' },
  { id: '7',  name: 'JS Vanilla',              percentage: 90, icon_url: 'https://placehold.co/48x48/191f2f/F7DF1E?text=JS' },
  { id: '8',  name: 'Angular & Frontend',      percentage: 90, icon_url: 'https://placehold.co/48x48/191f2f/DD0031?text=Ng' },
  { id: '9',  name: 'React & Frontend',        percentage: 65, icon_url: 'https://placehold.co/48x48/191f2f/61DAFB?text=Re' },
  { id: '10', name: 'UX Research',             percentage: 80, icon_url: 'https://placehold.co/48x48/191f2f/4edea3?text=UX' },
  { id: '11', name: 'Prompt Engineering & IA', percentage: 50, icon_url: 'https://placehold.co/48x48/191f2f/4edea3?text=AI' },
]

// ─── Servicios ───────────────────────────────────────────
export const servicesData: Service[] = [
  { id: '1', title: 'Diseño UX/UI',        description: 'Creación de interfaces intuitivas y estéticas centradas en la experiencia del usuario.',                               icon: 'design_services', tags: ['Figma', 'Prototipado', 'Research'],           featured: false },
  { id: '2', title: 'Desarrollo Frontend', description: 'Implementación técnica robusta, escalable y pixel-perfect de diseños interactivos.',                                   icon: 'code',            tags: ['React', 'Angular', 'HTML/CSS'],               featured: true  },
  { id: '3', title: 'Integración con IA',  description: 'Optimización de flujos de trabajo y desarrollo mediante herramientas de inteligencia artificial.',                     icon: 'smart_toy',       tags: ['Prompt Engineering', 'Claude', 'Optimización'], featured: false },
  { id: '4', title: 'Diseño Gráfico',      description: 'Enfoque en piezas publicitarias y creatividad visual utilizando herramientas líderes de la industria.',               icon: 'brush',           tags: ['Adobe', 'Affinity', 'Publicidad'],            featured: false },
]

// ─── Proyectos del portafolio ─────────────────────────────
export const projectsData: Project[] = [
  {
    id: '1',
    slug: 'lentesplus-redesign',
    title: 'Lentesplus.com — Rediseño',
    description: 'Rediseño completo de la plataforma e-commerce de lentes de contacto líder en LATAM, optimizando la conversión y la experiencia de usuario.',
    full_description: 'Lideré el rediseño estratégico de Lentesplus.com, una plataforma e-commerce de lentes de contacto con presencia en múltiples países de LATAM. El proyecto abarcó investigación de usuarios, arquitectura de información, diseño de sistema de componentes y supervisión del desarrollo frontend.',
    tags: ['UX/UI', 'Figma', 'React', 'TypeScript', 'E-commerce'],
    image_url: 'https://placehold.co/1400x800/191f2f/4edea3?text=Lentesplus+Hero',
    gallery_images: [
      'https://placehold.co/1200x700/191f2f/4edea3?text=Homepage+Redesign',
      'https://placehold.co/1200x700/242a3a/4edea3?text=Product+Detail+Page',
      'https://placehold.co/1200x700/191f2f/4edea3?text=Checkout+Flow',
      'https://placehold.co/600x700/242a3a/4edea3?text=Mobile+View',
      'https://placehold.co/1200x500/191f2f/4edea3?text=Design+System',
    ],
    live_url: 'https://lentesplus.com',
    featured: true,
    order_index: 0,
    year: '2022',
    role: 'Head UX/UI Designer',
    duration: '8 meses',
    challenge: 'La plataforma existente tenía una tasa de abandono del carrito superior al 70% y una experiencia fragmentada entre desktop y mobile.',
    solution: 'Realizamos un proceso completo de Research → Wireframing → Prototipado → Testing iterativo, rediseñando el funnel de compra desde cero con un enfoque mobile-first.',
    results: '+35% en tasa de conversión · -40% en abandono de carrito · 4.8/5 en satisfacción de usuario',
  },
  {
    id: '2',
    slug: 'devius-design-system',
    title: 'Design System — Devius',
    description: 'Sistema de diseño propio con componentes reutilizables, tokens de diseño y documentación completa para proyectos freelance.',
    full_description: 'Desarrollé un design system completo basado en Material Design 3, adaptado para proyectos de diseño y desarrollo frontend. Incluye paleta de colores, tipografía escalable, componentes base documentados en Figma y una librería de componentes React con Tailwind CSS.',
    tags: ['Design System', 'Figma', 'Tailwind CSS', 'React', 'Tokens'],
    image_url: 'https://placehold.co/1400x800/191f2f/4edea3?text=Design+System+Hero',
    gallery_images: [
      'https://placehold.co/1200x700/191f2f/4edea3?text=Color+Tokens',
      'https://placehold.co/1200x700/242a3a/4edea3?text=Typography+Scale',
      'https://placehold.co/1200x700/191f2f/4edea3?text=Component+Library',
      'https://placehold.co/1200x700/242a3a/4edea3?text=Dark+Mode+Preview',
    ],
    github_url: 'https://github.com/david-arias',
    featured: true,
    order_index: 1,
    year: '2024',
    role: 'Designer & Developer',
    duration: '3 meses',
    challenge: 'Mantener coherencia visual entre múltiples proyectos freelance con distintos stacks y equipos.',
    solution: 'Creé un sistema de tokens de diseño en Figma con variables nativas y su equivalente en Tailwind CSS config, logrando paridad perfecta entre diseño y código.',
    results: '11 proyectos usando el sistema · 60% reducción en tiempo de setup · 100% consistencia visual',
  },
  {
    id: '3',
    slug: 'dashboard-analytics',
    title: 'Dashboard Analytics',
    description: 'Dashboard de analíticas con visualización de datos en tiempo real para un cliente del sector salud.',
    full_description: 'Diseño e implementación de un dashboard de analíticas para monitoreo de métricas clave en una clínica oftalmológica. Incluye gráficos interactivos, filtros por fechas y exportación de reportes.',
    tags: ['UX/UI', 'React', 'TypeScript', 'Chart.js', 'Dashboard'],
    image_url: 'https://placehold.co/1400x800/191f2f/4edea3?text=Dashboard+Hero',
    gallery_images: [
      'https://placehold.co/1200x700/191f2f/4edea3?text=Main+Dashboard',
      'https://placehold.co/1200x700/242a3a/4edea3?text=Charts+View',
      'https://placehold.co/1200x700/191f2f/4edea3?text=Reports+Table',
    ],
    featured: false,
    order_index: 2,
    year: '2023',
    role: 'UX/UI Designer & Frontend Dev',
    duration: '4 meses',
    challenge: 'Presentar grandes volúmenes de datos médicos de forma comprensible para personal no técnico.',
    solution: 'Diseño de visualizaciones con énfasis en jerarquía visual, color semántico para alertas y navegación simplificada por rol de usuario.',
    results: 'Adopted by 3 clinics · 90% user satisfaction · 50% faster reporting',
  },
]
