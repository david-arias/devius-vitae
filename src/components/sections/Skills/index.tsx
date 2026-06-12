import { getSkills } from '@/lib/actions/skills'
import { skillsData } from '@/lib/data'
import SkillRing from '@/components/ui/SkillRing'

export default async function Skills() {
  const dbSkills = await getSkills()
  const skills = dbSkills.length > 0 ? dbSkills : skillsData
  return (
    <section
      id="habilidades"
      className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-section-padding"
    >
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4 uppercase tracking-wider">
          Mis Habilidades
        </h2>
        <div className="w-24 h-1 bg-primary/50 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
        {skills.map((skill: any) => (
          <SkillRing key={skill.id} name={skill.name} percentage={skill.percentage} icon_url={skill.icon_url} />
        ))}
      </div>
    </section>
  )
}
