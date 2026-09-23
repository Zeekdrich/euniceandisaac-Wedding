import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

const siteName = 'Isaac & Eunice · 22–23 December 2026'
const siteDescription =
  'Isaac and Eunice invite you to their traditional wedding on 22 December and their church wedding on 23 December 2026 in Onicha Igo, Kogi State. RSVP online.'

const fontHref =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Great+Vibes&family=Jost:wght@300;400;500&display=swap'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: siteName },
      { name: 'description', content: siteDescription },
      { name: 'theme-color', content: '#fdfbf6' },
      { property: 'og:title', content: siteName },
      { property: 'og:description', content: siteDescription },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:image',
        content: '/.netlify/images?url=/img/hero-florals.png&w=1200&fm=jpg&q=80',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: fontHref },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Faint pressed-paper wash behind every page. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center opacity-60 mix-blend-multiply"
          style={{
            backgroundImage:
              'url(/.netlify/images?url=/img/paper-texture.png&w=1400&fm=webp&q=60)',
          }}
        />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
