import GlowEffect from '@/components/ui/GlowEffect'
import { getSettings } from '@/lib/actions/general'

const FLOATING_ICONS = [
  {
    id: 'figma', delay: '0s', position: 'top-[5%] left-[30%]', size: 'w-12 h-12',
    color: 'text-[#F24E1E]',
    svg: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5C24.2467 28.5 28.5 24.2467 28.5 19C28.5 13.7533 24.2467 9.5 19 9.5C13.7533 9.5 9.5 13.7533 9.5 19C9.5 24.2467 13.7533 28.5 19 28.5Z" fill="#F24E1E"/>
        <path d="M9.5 28.5C4.25329 28.5 0 32.7533 0 38C0 43.2467 4.25329 47.5 9.5 47.5C14.7467 47.5 19 43.2467 19 38V28.5H9.5Z" fill="#1ABCFE"/>
        <path d="M38 19C38 24.2467 33.7467 28.5 28.5 28.5H19V9.5H28.5C33.7467 9.5 38 13.7533 38 19Z" fill="#FF7262"/>
        <path d="M19 28.5V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5C0 42.2533 4.25329 38 9.5 38H19V28.5Z" fill="#0ACF83"/>
        <path d="M19 28.5H9.5C4.25329 28.5 0 24.2467 0 19C0 13.7533 4.25329 9.5 9.5 9.5H19V28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    id: 'react', delay: '1.5s', position: 'top-[35%] right-[0%]', size: 'w-12 h-12',
    color: 'text-[#61DAFB]',
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 118 103" xmlns="http://www.w3.org/2000/svg">
        <path d="M58.9482 85.3409c-28.5445 0-52.0622-10.4227-52.0622-23.284 0-12.8614 23.5177-23.2841 52.0622-23.2841 28.5446 0 52.0622 10.4227 52.0622 23.2841 0 12.8613-23.5176 23.284-52.0622 23.284zm0-41.9567c-24.5126 0-44.5908 8.4418-44.5908 18.6727 0 10.2308 20.0782 18.6726 44.5908 18.6726 24.5127 0 44.5908-8.4418 44.5908-18.6726 0-10.2309-20.0781-18.6727-44.5908-18.6727z"/>
        <path d="M84.1504 70.7854c-14.2723 24.7202-40.4078 30.5695-58.3754 20.1963-17.9677-10.3732-20.9632-33.042-6.6908-57.7622 14.2722-24.7203 40.4077-30.5696 58.3754-20.1964 17.9676 10.3732 20.9631 33.042 6.6908 57.7623zm-39.7396-41.9372c-12.0195 20.8184-9.5226 39.691 5.4851 48.3557 15.0076 8.6647 36.8523 1.8396 48.8718-18.9788 12.0195-20.8184 9.5226-39.691-5.4851-48.3556-15.0077-8.6648-36.8524-1.8396-48.8718 18.9787z"/>
        <path d="M33.7461 70.7854C19.4738 46.0652 22.4693 23.3964 40.4369 13.0232c17.9677-10.3733 44.1032-4.5239 58.3754 20.1964 14.2723 24.7202 11.2768 47.389-6.6908 57.7622-17.9677 10.3732-44.1032 4.5238-58.3754-20.1964zm45.2247-41.9372c-12.0194-20.8183-33.8641-27.6435-48.8718-18.9787-15.0077 8.6646-17.5046 27.5372-5.4851 48.3556 12.0195 20.8184 33.8642 27.6435 48.8718 18.9788 15.0077-8.6647 17.5046-27.5373 5.4851-48.3557z"/>
        <circle cx="58.9482" cy="62.0569" r="11.2061"/>
      </svg>
    ),
  },
  {
    id: 'github', delay: '3s', position: 'bottom-[10%] right-[15%]', size: 'w-12 h-12',
    color: 'text-white',
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.379.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" fillRule="evenodd"/>
      </svg>
    ),
  },
  {
    id: 'photoshop', delay: '0.5s', position: 'top-[15%] right-[15%]', size: 'w-10 h-10',
    color: 'text-[#31A8FF]',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 0v24h24V0H0zm16.5 18.5h-2.5v-3.5h-1.5v3.5h-2.5v-3.5H8.5v3.5H6v-13h6.5c2.5 0 4.5 2 4.5 4.5 0 1.8-1.1 3.4-2.7 4.1.8.4 1.4 1.1 1.7 2 .3.9.4 1.9.5 2.9zm-4-8.5c1.1 0 2-.9 2-2s-.9-2-2-2h-4v4h4z"/>
      </svg>
    ),
  },
  {
    id: 'illustrator', delay: '2s', position: 'bottom-[30%] left-[5%]', size: 'w-10 h-10',
    color: 'text-[#FF9A00]',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 0v24h24V0H0zm6 18H3l6-12h3l6 12h-3l-1.5-3h-6L6 18zm5.5-11L8.5 13h6l-3-6z"/>
      </svg>
    ),
  },
  {
    id: 'after-effects', delay: '1s', position: 'top-[-5%] left-[60%]', size: 'w-8 h-8',
    color: 'text-[#9999FF]',
    svg: <span className="font-bold text-xs">Ae</span>,
  },
  {
    id: 'xd', delay: '4s', position: 'bottom-[-5%] left-[40%]', size: 'w-8 h-8',
    color: 'text-[#FF61F6]',
    svg: <span className="font-bold text-xs">Xd</span>,
  },
  {
    id: 'clickup', delay: '2.5s', position: 'top-[60%] left-[-5%]', size: 'w-9 h-9',
    color: 'text-[#7B68EE]',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 12l2.8 2.8L12 7.6l7.2 7.2L22 12 12 2z"/>
      </svg>
    ),
  },
]

