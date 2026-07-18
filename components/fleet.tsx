'use client'

import { motion } from 'motion/react'
import { Gauge } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { FLEET } from '@/lib/site'
import {
  PlanchaIcon,
  Carreton15Icon,
  CarretonCuelloIcon,
  PlayoBalancinIcon,
  PortacontenedorIcon,
} from '@/components/icons/fleet-icons'

const ease = [0.16, 1, 0.3, 1] as const

const ICONS: Record<string, typeof PlanchaIcon> = {
  plancha: PlanchaIcon,
  'carreton-15m': Carreton15Icon,
  'carreton-cuello': CarretonCuelloIcon,
  'playo-balancin': PlayoBalancinIcon,
  portacontenedor: PortacontenedorIcon,
}

export function Fleet() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nuestra flota"
          title="Capacidad operativa para cada tonelada."
          description="Equipamiento especializado que se adapta al peso, la altura y el tipo de carga de tu maquinaria."
        />

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FLEET.map((unit, i) => {
            const Icon = ICONS[unit.slug]
            return (
              <motion.li
                key={unit.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease }}
                className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-background p-6 transition-colors duration-300 hover:border-brand/40 hover:bg-neutral-50"
              >
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 + 0.1, ease }}
                  className="inline-flex size-14 items-center justify-center rounded-xl border border-border text-foreground transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand"
                >
                  <Icon className="size-8" strokeWidth={1.4} />
                </motion.span>

                <div>
                  <h3 className="font-display text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-brand">
                    {unit.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Gauge className="size-3.5 shrink-0" />
                    {unit.capacity}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
