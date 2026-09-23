import { useEffect, useState } from 'react'
import { wedding } from '../data/wedding'

const target = new Date(wedding.weddingDay).getTime()

const units = [
  { label: 'Days', ms: 86_400_000 },
  { label: 'Hours', ms: 3_600_000 },
  { label: 'Minutes', ms: 60_000 },
  { label: 'Seconds', ms: 1000 },
]

/** Live countdown to the church ceremony. Renders placeholders until mounted. */
export default function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => setRemaining(Math.max(target - Date.now(), 0))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  let rest = remaining ?? 0

  return (
    <div className="flex items-start justify-center gap-5 sm:gap-8">
      {units.map((unit) => {
        const value = Math.floor(rest / unit.ms)
        rest -= value * unit.ms

        return (
          <div key={unit.label} className="flex w-16 flex-col items-center sm:w-20">
            <span className="font-serif text-3xl font-light tabular-nums text-ink sm:text-4xl">
              {remaining === null ? '––' : String(value).padStart(2, '0')}
            </span>
            <span className="mt-2 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-ink-soft">
              {unit.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
