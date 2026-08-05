'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'

export function Impact() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70svh] items-center overflow-hidden bg-neutral-900 sm:min-h-[85svh]"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-[8%] h-[116%]" aria-hidden="true">
        <Image
          src="/cadatraslado.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-3xl font-semibold leading-tight text-balance text-white sm:text-4xl lg:text-5xl"
        >
          Cada traslado es una responsabilidad.
          <span className="block text-white/55">No una carga más.</span>
        </motion.h2>
      </div>
    </section>
  )
}
