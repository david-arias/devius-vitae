import Image from 'next/image'
import type { Skill } from '@/lib/types'

const RADIUS = 45
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ≈ 283

export default function SkillRing({ name, percentage, icon_url }: Skill) {
  const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3">
        <svg className="w-full h-full skill-ring" viewBox="0 0 100 100" aria-label={`${name}: ${percentage}%`}>
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={RADIUS} fill="none"
            stroke="#10b981" strokeWidth="8"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        {/* Centro: icono o porcentaje */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          {icon_url ? (
            <>
              <Image src={icon_url} alt={name} width={24} height={24} className="rounded" unoptimized />
              <span className="text-on-surface font-bold text-[11px] leading-none">{percentage}%</span>
            </>
          ) : (
            <span className="text-on-surface font-bold text-lg">{percentage}%</span>
          )}
        </div>
      </div>

      <h3 className="font-headline-md text-[14px] text-on-surface font-semibold text-center leading-tight max-w-[90px]">
        {name}
      </h3>
    </div>
  )
}
