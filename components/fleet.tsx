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
} from '@/components/icons/fleet-icons'

const ease = [0.16, 1, 0.3, 1] as const

const ICONS: Record<string, typeof PlanchaIcon> = {
  plancha: PlanchaIcon,
  'carreton-15m': Carreton15Icon,
  'carreton-cuello': CarretonCuelloIcon,
  'playo-balancin': PlayoBalancinIcon,
}

export function Fleet() {
  return (
    <section id="flota" className="scroll-mt-24 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nuestra flota"
          title="Capacidad operativa para cada tonelada."
          description="Equipamiento especializado que se adapta al peso, la altura y el tipo de carga de tu maquinaria."
        />

        {/* 4 units, 2 columns x 2 rows */}
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FLEET.map((unit, i) => {
            const Icon = ICONS[unit.slug]
            return (
              <motion.li
                key={unit.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.1, ease }}
                className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-border bg-background p-6 transition-colors duration-500 hover:border-brand"
              >
                {/* orange fill that grows in from behind on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-y-100"
                />

                <span className="relative inline-flex size-14 items-center justify-center rounded-xl border border-border text-foreground transition-colors duration-500 group-hover:border-brand-foreground/30 group-hover:text-brand-foreground">
                  <Icon className="size-8" strokeWidth={1.4} />
                </span>

                <div className="relative">
                  <h3 className="font-display text-base font-semibold text-foreground transition-colors duration-500 group-hover:text-brand-foreground">
                    {unit.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-500 group-hover:text-brand-foreground/85">
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
