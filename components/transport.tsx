'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpRight, Truck } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { TRANSPORT_ITEMS, WHATSAPP_URL } from '@/lib/site'

const ease = [0.16, 1, 0.3, 1] as const

export function Transport() {
  return (
    <section id="servicios" className="scroll-mt-24 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Qué transportamos"
          title="Equipos pesados y cargas especiales, en manos expertas."
          description="Cada tipo de maquinaria requiere una logística propia. Preparamos el equipamiento, los permisos y la ruta para cada traslado."
        />

        {/* Recommended photos: horizontal, ~1200x800px (3:2), .jpg, under ~300kb each */}
        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRANSPORT_ITEMS.map((item, i) => (
            <motion.li
              key={item.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
            >
              <a
                href={`${WHATSAPP_URL}%20-%20${encodeURIComponent(item.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-colors duration-300 hover:border-brand/40"
                aria-label={`Solicitar traslado de ${item.title}`}
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-900">
                  {item.image ? (
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={`Transporte de ${item.title.toLowerCase()}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    /* Branded fallback until a real photo is provided */
                    <div className="absolute inset-0 bg-neutral-900" aria-hidden="true">
                      <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(135deg,white_0,white_1px,transparent_1px,transparent_11px)]" />
                      <Truck className="absolute right-4 top-4 size-8 text-white/15 transition-all duration-700 group-hover:right-5 group-hover:text-brand/60" />
                      <span className="absolute left-5 top-5 font-display text-4xl font-bold leading-none text-white/[0.06] tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-brand">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
