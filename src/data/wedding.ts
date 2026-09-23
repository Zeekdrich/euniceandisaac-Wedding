/**
 * Every detail shown on the invitation lives here, so the couple's names,
 * dates, venues and wording can be updated in one place.
 */
export const wedding = {
  bride: 'Eunice',
  groom: 'Isaac',
  monogram: 'I & E',
  hashtag: '#IsaacAndEunice2026',
  /** The church ceremony — used for the countdown and the page metadata. */
  weddingDay: '2026-12-23T11:00:00+01:00',
  location: 'Onicha Igo, Kogi State',
  invitationLine:
    'Together with our families, we joyfully invite you to celebrate our marriage.',
  scripture: {
    text: 'Therefore what God has joined together, let no one separate.',
    reference: 'Mark 10:9',
  },
  events: [
    {
      name: 'Traditional Wedding',
      date: 'Tuesday, 22 December 2026',
      time: 'Time to be confirmed',
      place: 'Onicha Igo, Kogi State',
      description:
        'Our families come together in the old way — kolanut and prayers, music, dancing and the blessing of our union.',
      accent: 'Day One',
    },
    {
      name: 'Church Wedding',
      date: 'Wednesday, 23 December 2026',
      time: '11:00 AM',
      place: 'Onicha Igo, Kogi State',
      description:
        'The holy matrimony service. Guests are kindly asked to be seated by 10:00 AM so the ceremony can begin promptly.',
      accent: 'Day Two',
    },
    {
      name: 'Reception',
      date: 'Wednesday, 23 December 2026',
      time: 'Immediately after the ceremony',
      place: 'Onicha Igo, Kogi State',
      description:
        'Stay with us for the feast — food, drinks, highlife and the first dance as husband and wife.',
      accent: 'Day Two',
    },
  ],
  details: [
    {
      title: 'Dress Code',
      body: 'Formal and festive. Traditional attire is warmly welcomed on both days.',
    },
    {
      title: 'Arriving',
      body: 'Onicha Igo, Kogi State. Directions will be shared with every guest who RSVPs.',
    },
    {
      title: 'Questions',
      body: 'Leave a note with your RSVP and one of us will get back to you.',
    },
  ],
} as const

export const eventOptions = [
  { value: 'both', label: 'Both days — traditional and church' },
  { value: 'traditional', label: 'Traditional wedding only (22 December)' },
  { value: 'church', label: 'Church wedding and reception only (23 December)' },
] as const
