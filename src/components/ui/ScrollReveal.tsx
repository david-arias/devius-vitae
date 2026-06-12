'use client'

import { motion } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface Props {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: Direction
  distance?: number
  className?: string
  once?: boolean
}

const directionOffset = (dir: Direction, dist: number) => {
  if (dir === 'up')    return { y: dist }
  if (dir === 'down')  return { y: -dist }
  if (dir === 'left')  return { x: dist }
  if (dir === 'right') return { x: -dist }
  return {}
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 32,
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
