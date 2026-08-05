import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { LOCATION, TRANSPORT_ITEMS } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const SITE_URL = 'https://www.transportesmarinelly.com.ar'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Transportes Marinelly | Transporte de Maquinaria Pesada',
    template: '%s | Transportes Marinelly',
  },
  // Brand name kept short and consistent ("Transportes Marinelly"); the
  // descriptive keywords (transporte, logística, cargas especiales,
  // industrial) live in the copy around it instead of inside the name
  // itself — kept to ~150 chars so Google doesn't truncate the snippet.
  description:
    `Transportes Marinelly: transporte y logística de maquinaria pesada, cargas especiales y equipos industriales en toda Argentina. Cobertura nacional.`,
  keywords: [
    'transporte de maquinaria pesada',
    'transporte de cargas especiales',
    'transporte industrial',
    'transporte de excavadoras',
    'transporte de retroexcavadoras',
    'transporte de motoniveladoras',
    'transporte de grúas',
    'transporte de maquinaria agrícola',
    'transporte de maquinaria industrial',
    'transporte de maquinaria vial',
    'logística de cargas especiales',
    'logística Argentina',
    LOCATION.base,
  ],
  authors: [{ name: 'Transportes Marinelly' }],
  creator: 'Transportes Marinelly',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: 'Transportes Marinelly',
    title: 'Transportes Marinelly | Transporte de Maquinaria Pesada',
    description:
      `Transporte y logística de maquinaria pesada y cargas especiales en toda Argentina. Cobertura nacional con base operativa en ${LOCATION.base}, Buenos Aires.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transportes Marinelly',
    description:
      'Transporte y logística de maquinaria pesada, cargas especiales y equipos industriales en toda Argentina. Cobertura nacional.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  // schema.org has no dedicated "freight/heavy-haul trucking" type, and
  // MovingCompany's own description ("a moving company") leans toward
  // household/office relocation rather than machinery transport. Listing
  // both types keeps the closest specific match (MovingCompany) while
  // guaranteeing generic LocalBusiness recognition (what actually drives
  // Google's local-pack/map eligibility) even if a parser doesn't resolve
  // MovingCompany's own inheritance from LocalBusiness.
  '@type': ['MovingCompany', 'LocalBusiness'],
  name: 'Transportes Marinelly',
  // Descriptive form some existing citations/searches may still use — kept
  // as alternateName (not the primary name) so it stays associated with
  // the same entity without fragmenting the brand shown to users.
  alternateName: 'Transporte y Logística Marinelly',
  description:
    'Transporte y logística de maquinaria pesada, cargas especiales y equipos industriales en toda Argentina.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-marinelly.png`,
  image: `${SITE_URL}/logo-marinelly.png`,
  email: 'contacto@transportesmarinelly.com.ar',
  telephone: '+5491163640392',
  // The site publicly states nationwide coverage plus named frequent routes
  // (see Coverage section) — both captured here rather than only the
  // country-level entry.
  areaServed: [
    { '@type': 'Country', name: 'Argentina' },
    { '@type': 'State', name: 'Buenos Aires' },
    { '@type': 'State', name: 'Córdoba' },
    { '@type': 'State', name: 'Mendoza' },
    { '@type': 'State', name: 'Neuquén' },
    { '@type': 'State', name: 'Corrientes' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: LOCATION.base,
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  // RECOMMENDATION: these are approximate coordinates for Quilmes' city
  // center, not a verified pin for this specific business — the site
  // doesn't publish a street address (common for operators without a
  // public-facing yard). Once there's a real Google Business Profile /
  // Maps pin, swap these for its exact coordinates instead.
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.7203,
    longitude: -58.2545,
  },
  knowsAbout: [
    'Transporte de maquinaria pesada',
    'Transporte de cargas especiales',
    'Transporte de maquinaria agrícola',
    'Transporte de maquinaria vial',
    'Transporte industrial',
    'Logística de maquinaria pesada',
  ],
  // One Service entry per category actually offered (from the same data
  // that drives the "Qué transportamos" section) — gives search engines
  // and AI answer engines a concrete service list instead of just a
  // one-line description.
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Categorías de transporte',
    itemListElement: TRANSPORT_ITEMS.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.title,
        description: item.description,
      },
    })),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es-AR"
      className={`light ${inter.variable} ${manrope.variable}`}
    >
      <body className="bg-background antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
