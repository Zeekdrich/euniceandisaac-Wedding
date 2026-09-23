import Reveal from './Reveal'
import { wedding } from '../data/wedding'

const divider =
  '/.netlify/images?url=/img/floral-divider.png&w=1000&h=190&fit=cover&fm=webp&q=80'

const numerals = ['I', 'II', 'III']

export default function Schedule() {
  return (
    <section id="schedule" className="relative px-6 py-24">
      <img
        src={divider}
        alt=""
        aria-hidden
        className="mx-auto w-full max-w-lg select-none mix-blend-multiply"
      />

      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="eyebrow mt-10">The Celebration</p>
          <h2 className="mt-5 font-script text-5xl text-ink sm:text-6xl">Two days of joy</h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
            We would love you with us from the first kolanut to the last dance.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {wedding.events.map((event, index) => (
            <Reveal key={event.name} delay={index * 140}>
              <li className="flex h-full flex-col items-center border border-gold-soft/60 bg-paper/40 px-8 py-10 text-center">
                <span className="font-serif text-2xl text-gold-soft">{numerals[index]}</span>
                <span className="eyebrow mt-4">{event.accent}</span>
                <h3 className="mt-3 font-serif text-3xl text-ink">{event.name}</h3>
                <p className="mt-4 font-sans text-[0.68rem] uppercase tracking-[0.25em] text-ink-soft">
                  {event.date}
                </p>
                <p className="mt-2 font-serif text-xl italic text-gold">{event.time}</p>
                <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
                  {event.description}
                </p>
                <p className="mt-auto pt-8 font-sans text-[0.62rem] uppercase tracking-[0.28em] text-ink-soft/80">
                  {event.place}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
