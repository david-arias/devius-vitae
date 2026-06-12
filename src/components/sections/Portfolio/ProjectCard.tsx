'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/projects/${project.slug}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && router.push(`/projects/${project.slug}`)}
      className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:border-primary/30 hover:shadow-glow-lg flex flex-col cursor-pointer"
    >
      {/* Imagen */}
      <div className="relative w-full aspect-video bg-surface-container overflow-hidden">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high">
            <span className="material-symbols-outlined text-5xl text-primary/30">
              web
            </span>
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-primary/90 text-on-primary font-label-sm text-label-sm">
              Destacado
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-1 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          <span className="font-label-sm text-label-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            Ver proyecto
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </span>
          <div className="flex items-center gap-3 ml-auto">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-on-surface-variant hover:text-primary transition-colors"
                title="Ver en vivo"
              >
                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-on-surface-variant hover:text-primary transition-colors"
                title="Ver en GitHub"
              >
                <span className="material-symbols-outlined text-[20px]">code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
