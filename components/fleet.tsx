'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/section-heading'
import { FLEET } from '@/lib/site'

const ease = [0.16, 1, 0.3, 1] as const

export function Fleet() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Nuestra flota"
            title="Capacidad operativa para cada tonelada."
            description="Equipamiento especializado que se adapta al peso, la altura y el tipo de carga de tu maquinaria."
          />

          <ul className="flex flex-col">
            {FLEET.map((unit, i) => (
              <motion.li
                key={unit.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease }}
                className="group flex items-baseline justify-between gap-6 border-t border-border py-6 last:border-b"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-brand sm:text-xl">
                    {unit.name}
                  </h3>
                </div>
                <span className="shrink-0 text-right text-sm text-muted-foreground sm:text-base">
                  {unit.capacity}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
