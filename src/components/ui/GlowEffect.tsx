interface GlowEffectProps {
  size?: number
  className?: string
  opacity?: number
}

export default function GlowEffect({ size = 300, className = '', opacity = 1 }: GlowEffectProps) {
  return (
    <div
      aria-hidden="true"
      className={`glow-effect pointer-events-none ${className}`}
      style={{ width: size, height: size, opacity }}
    />
  )
}
