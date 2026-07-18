'use client'

import { motion } from 'motion/react'
import {
  UserCheck,
  Satellite,
  FileCheck,
  ShieldCheck,
  Map,
  Route,
  Headset,
  Zap,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { COMMITMENTS } from '@/lib/site'

const ICONS: LucideIcon[] = [
  UserCheck,
  Satellite,
  FileCheck,
  ShieldCheck,
  Map,
  Route,
  Headset,
  Zap,
  Wrench,
]

const ease = [0.16, 1, 0.3, 1] as const

export function Commitment() {
  return (
    <section id="compromiso" className="scroll-mt-24 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nuestro compromiso"
          title="Todo lo que hace que puedas delegar sin preocuparte."
          description="No trasladamos máquinas. Nos hacemos cargo de que lleguen exactamente como salieron."
        />

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {COMMITMENTS.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease }}
                className="group flex items-center gap-4 bg-background p-5 transition-colors duration-300 hover:bg-neutral-50 sm:p-6"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.5,
                    delay: (i % 3) * 0.08 + 0.15,
                    ease,
                  }}
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border text-foreground transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand"
                >
                  <Icon className="size-5" strokeWidth={1.5} />
                </motion.span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    {item.text}
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
