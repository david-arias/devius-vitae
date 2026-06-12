import { getSkills } from '@/lib/actions/skills'
import { skillsData } from '@/lib/data'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SkillsGrid from './SkillsGrid'

export default async function Skills() {
  const dbSkills = await getSkills()
  const skills = dbSkills.length > 0 ? dbSkills : skillsData

  return (
    <section
      id="habilidades"
      className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-section-padding"
    >
      <ScrollReveal className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4 uppercase tracking-wider">
          Mis Habilidades
        </h2>
        <div className="w-24 h-1 bg-primary/50 mx-auto rounded-full" />
      </ScrollReveal>

      <SkillsGrid skills={skills} />
    </section>
  )
}
