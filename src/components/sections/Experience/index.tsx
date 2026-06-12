import { getExperienceItems } from '@/lib/actions/experience'
import { getEducationItems } from '@/lib/actions/education'
import { experienceData, educationData } from '@/lib/data'
import type { ExperienceItem, EducationItem } from '@/lib/types'

function ExperienceItem({ item }: { item: ExperienceItem }) {
  return (
    <div className="relative pl-8">
      <div
        className={`absolute w-3 h-3 rounded-full -left-[6.5px] top-2 ${
          item.current
            ? 'bg-primary shadow-[0_0_10px_rgba(16,185,129,0.5)]'
            : 'bg-surface-variant border border-white/20'
        }`}
      />
      <div className="mb-1">
        <span
          className={`px-3 py-1 rounded-full font-label-sm text-label-sm inline-block mb-3 ${
            item.current
              ? 'bg-primary/10 text-primary border border-primary/20'
              : 'bg-surface-container text-on-surface-variant border border-white/10'
          }`}
        >
          {item.period}
        </span>
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface">{item.title}</h3>
      <p className="font-body-md text-body-md text-primary mt-1 mb-3">@ {item.company}</p>
      <p className="font-body-md text-body-md text-on-surface-variant">{item.description}</p>
    </div>
  )
}

function EducationItem({ item }: { item: EducationItem }) {
  return (
    <div className="relative pl-8">
      <div className="absolute w-3 h-3 bg-surface-variant rounded-full -left-[6.5px] top-2 border border-white/20" />
      <div className="mb-1">
        <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm border border-white/10 inline-block mb-3">
          {item.type}
        </span>
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface">{item.title}</h3>
      <p className="font-body-md text-body-md text-primary mt-1 mb-3">{item.institution}</p>
      <p className="font-body-md text-body-md text-on-surface-variant">{item.description}</p>
    </div>
  )
}

export default async function Experience() {
  const [dbExperience, dbEducation] = await Promise.all([
    getExperienceItems(),
    getEducationItems(),
  ])

  const experience: ExperienceItem[] = dbExperience.length > 0 ? dbExperience : experienceData
  const education: EducationItem[]   = dbEducation.length  > 0 ? dbEducation  : educationData

  return (
    <section
      id="experiencia"
      className="bg-surface-container-lowest/50 py-section-padding"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Experiencia */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="material-symbols-outlined text-primary text-3xl">work</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Experiencia</h2>
            </div>
            <div className="relative border-l border-white/10 ml-4 space-y-12 pb-4">
              {experience.map((item) => (
                <ExperienceItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Educación */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="material-symbols-outlined text-primary text-3xl">school</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Educación</h2>
            </div>
            <div className="relative border-l border-white/10 ml-4 space-y-12 pb-4">
              {education.map((item) => (
                <EducationItem key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
