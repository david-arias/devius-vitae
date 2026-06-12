'use client'

import { motion } from 'framer-motion'

export default function ProjectLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Logo wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-8"
      >
        {/* Devius */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-3xl text-on-surface tracking-tight select-none">
            Devius
          </span>
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm border border-primary/20">
            Portfolio
          </span>
        </div>

        {/* Dots pulsantes */}
        <div className="flex gap-2.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                opacity: [0.25, 1, 0.25],
                scale:   [0.75, 1.2, 0.75],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.18,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Barra de progreso en la base */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0"
        initial={{ width: '0%', x: '-5%' }}
        animate={{ width: '110%', x: '0%' }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Glow sutil detrás de los dots */}
      <div className="absolute w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
    </motion.div>
  )
}
