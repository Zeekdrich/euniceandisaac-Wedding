import { useState } from 'react'
import { eventOptions, wedding } from '../data/wedding'
import { submitRsvp } from '../server/rsvp.functions'

const fieldClass =
  'w-full border-b border-gold-soft bg-transparent py-2.5 font-serif text-lg text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-gold'

const labelClass = 'block font-sans text-[0.66rem] uppercase tracking-[0.28em] text-gold'

type Status = 'idle' | 'sending' | 'done' | 'error'

export default function RsvpForm() {
  const [attending, setAttending] = useState<'yes' | 'no'>('yes')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [guestName, setGuestName] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setStatus('sending')
    setError('')

    try {
      const result = await submitRsvp({
        data: {
          fullName: String(form.get('fullName') ?? ''),
          email: String(form.get('email') ?? ''),
          phone: String(form.get('phone') ?? ''),
          attending,
          events: String(form.get('events') ?? 'both'),
          guestCount: Number(form.get('guestCount') ?? 1),
          message: String(form.get('message') ?? ''),
        },
      })
      setGuestName(result.fullName)
      setStatus('done')
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Something went wrong. Please try again.',
      )
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="border border-gold-soft bg-paper/60 px-8 py-16 text-center">
        <p className="eyebrow">Thank you</p>
        <h3 className="mt-6 font-script text-5xl text-ink">
          {attending === 'yes' ? 'We cannot wait!' : 'You will be missed'}
        </h3>
        <p className="mx-auto mt-6 max-w-md font-serif text-lg leading-relaxed text-ink-soft">
          {attending === 'yes'
            ? `Your reply is saved, ${guestName}. We will send directions to ${wedding.location} closer to the day.`
            : `Thank you for letting us know, ${guestName}. We will be thinking of you and will share photographs after the celebration.`}
        </p>
        <p className="mt-10 font-script text-3xl text-gold">{wedding.monogram}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gold-soft bg-paper/50 px-6 py-12 sm:px-12"
    >
      <div className="grid gap-10 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="fullName">
            Your full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Name and surname"
            className={`${fieldClass} mt-3`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email <span className="normal-case tracking-normal text-ink-soft/70">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={160}
            autoComplete="email"
            placeholder="you@example.com"
            className={`${fieldClass} mt-3`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone <span className="normal-case tracking-normal text-ink-soft/70">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={40}
            autoComplete="tel"
            placeholder="0800 000 0000"
            className={`${fieldClass} mt-3`}
          />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={labelClass}>Will you celebrate with us?</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                { value: 'yes', label: 'Joyfully accepts' },
                { value: 'no', label: 'Regretfully declines' },
              ] as const
            ).map((option) => {
              const selected = attending === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAttending(option.value)}
                  className={`border px-6 py-3.5 font-sans text-[0.68rem] uppercase tracking-[0.25em] transition-colors duration-300 ${
                    selected
                      ? 'border-gold bg-gold text-ivory'
                      : 'border-gold-soft text-ink-soft hover:border-gold hover:text-gold'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </fieldset>

        {attending === 'yes' && (
          <>
            <div>
              <label className={labelClass} htmlFor="events">
                Which celebration?
              </label>
              <select
                id="events"
                name="events"
                defaultValue="both"
                className={`${fieldClass} mt-3`}
              >
                {eventOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="guestCount">
                Number in your party
              </label>
              <select
                id="guestCount"
                name="guestCount"
                defaultValue="1"
                className={`${fieldClass} mt-3`}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <option key={count} value={count}>
                    {count === 1 ? 'Just me' : `${count} guests`}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            A note for Isaac &amp; Eunice
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={1000}
            placeholder="Blessings, questions, or a song you want to dance to"
            className={`${fieldClass} mt-3 resize-none`}
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="mt-8 font-serif text-base italic text-rose">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-12 w-full rounded-full bg-gold px-10 py-4 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-ivory transition-opacity duration-300 hover:opacity-90 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send my reply'}
      </button>

      <p className="mt-6 text-center font-sans text-[0.62rem] uppercase tracking-[0.22em] text-ink-soft/70">
        Kindly reply before 1 December 2026
      </p>
    </form>
  )
}
