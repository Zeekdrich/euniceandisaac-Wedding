import { createFileRoute } from '@tanstack/react-router'
import Details from '../components/Details'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import RsvpForm from '../components/RsvpForm'
import Schedule from '../components/Schedule'

export const Route = createFileRoute('/')({
  component: Invitation,
})

function Invitation() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Schedule />
      <Details />

      <section id="rsvp" className="px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <Reveal className="text-center">
            <p className="eyebrow">Répondez s&apos;il vous plaît</p>
            <h2 className="mt-5 font-script text-5xl text-ink sm:text-6xl">Will you join us?</h2>
            <p className="mx-auto mt-6 max-w-lg font-serif text-lg leading-relaxed text-ink-soft">
              Please let us know by 1 December 2026 so we can keep a seat, and a plate, with your
              name on it.
            </p>
          </Reveal>

          <Reveal className="mt-12" delay={120}>
            <RsvpForm />
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