export default async function Hero() {
  const settings = await getSettings()

  const heroName       = settings?.hero_name       ?? 'David Arias'
  const heroTitle      = settings?.hero_title      ?? 'Head UX/UI & Frontend Developer'
  const heroBio        = settings?.hero_bio        ?? 'Combino conocimiento técnico en React, sentido estético y herramientas de Inteligencia Artificial para crear experiencias de usuario excepcionales y optimizar el desarrollo.'
  const ctaPrimary     = settings?.hero_cta_primary    ?? 'Contáctame'
  const ctaSecondary   = settings?.hero_cta_secondary  ?? 'Descargar CV'
  const cvUrl          = settings?.hero_cv_url          ?? '/cv-david-arias.pdf'
  const profileImage   = settings?.hero_profile_image_url ?? null
  const showLetter     = settings?.hero_show_letter  !== false
  const heroLetter     = settings?.hero_letter       ?? 'D'
  const dbIcons: any[] = Array.isArray(settings?.floating_icons) && settings.floating_icons.length > 0
    ? settings.floating_icons
    : []

  return (
    <section
      id="inicio"
      className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop min-h-[819px] flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-32 md:pt-36 pb-16"
    >
      {/* Glow fondo izquierda */}
      <GlowEffect size={400} className="top-1/4 left-0" />

      {/* ── Columna izquierda: texto ── */}
      <div className="flex-1 flex flex-col items-start gap-6 z-10">
        <h1 className="font-display-lg text-display-lg text-on-surface">
          {heroName}
        </h1>

        <h2 className="font-headline-lg text-headline-lg text-on-surface-variant">
          {heroTitle}
        </h2>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4">
          {heroBio}
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors duration-200 shadow-glow-primary"
          >
            {ctaPrimary}
          </a>
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent border border-primary text-primary font-label-sm text-label-sm rounded-full hover:bg-primary/10 transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            {ctaSecondary}
          </a>
        </div>
      </div>

      {/* ── Columna derecha: orbit ── */}
      <div className="flex-1 relative w-full aspect-square max-w-[500px] z-10 hidden md:block">
        {/* Glow central */}
        <GlowEffect
          size={500}
          className="-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          opacity={0.5}
        />

        {/* Orbit container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Anillos */}
          <div className="absolute rounded-full border border-dashed border-white/10 w-[130%] h-[130%]" />
          <div className="absolute rounded-full border border-dashed border-white/20 w-[110%] h-[110%]" />
          <div className="absolute rounded-full border border-dashed border-white/40 w-[85%]  h-[85%]"  />
          <div className="absolute rounded-full border border-dashed border-white/60 w-[60%]  h-[60%]"  />

          {/* Foto de perfil */}
          <div className="absolute w-64 h-64 rounded-full overflow-hidden border-4 border-surface-container-high shadow-2xl z-20 bg-surface-container flex items-center justify-center">
            {!showLetter && profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profileImage} alt={heroName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-container-high flex items-center justify-center">
                <span className="font-display-lg text-[80px] text-primary font-bold select-none">{heroLetter}</span>
              </div>
            )}
          </div>

          {/* Iconos flotantes — DB tiene prioridad, si está vacío usa los estáticos */}
          {(dbIcons.length > 0 ? dbIcons : FLOATING_ICONS).map((icon: any) => (
            <div
              key={icon.id}
              className={`absolute ${icon.position} ${icon.size} bg-surface-container-high rounded-full p-3 border border-white/10 shadow-float-icon flex items-center justify-center animate-float`}
              style={{ animationDelay: icon.delay, color: icon.color }}
            >
              {dbIcons.length > 0
                ? <span dangerouslySetInnerHTML={{ __html: icon.svg }} className="flex items-center justify-center w-full h-full" />
                : <span style={{ color: icon.color }}>{icon.svg}</span>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
