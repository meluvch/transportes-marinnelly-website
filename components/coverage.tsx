'use client'

import { motion } from 'motion/react'
import { ArrowRight, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { WHATSAPP_URL } from '@/lib/site'

export function Coverage() {
  return (
    <section id="cobertura" className="scroll-mt-24 bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Cobertura"
              title="Operamos en todo el país."
              description="Llegamos a cualquier punto de Argentina. Bernal, Buenos Aires es nuestra base operativa, pero tu proyecto puede estar donde sea."
            />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <MapPin className="size-4" />
                </span>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Base operativa:</span> Bernal,
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
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[3/4] w-full max-w-sm"
          >
            <div className="ar-map absolute inset-0 bg-neutral-300/80" aria-hidden="true" />
            <div
              className="ar-map absolute inset-0 bg-brand/10"
              aria-hidden="true"
            />
            {/* Bernal marker */}
            <div
              className="absolute"
              style={{ left: '62%', top: '58%' }}
            >
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-3 rounded-full bg-brand ring-2 ring-background" />
              </span>
              <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-background px-2 py-0.5 text-xs font-medium text-foreground shadow-sm">
                Bernal
              </span>
            </div>
            <span className="sr-only">
              Mapa de Argentina indicando cobertura nacional con base operativa en
              Bernal, Buenos Aires.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
