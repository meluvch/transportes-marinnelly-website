'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
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
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4'],
  })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="compromiso"
      className="scroll-mt-24 bg-background py-24 sm:py-32"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nuestro compromiso"
          title="Todo lo que hace que puedas delegar sin preocuparte."
          description="No trasladamos máquinas. Nos hacemos cargo de que lleguen exactamente como salieron."
        />

        {/* connecting orange line */}
        <div className="relative mt-14 mb-4 h-px w-full bg-border">
          <motion.div
            style={{ scaleX }}
            className="absolute inset-y-0 left-0 w-full origin-left bg-brand"
            aria-hidden="true"
          />
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {COMMITMENTS.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease }}
                className="group flex flex-col gap-4 bg-background p-7 transition-colors duration-300 hover:bg-neutral-50 sm:p-8"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border text-foreground transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand">
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
