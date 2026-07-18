'use client'

import { motion } from 'motion/react'
import { ArrowRight, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { WHATSAPP_URL } from '@/lib/site'

const ease = [0.16, 1, 0.3, 1] as const

// Coordinates are percentages of the map CONTAINER (the aspect-[3/4] box),
// already corrected for the letterboxing the CSS mask applies to the square
// Argentina SVG. Calibrated by rendering /public/map/argentina.svg and
// checking each point against the real silhouette.
const ORIGIN = { name: 'Quilmes', x: 49, y: 58.3 }

const MAIN_DESTINATIONS = [
  { name: 'Córdoba', x: 44, y: 49.3 },
  { name: 'Mendoza', x: 33, y: 51.5 },
  { name: 'Neuquén', x: 30, y: 65.8 },
  { name: 'Corrientes', x: 62, y: 32 },
]

// Smaller, fainter points across the rest of the country — implies national
// coverage without competing visually with the four main destinations.
const OTHER_DESTINATIONS = [
  { x: 38, y: 18.5 },
  { x: 58, y: 27.5 },
  { x: 52, y: 45.5 },
  { x: 30, y: 44 },
  { x: 40, y: 62 },
  { x: 44, y: 68.8 },
  { x: 36, y: 74 },
  { x: 30, y: 80 },
  { x: 38, y: 85.8 },
]

export function Coverage() {
  return (
    <section id="cobertura" className="scroll-mt-24 bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Cobertura"
              title="Operamos en todo el país."
              description="Llegamos a cualquier punto de Argentina. Zona de Quilmes, Buenos Aires es nuestra base operativa, pero tu proyecto puede estar donde sea."
            />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <MapPin className="size-4" />
                </span>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Base operativa:</span> Quilmes,
                  Provincia de Buenos Aires
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-foreground/5 text-foreground">
                  <span className="size-2 rounded-full bg-foreground" />
                </span>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Cobertura:</span> Nacional, en
                  cualquier provincia
                </p>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Consultanos por traslados especiales
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="relative mx-auto aspect-[3/4] w-full max-w-sm"
          >
            {/* Argentina silhouette */}
            <div className="ar-map absolute inset-0 bg-neutral-300/80" aria-hidden="true" />
            <div className="ar-map absolute inset-0 bg-brand/10" aria-hidden="true" />

            {/* Lines + dots overlay. viewBox 0-100 maps 1:1 to container %. */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              {/* Faint lines + dots to the rest of the country */}
              {OTHER_DESTINATIONS.map((d, i) => (
                <g key={`other-${i}`}>
                  <motion.line
                    x1={ORIGIN.x}
                    y1={ORIGIN.y}
                    x2={d.x}
                    y2={d.y}
                    stroke="currentColor"
                    strokeWidth={0.3}
                    className="text-foreground/25"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.04, ease }}
                  />
                  <motion.circle
                    cx={d.x}
                    cy={d.y}
                    r={0.9}
                    className="fill-foreground/40"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.04, ease }}
                  />
                </g>
              ))}

              {/* Bold lines to the four main destinations */}
              {MAIN_DESTINATIONS.map((d, i) => (
                <motion.line
                  key={`main-line-${d.name}`}
                  x1={ORIGIN.x}
                  y1={ORIGIN.y}
                  x2={d.x}
                  y2={d.y}
                  stroke="currentColor"
                  strokeWidth={0.6}
                  strokeLinecap="round"
                  className="text-brand"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.12, ease }}
                />
              ))}

              {/* Main destination markers */}
              {MAIN_DESTINATIONS.map((d, i) => (
                <motion.circle
                  key={`main-dot-${d.name}`}
                  cx={d.x}
                  cy={d.y}
                  r={1.6}
                  className="fill-neutral-900 stroke-white"
                  strokeWidth={0.4}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: 1.1 + i * 0.12, ease }}
                />
              ))}
            </svg>

            {/* Main destination labels (HTML for crisp, non-stretched text) */}
            {MAIN_DESTINATIONS.map((d, i) => (
              <motion.span
                key={`label-${d.name}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 1.3 + i * 0.12 }}
                className="absolute -translate-y-1/2 whitespace-nowrap rounded-full bg-background px-2 py-0.5 text-[11px] font-medium text-foreground shadow-sm"
                style={{ left: `calc(${d.x}% + 10px)`, top: `${d.y}%` }}
              >
                {d.name}
              </motion.span>
            ))}

            {/* Origin marker: Quilmes */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${ORIGIN.x}%`, top: `${ORIGIN.y}%` }}
            >
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-3 rounded-full bg-brand ring-2 ring-background" />
              </span>
              <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-brand-foreground shadow-sm">
                {ORIGIN.name}
              </span>
            </div>

            <span className="sr-only">
              Mapa de Argentina indicando cobertura nacional, con base operativa en
              Quilmes, Buenos Aires, y rutas frecuentes hacia Córdoba, Mendoza,
              Neuquén y Corrientes.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
