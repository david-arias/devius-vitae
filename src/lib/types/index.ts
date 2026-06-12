// ─── Proyecto de portafolio ──────────────────────────────
export interface Project {
  id: string
  slug: string
  title: string
  description: string
  full_description?: string
  tags: string[]
  image_url?: string
  gallery_images?: string[]
  live_url?: string
  github_url?: string
  featured: boolean
  order_index: number
  year?: string
  role?: string
  duration?: string
  challenge?: string
  solution?: string
  results?: string
  created_at?: string
}

// ─── Experiencia laboral ─────────────────────────────────
export interface ExperienceItem {
  id: string
  title: string
  company: string
  period: string
  current: boolean
  description: string
}

// ─── Educación ───────────────────────────────────────────
export interface EducationItem {
  id: string
  title: string
  institution: string
  type: string
  description: string
}

// ─── Habilidad / Skill ───────────────────────────────────
export interface Skill {
  id: string
  name: string
  percentage: number
  icon_url?: string
}

// ─── Servicio ────────────────────────────────────────────
export interface Service {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
  featured: boolean
}

// ─── Formulario de contacto ──────────────────────────────
export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  description: string
}

export type ContactFormStatus = 'idle' | 'loading' | 'success' | 'error'
