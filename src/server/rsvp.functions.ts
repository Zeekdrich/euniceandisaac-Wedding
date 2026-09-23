import { createServerFn } from '@tanstack/react-start'
import { desc } from 'drizzle-orm'
import { db } from '../../db/index'
import { rsvps } from '../../db/schema'

const ATTENDING = ['yes', 'no']
const EVENTS = ['both', 'traditional', 'church']

export type RsvpInput = {
  fullName: string
  email: string
  phone: string
  attending: string
  events: string
  guestCount: number
  message: string
}

function text(value: unknown, field: string, { max = 500, required = false } = {}) {
  const trimmed = typeof value === 'string' ? value.trim() : ''
  if (required && trimmed.length === 0) {
    throw new Error(`${field} is required`)
  }
  return trimmed.slice(0, max)
}

/** Records a guest's reply. Returns the guest's name so the page can thank them. */
export const submitRsvp = createServerFn({ method: 'POST' })
  .inputValidator((data: RsvpInput) => {
    const attending = text(data?.attending, 'Attendance')
    const events = text(data?.events, 'Celebration')
    const guestCount = Number(data?.guestCount)

    return {
      fullName: text(data?.fullName, 'Name', { max: 120, required: true }),
      email: text(data?.email, 'Email', { max: 160 }),
      phone: text(data?.phone, 'Phone', { max: 40 }),
      attending: ATTENDING.includes(attending) ? attending : 'yes',
      events: EVENTS.includes(events) ? events : 'both',
      guestCount: Number.isFinite(guestCount)
        ? Math.min(Math.max(Math.trunc(guestCount), 1), 10)
        : 1,
      message: text(data?.message, 'Message', { max: 1000 }),
    }
  })
  .handler(async ({ data }) => {
    const attending = data.attending === 'yes'
    const [row] = await db
      .insert(rsvps)
      .values({
        fullName: data.fullName,
        email: data.email || null,
        phone: data.phone || null,
        attending: data.attending,
        events: attending ? data.events : 'both',
        guestCount: attending ? data.guestCount : 0,
        message: data.message || null,
      })
      .returning({ id: rsvps.id, fullName: rsvps.fullName })

    return { id: row.id, fullName: row.fullName, attending }
  })

const FALLBACK_PASSCODE = 'isaac-eunice-2026'

/** Reads the guest list. Gated by a shared passcode the couple keeps private. */
export const getRsvps = createServerFn({ method: 'POST' })
  .inputValidator((data: { passcode: string }) => ({
    passcode: typeof data?.passcode === 'string' ? data.passcode.trim() : '',
  }))
  .handler(async ({ data }) => {
    const expected = process.env.RSVP_ADMIN_PASSCODE || FALLBACK_PASSCODE
    if (data.passcode !== expected) {
      throw new Error('That passcode is not right.')
    }

    const rows = await db.select().from(rsvps).orderBy(desc(rsvps.createdAt))
    const coming = rows.filter((row) => row.attending === 'yes')

    return {
      rows: rows.map((row) => ({
        ...row,
        createdAt: row.createdAt ? row.createdAt.toISOString() : null,
      })),
      summary: {
        replies: rows.length,
        coming: coming.length,
        regrets: rows.length - coming.length,
        guests: coming.reduce((total, row) => total + row.guestCount, 0),
      },
    }
  })
