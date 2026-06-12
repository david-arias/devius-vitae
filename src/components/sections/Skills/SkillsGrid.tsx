'use client'

import { motion } from 'framer-motion'
import SkillRing from '@/components/ui/SkillRing'

interface Skill {
  id: string
  name: string
  percentage: number
  icon_url?: string | null
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const item = {
  hidden:  { opacity: 0, y: 32, scale: 0.88 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {skills.map((skill) => (
        <motion.div key={skill.id} variants={item}>
          <SkillRing
            name={skill.name}
            percentage={skill.percentage}
            icon_url={skill.icon_url}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
