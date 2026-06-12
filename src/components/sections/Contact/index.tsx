'use client'

import { useState } from 'react'
import type { ContactFormData, ContactFormStatus } from '@/lib/types'
import { submitContactForm } from '@/lib/actions/contact'

const INITIAL_FORM: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  description: '',
}

export default function Contact() {
  const [form, setForm]     = useState<ContactFormData>(INITIAL_FORM)
  const [status, setStatus] = useState<ContactFormStatus>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const result = await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        subject: form.subject,
        description: form.description,
      })

      if (!result.success) throw new Error(result.error)

      setStatus('success')
      setForm(INITIAL_FORM)
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/60 focus:bg-surface-container-high transition-colors'

  const labelClass = 'block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase'

  return (
    <footer id="contacto" className="bg-surface-container-lowest border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">

          {/* ── Info de contacto ── */}
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">
              Hablemos de tu próximo proyecto
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-md">
              ¿Tienes una idea en mente o necesitas mejorar la experiencia de tu producto digital?
              Contáctame y descubramos cómo podemos colaborar.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-[18px] text-on-surface mb-1">Ubicación</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Bogotá, Colombia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">mail</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-[18px] text-on-surface mb-1">Email</h4>
                  <a
                    href="mailto:devius123@gmail.com"
                    className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                  >
                    devius123@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">call</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-[18px] text-on-surface mb-1">Teléfono</h4>
                  <a
                    href="tel:+573007074726"
                    className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                  >
                    +57 300 707 4726
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Formulario ── */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Nombre */}
              <div>
                <label htmlFor="name" className={labelClass}>Nombre</label>
                <input
                  id="name" name="name" type="text"
                  value={form.name} onChange={handleChange}
                  placeholder="Tu nombre completo"
                  required
                  className={inputClass}
                />
              </div>

              {/* Correo + Teléfono en fila */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={labelClass}>Correo</label>
                  <input
                    id="email" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Teléfono</label>
                  <input
                    id="phone" name="phone" type="tel"
                    value={form.phone} onChange={handleChange}
                    placeholder="+57 300 000 0000"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Asunto */}
              <div>
                <label htmlFor="subject" className={labelClass}>Asunto</label>
                <input
                  id="subject" name="subject" type="text"
                  value={form.subject} onChange={handleChange}
                  placeholder="¿En qué puedo ayudarte?"
                  required
                  className={inputClass}
                />
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="description" className={labelClass}>Descripción</label>
                <textarea
                  id="description" name="description"
                  value={form.description} onChange={handleChange}
                  placeholder="Cuéntame más sobre tu proyecto o idea..."
                  required rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Feedback de estado */}
              {status === 'success' && (
                <p className="font-body-md text-body-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  ¡Mensaje enviado! Te responderé pronto.
                </p>
              )}
              {status === 'error' && (
                <p className="font-body-md text-body-md text-error flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  Ocurrió un error. Inténtalo de nuevo o escríbeme directamente.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-4 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors duration-200 shadow-glow-primary disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Enviar mensaje
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

        {/* ── Footer bottom ── */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body-md text-body-md text-on-surface-variant">
            © {new Date().getFullYear()} David Arias (Devius). Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/david-arias"
              target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/devius"
              target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
