import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { LOCATION } from '@/lib/site'
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
    default: 'Transporte y Logística Marinelly | Transporte de maquinaria pesada',
    template: '%s | Transporte y Logística Marinelly',
  },
  // Kept to ~150 chars — past ~155-160, Google truncates the snippet
  // mid-sentence with "…" instead of showing what we actually wrote.
  description:
    `Transporte de maquinaria pesada y cargas especiales en toda Argentina. Excavadoras, grúas y equipos industriales. Base en ${LOCATION.base}, cobertura nacional.`,
  keywords: [
    'transporte de maquinaria pesada',
    'transporte de cargas especiales',
    'transporte de excavadoras',
    'transporte de retroexcavadoras',
    'transporte de motoniveladoras',
    'transporte de grúas',
    'transporte de maquinaria agrícola',
    'transporte de maquinaria industrial',
    'transporte de maquinaria vial',
    'logística Argentina',
    LOCATION.base,
  ],
  authors: [{ name: 'Transporte y Logística Marinelly' }],
  creator: 'Transporte y Logística Marinelly',
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
    siteName: 'Transporte y Logística Marinelly',
    title: 'Transporte y Logística Marinelly | Transporte de maquinaria pesada',
    description:
      `Transporte de maquinaria pesada y cargas especiales en toda Argentina. Cobertura nacional con base operativa en ${LOCATION.base}, Buenos Aires.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transporte y Logística Marinelly',
    description:
      'Transporte de maquinaria pesada y cargas especiales en toda Argentina. Cobertura nacional.',
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
  '@type': 'MovingCompany',
  name: 'Transporte y Logística Marinelly',
  description:
    'Transporte de maquinaria pesada y cargas especiales en toda Argentina.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-marinelly.png`,
  image: `${SITE_URL}/logo-marinelly.png`,
  email: 'contacto@transportesmarinelly.com.ar',
  telephone: '+5491163640392',
  areaServed: {
    '@type': 'Country',
    name: 'Argentina',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: LOCATION.base,
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
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
  ],
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
