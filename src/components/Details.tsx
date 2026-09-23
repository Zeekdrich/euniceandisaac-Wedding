import Reveal from './Reveal'
import { wedding } from '../data/wedding'

const corner = '/.netlify/images?url=/img/floral-corner.png&w=700&fm=webp&q=80'

export default function Details() {
  return (
    <section className="relative overflow-hidden bg-parchment/40 px-6 py-24">
      {/* The same corner spray, mirrored, frames the panel top-left and bottom-right. */}
      <img
        src={corner}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-[8%] -top-[10%] w-[46%] max-w-md select-none mix-blend-multiply opacity-80 sm:w-[30%]"
      />
      <img
        src={corner}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-[10%] -right-[8%] w-[46%] max-w-md rotate-180 select-none mix-blend-multiply opacity-80 sm:w-[30%]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <blockquote className="font-serif text-2xl italic leading-relaxed text-ink sm:text-3xl">
            &ldquo;{wedding.scripture.text}&rdquo;
          </blockquote>
          <p className="eyebrow mt-6">{wedding.scripture.reference}</p>
        </Reveal>

        <div className="mt-16 grid gap-10 text-left sm:grid-cols-3">
          {wedding.details.map((detail, index) => (
            <Reveal key={detail.title} delay={index * 120}>
              <h3 className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-gold">
                {detail.title}
              </h3>
              <div className="mt-4 h-px w-10 bg-gold-soft" />
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                {detail.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
