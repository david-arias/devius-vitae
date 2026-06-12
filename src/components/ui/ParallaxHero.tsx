'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface Props {
  imageUrl: string | null
  title: string
  tags: string[]
  liveUrl?: string | null
  githubUrl?: string | null
}

export default function ParallaxHero({ imageUrl, title, tags, liveUrl, githubUrl }: Props) {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Image moves at 40% of scroll speed → parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  // Text moves up slightly as user scrolls
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  // Fade out as section exits
  const opacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative w-full h-[75vh] min-h-[500px] overflow-hidden"
    >
      {/* Imagen con parallax */}
      {imageUrl ? (
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: imageY, scale: 1.15 }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-background" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />

      {/* Contenido con parallax más suave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop pb-14 will-change-transform"
        style={{ y: contentY, opacity }}
      >
        {/* Tags — stagger entrance */}
        <motion.div
          className="flex flex-wrap gap-2 mb-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
          }}
        >
          {tags.map((tag) => (
            <motion.span
              key={tag}
              variants={{
                hidden:  { opacity: 0, y: 12, scale: 0.92 },
                visible: { opacity: 1, y: 0,  scale: 1 },
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="px-3 py-1 rounded-full bg-primary/20 text-primary font-label-sm text-label-sm border border-primary/30 backdrop-blur-sm"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display-lg text-[40px] md:text-display-lg text-on-surface mb-6 max-w-3xl leading-tight"
        >
          {title}
        </motion.h1>

        {/* Botones */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors shadow-glow-primary"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              Ver en vivo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary font-label-sm text-label-sm rounded-full hover:bg-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              Ver código
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
