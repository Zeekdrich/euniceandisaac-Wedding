import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

/** One row per RSVP submitted from the invitation page. */
export const rsvps = pgTable('rsvps', {
  id: serial().primaryKey(),
  fullName: text('full_name').notNull(),
  email: text(),
  phone: text(),
  /** 'yes' when the guest is coming, 'no' when they send their regrets. */
  attending: text().notNull(),
  /** Which celebration(s) they will join: 'both' | 'traditional' | 'church'. */
  events: text().notNull(),
  /** Total people in the party, including the guest who replied. */
  guestCount: integer('guest_count').notNull().default(1),
  message: text(),
  createdAt: timestamp('created_at').defaultNow(),
})
