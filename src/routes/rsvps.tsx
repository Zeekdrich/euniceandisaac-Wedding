import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { getRsvps } from '../server/rsvp.functions'

export const Route = createFileRoute('/rsvps')({
  component: GuestList,
})

type RsvpRow = {
  id: number
  fullName: string
  email: string | null
  phone: string | null
  attending: string
  events: string
  guestCount: number
  message: string | null
  createdAt: string | null
}

type Payload = {
  rows: Array<RsvpRow>
  summary: { replies: number; coming: number; regrets: number; guests: number }
}

const eventLabels: Record<string, string> = {
  both: 'Both days',
  traditional: 'Traditional only',
  church: 'Church & reception',
}

function GuestList() {
  const [passcode, setPasscode] = useState('')
  const [data, setData] = useState<Payload | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      setData((await getRsvps({ data: { passcode } })) as unknown as Payload)
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : 'Unable to load replies.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-20">
      <div className="text-center">
        <p className="eyebrow">Isaac &amp; Eunice</p>
        <h1 className="mt-4 font-script text-5xl text-ink">Guest list</h1>
        <Link
          to="/"
          className="mt-4 inline-block font-sans text-[0.62rem] uppercase tracking-[0.24em] text-ink-soft/70 hover:text-gold"
        >
          Back to the invitation
        </Link>
      </div>

      {!data ? (
        <form
          onSubmit={unlock}
          className="mx-auto mt-14 max-w-sm border border-gold-soft bg-paper/50 px-8 py-10 text-center"
        >
          <label
            className="block font-sans text-[0.66rem] uppercase tracking-[0.28em] text-gold"
            htmlFor="passcode"
          >
            Passcode
          </label>
          <input
            id="passcode"
            type="password"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            required
            className="mt-4 w-full border-b border-gold-soft bg-transparent py-2.5 text-center font-serif text-lg tracking-[0.2em] text-ink outline-none focus:border-gold"
          />
          {error && <p className="mt-5 font-serif text-base italic text-rose">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-gold px-8 py-3.5 font-sans text-[0.68rem] uppercase tracking-[0.28em] text-ivory disabled:opacity-60"
          >
            {loading ? 'Opening…' : 'View replies'}
          </button>
        </form>
      ) : (
        <div className="mt-14">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Replies', value: data.summary.replies },
              { label: 'Accepted', value: data.summary.coming },
              { label: 'Regrets', value: data.summary.regrets },
              { label: 'Guests expected', value: data.summary.guests },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-gold-soft bg-paper/50 px-4 py-6 text-center"
              >
                <dt className="font-sans text-[0.6rem] uppercase tracking-[0.26em] text-ink-soft">
                  {stat.label}
                </dt>
                <dd className="mt-3 font-serif text-4xl font-light text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>

          {data.rows.length === 0 ? (
            <p className="mt-14 text-center font-serif text-lg italic text-ink-soft">
              No replies yet — they will appear here as guests respond.
            </p>
          ) : (
            <div className="mt-10 overflow-x-auto border border-gold-soft">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <thead>
                  <tr className="bg-parchment/60 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft">
                    <th className="px-4 py-4">Guest</th>
                    <th className="px-4 py-4">Reply</th>
                    <th className="px-4 py-4">Celebration</th>
                    <th className="px-4 py-4">Party</th>
                    <th className="px-4 py-4">Contact</th>
                    <th className="px-4 py-4">Note</th>
                  </tr>
                </thead>
                <tbody className="font-serif text-ink">
                  {data.rows.map((row) => (
                    <tr key={row.id} className="border-t border-gold-soft/50 align-top">
                      <td className="px-4 py-4">
                        {row.fullName}
                        {row.createdAt && (
                          <span className="mt-1 block font-sans text-[0.58rem] uppercase tracking-[0.16em] text-ink-soft/70">
                            {new Date(row.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {row.attending === 'yes' ? 'Attending' : 'Regrets'}
                      </td>
                      <td className="px-4 py-4">
                        {row.attending === 'yes' ? (eventLabels[row.events] ?? row.events) : '—'}
                      </td>
                      <td className="px-4 py-4 tabular-nums">{row.guestCount || '—'}</td>
                      <td className="px-4 py-4 text-sm">
                        {row.email && <span className="block">{row.email}</span>}
                        {row.phone && <span className="block">{row.phone}</span>}
                        {!row.email && !row.phone && '—'}
                      </td>
                      <td className="max-w-xs px-4 py-4 text-ink-soft">{row.message || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
