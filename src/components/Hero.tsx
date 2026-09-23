import Countdown from './Countdown'
import { wedding } from '../data/wedding'

const heroImage = '/.netlify/images?url=/img/hero-florals.png&w=1600&fm=webp&q=82'

export default function Hero() {
  return (
    <header className="relative isolate overflow-hidden px-6 pb-24 text-center">
      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 w-full max-w-[1500px] -translate-x-1/2 select-none mix-blend-multiply"
      />

      <div className="hero-enter relative mx-auto flex max-w-xl flex-col items-center pt-[30vw] sm:pt-[20vw] lg:pt-[13vw]">
        <p className="eyebrow">Together with our families</p>

        <h1 className="mt-6 flex flex-col items-center font-script text-[3.5rem] leading-[1.05] text-ink sm:flex-row sm:gap-5 sm:text-7xl lg:text-[5.5rem]">
          <span>{wedding.groom}</span>
          <span className="text-gold" aria-hidden>
            &amp;
          </span>
          <span className="sr-only">and</span>
          <span>{wedding.bride}</span>
        </h1>

        <div className="mt-8 flex w-full max-w-sm items-center gap-4">
          <span className="rule flex-1" />
          <span className="font-sans text-[0.68rem] whitespace-nowrap uppercase tracking-[0.3em] text-ink-soft">
            22 &amp; 23 Dec 2026
          </span>
          <span className="rule flex-1" />
        </div>

        <p className="mt-6 font-serif text-lg italic text-ink-soft">{wedding.location}</p>

        <p className="mt-10 max-w-md font-serif text-xl leading-relaxed text-ink sm:text-2xl">
          {wedding.invitationLine}
        </p>

        <div className="mt-12">
          <Countdown />
        </div>

        <a
          href="#rsvp"
          className="mt-12 inline-block rounded-full border border-gold px-10 py-3.5 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ivory"
        >
          RSVP
        </a>
      </div>
    </header>
  )
}
