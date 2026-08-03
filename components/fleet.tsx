'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { FLEET, type FleetUnit } from '@/lib/site'
import {
  PlanchaIcon,
  Carreton15Icon,
  CarretonCuelloIcon,
  PlayoBalancinIcon,
} from '@/components/icons/fleet-icons'
import { ICONS } from '@/components/icons/transport-icons'

const ease = [0.16, 1, 0.3, 1] as const

const UNIT_ICONS: Record<string, typeof PlanchaIcon> = {
  plancha: PlanchaIcon,
  'carreton-15m': Carreton15Icon,
  'carreton-cuello': CarretonCuelloIcon,
  'playo-balancin': PlayoBalancinIcon,
}

// Collapsed height: shows the first spec plus a sliver of the next one, so
// the list visibly continues below the fold instead of looking complete.
const PEEK_HEIGHT = 42
const EXPANDED_MAX_HEIGHT = 320

function FleetCard({ unit, index }: { unit: FleetUnit; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const UnitIcon = UNIT_ICONS[unit.slug]

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1, ease }}
      className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-background p-6 transition-colors duration-500 hover:border-brand"
    >
      {/* orange fill that grows in from behind on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-y-100"
      />

      {/* Invisible full-card button — bigger tap target than a small chevron,
          and keeps the spec <ul> out of the button's content model. */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Ocultar' : 'Ver'} especificaciones de ${unit.name}`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      <div className="relative flex items-start gap-4">
        <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-xl border border-border text-foreground transition-colors duration-500 group-hover:border-brand-foreground/30 group-hover:text-brand-foreground">
          <UnitIcon className="size-8" strokeWidth={1.4} />
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-foreground transition-colors duration-500 group-hover:text-brand-foreground">
          {unit.name}
        </h3>
      </div>

      <div className="relative border-t border-border pt-4 transition-colors duration-500 group-hover:border-brand-foreground/20">
        <div
          className="overflow-hidden transition-[max-height] duration-500 ease-out"
          style={{ maxHeight: expanded ? EXPANDED_MAX_HEIGHT : PEEK_HEIGHT }}
        >
          <motion.ul
            className="flex flex-col gap-2.5"
            animate={expanded ? { y: 0 } : { y: [0, -4, 0] }}
            transition={
              expanded
                ? { duration: 0.3, ease: 'easeOut' }
                : {
                    duration: 2.8,
                    repeat: Infinity,
                    repeatDelay: 1.6,
                    ease: 'easeInOut',
                  }
            }
          >
            {unit.specs.map((spec, specIndex) => {
              const SpecIcon = ICONS[spec.icon]
              return (
                <li
                  key={specIndex}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors duration-500 group-hover:text-brand-foreground/85"
                >
                  <SpecIcon className="size-4 shrink-0" strokeWidth={1.6} />
                  {spec.label}
                </li>
              )
            })}
          </motion.ul>
        </div>

        {/* Fade the peeking sliver into the card background so the cut reads
            as intentional rather than clipped content. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-background to-transparent transition-opacity duration-300 group-hover:from-brand ${
            expanded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        <span className="relative mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/70 transition-colors duration-500 group-hover:text-brand-foreground/70">
          <ChevronDown
            aria-hidden="true"
            className={`size-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
          {expanded ? 'Ver menos' : 'Ver especificaciones'}
        </span>
      </div>
    </motion.li>
  )
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
          {FLEET.map((unit, i) => (
            <FleetCard key={unit.name} unit={unit} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
