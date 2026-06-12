import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { projectsData } from '@/lib/data'
import { getProjectBySlug, getProjects } from '@/lib/actions/projects'
import Navbar from '@/components/layout/Navbar'
import ParallaxHero from '@/components/ui/ParallaxHero'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface PageProps { params: { slug: string } }

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  // Include both static data slugs and any DB slugs
  try {
    const dbProjects = await getProjects()
    const dbSlugs    = dbProjects.map((p: any) => ({ slug: p.slug }))
    const staticSlugs = projectsData.map((p) => ({ slug: p.slug }))
    const all = [...dbSlugs, ...staticSlugs]
    // Deduplicate by slug
    const seen = new Set<string>()
    return all.filter(({ slug }) => seen.has(slug) ? false : (seen.add(slug), true))
  } catch {
    return projectsData.map((p) => ({ slug: p.slug }))
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dbProject = await getProjectBySlug(params.slug)
  const project   = dbProject ?? projectsData.find((p) => p.slug === params.slug)
  if (!project) return { title: 'Proyecto no encontrado' }
  return {
    title: `${project.title} — Devius`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image_url ? [project.image_url] : [],
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  // Try DB first, then fall back to static data
  const dbProject = await getProjectBySlug(params.slug)
  const project   = dbProject ?? projectsData.find((p) => p.slug === params.slug)
  if (!project) notFound()

  // Related projects: prefer DB list, else static
  let allProjects: any[]
  try {
    const dbAll = await getProjects()
    allProjects = dbAll.length > 0 ? dbAll : projectsData
  } catch {
    allProjects = projectsData
  }
  const related = allProjects
    .filter((p: any) => p.id !== project.id)
    .slice(0, 2)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* ════════════════════════════════════════════════
            HERO — Parallax con breadcrumb
        ════════════════════════════════════════════════ */}
        {/* Breadcrumb sobre el hero */}
        <div className="absolute top-24 left-0 right-0 z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <Link href="/#portafolio" className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant/80 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Portafolio
          </Link>
        </div>

        <ParallaxHero
          imageUrl={project.image_url ?? null}
          title={project.title}
          tags={project.tags ?? []}
          liveUrl={project.live_url}
          githubUrl={project.github_url}
        />

        {/* ════════════════════════════════════════════
            STATS — Año, Rol, Duración
        ════════════════════════════════════════════ */}
        <ScrollReveal>
        <section className="border-b border-white/5 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {project.year && (
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Año</span>
                  <span className="font-headline-md text-headline-md text-on-surface">{project.year}</span>
                </div>
              )}
              {project.role && (
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Rol</span>
                  <span className="font-headline-md text-headline-md text-on-surface">{project.role}</span>
                </div>
              )}
              {project.duration && (
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Duración</span>
                  <span className="font-headline-md text-headline-md text-on-surface">{project.duration}</span>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Tecnologías</span>
                <span className="font-headline-md text-[16px] text-on-surface">
                  {(project.tags ?? []).slice(0, 3).join(' · ')}
                </span>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* ════════════════════════════════════════
            DESCRIPCIÓN + RETO/SOLUCIÓN
        ════════════════════════════════════════ */}
        <ScrollReveal>
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Descripción */}
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full inline-block" />
                Sobre el proyecto
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {project.full_description || project.description}
              </p>
            </div>
            {/* Reto + Solución */}
            {(project.challenge || project.solution) && (
              <div className="space-y-8">
                {project.challenge && (
                  <div className="glass-panel rounded-xl p-6 border-l-2 border-l-error/50">
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-[20px]">priority_high</span>
                      El reto
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="glass-panel rounded-xl p-6 border-l-2 border-l-primary/50">
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
                      La solución
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">{project.solution}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        </ScrollReveal>

        {/* ════════════════════════════════════════
            GALLERY — Grid de imágenes
        ════════════════════════════════════════ */}
        {project.gallery_images && project.gallery_images.length > 0 && (
          <ScrollReveal>
          <section className="bg-surface-container-lowest/50 py-20">
            <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-10 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full inline-block" />
                Galería del proyecto
              </h2>

              {/* Primera imagen: ancho completo */}
              <div className="relative w-full aspect-[16/8] rounded-xl overflow-hidden mb-4 border border-white/5">
                <Image src={project.gallery_images[0]} alt="Vista principal" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>

              {/* Resto en grid */}
              {project.gallery_images.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.gallery_images.slice(1).map((img: string, i: number) => (
                    <div key={i} className={`relative rounded-xl overflow-hidden border border-white/5 ${i === 2 ? 'col-span-2' : ''}`}
                      style={{ aspectRatio: i === 2 ? '16/9' : '4/3' }}>
                      <Image src={img} alt={`Captura ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          </ScrollReveal>
        )}

        {/* ════════════════════════════════════════
            RESULTADOS
        ════════════════════════════════════════ */}
        {project.results && (
          <ScrollReveal>
          <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-20">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-10 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full inline-block" />
              Resultados
            </h2>
            <div className="glass-panel rounded-2xl p-8 md:p-12 bg-primary/5 border border-primary/20">
              <div className="flex flex-wrap gap-6 md:gap-12">
                {project.results.split('·').map((result: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[24px]">trending_up</span>
                    <p className="font-headline-md text-headline-md text-on-surface">{result.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          </ScrollReveal>
        )}

        {/* ════════════════════════════════════════
            PROYECTOS RELACIONADOS
        ════════════════════════════════════════ */}
        {related.length > 0 && (
          <ScrollReveal>
          <section className="bg-surface-container-lowest/50 py-20">
            <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-10 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full inline-block" />
                Otros proyectos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((rel: any) => (
                  <Link key={rel.id} href={`/projects/${rel.slug}`}
                    className="group glass-panel rounded-xl overflow-hidden flex gap-0 hover:border-primary/30 hover:shadow-glow-lg transition-all duration-300">
                    <div className="relative w-40 shrink-0 bg-surface-container">
                      {rel.image_url
                        ? <Image src={rel.image_url} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-3xl text-primary/30">web</span></div>
                      }
                    </div>
                    <div className="p-5 flex flex-col justify-center">
                      <h3 className="font-headline-md text-[17px] text-on-surface group-hover:text-primary transition-colors mb-2">{rel.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-3">{rel.description}</p>
                      <span className="font-label-sm text-label-sm text-primary inline-flex items-center gap-1">
                        Ver proyecto <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          </ScrollReveal>
        )}

        {/* CTA volver */}
        <div className="py-16 text-center">
          <Link href="/#portafolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/10 text-on-surface-variant font-label-sm text-label-sm rounded-full hover:border-primary hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver al portafolio
          </Link>
        </div>

      </main>
    </>
  )
}
