import { Link } from '@tanstack/react-router'
import { wedding } from '../data/wedding'

export default function Footer() {
  return (
    <footer className="px-6 pb-16 pt-8 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold-soft">
        <span className="font-script text-2xl text-gold">{wedding.monogram}</span>
      </div>
      <p className="mt-8 font-serif text-xl italic text-ink-soft">
        With love, {wedding.groom} &amp; {wedding.bride}
      </p>
      <p className="mt-4 font-sans text-[0.66rem] uppercase tracking-[0.3em] text-gold">
        {wedding.hashtag}
      </p>
      <Link
        to="/rsvps"
        className="mt-10 inline-block font-sans text-[0.6rem] uppercase tracking-[0.24em] text-ink-soft/60 transition-colors hover:text-gold"
      >
        Guest list
      </Link>
    </footer>
  )
}
