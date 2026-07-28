'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

const N = COMMITMENTS.length
const ease = [0.16, 1, 0.3, 1] as const

// How much scroll (in px) each item's step takes on the mobile carousel.
const SCROLL_PER_ITEM = 220
const CARD_EASE = 'power1.inOut'

export function Commitment() {
  const pinRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // --- Mobile: pinned "one item at a time" carousel with a peek of what's next ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    mm.add('(max-width: 639px)', () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { yPercent: 0, opacity: 1 })
        } else if (i === 1) {
          gsap.set(card, { yPercent: 88, opacity: 0.35 })
        } else {
          gsap.set(card, { yPercent: 150, opacity: 0 })
        }
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=' + (N - 1) * SCROLL_PER_ITEM,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      })

      for (let i = 0; i < N - 1; i++) {
        // Current card fades out upward…
        tl.to(cardRefs.current[i]!, { yPercent: -16, opacity: 0, duration: 0.8, ease: CARD_EASE }, i)
        // …the peeking card underneath rises up to take its place…
        tl.to(cardRefs.current[i + 1]!, { yPercent: 0, opacity: 1, duration: 0.8, ease: CARD_EASE }, i)
        // …and the next one in line starts peeking in behind it.
        if (i + 2 < N) {
          tl.to(
            cardRefs.current[i + 2]!,
            { yPercent: 88, opacity: 0.35, duration: 0.8, ease: CARD_EASE },
            i
          )
        }
      }

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="compromiso"
      className="relative scroll-mt-24 rounded-t-[1.75rem] bg-background shadow-[0_-30px_60px_-24px_rgba(0,0,0,0.35)] sm:rounded-t-[2.5rem] sm:py-28"
    >
      {/* Desktop / tablet — unchanged grid, with a punchier hover state */}
      <div className="mx-auto hidden max-w-6xl px-6 sm:block lg:px-8">
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
                className="group relative flex items-center gap-4 bg-background p-5 transition-all duration-300 hover:z-10 hover:bg-brand/[0.04] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.15)] sm:p-6"
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
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand transition-all duration-300 ease-out group-hover:scale-125 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground group-hover:shadow-lg group-hover:shadow-brand/30"
                >
                  <Icon className="size-5" strokeWidth={1.5} />
                </motion.span>
                <div className="origin-left transition-transform duration-300 ease-out group-hover:scale-[1.06]">
                  <h3 className="relative inline-block font-display text-base font-semibold text-foreground">
                    {/* highlighter mark behind the title, sweeps in on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute -inset-x-1.5 top-[15%] -z-10 h-[70%] origin-left scale-x-0 -skew-x-6 bg-brand/25 transition-transform duration-400 ease-out group-hover:scale-x-100"
                    />
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    {item.text}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>

      {/* Mobile — pinned, one commitment at a time, with the next one peeking in */}
      <div ref={pinRef} className="flex min-h-[85svh] w-full flex-col px-6 pt-24 sm:hidden">
        <SectionHeading
          eyebrow="Nuestro compromiso"
          title="Todo lo que hace que puedas delegar sin preocuparte."
          description="No trasladamos máquinas. Nos hacemos cargo de que lleguen exactamente como salieron."
        />

        <div className="relative mt-8 h-72 shrink-0 overflow-hidden">
          {COMMITMENTS.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div
                key={item.title}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="absolute inset-x-0 top-0 flex flex-col items-start gap-4 rounded-2xl border border-border bg-background p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
