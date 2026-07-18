'use client'

import { motion } from 'motion/react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/site'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh w-full items-end overflow-hidden bg-neutral-900"
    >
      {/* Branded backdrop — shown until a real hero video/photo is provided */}
      <div className="absolute inset-0 bg-neutral-900" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(135deg,white_0,white_1px,transparent_1px,transparent_14px)]" />
        <div className="absolute right-0 top-1/4 h-64 w-64 translate-x-1/3 rounded-full bg-brand/20 blur-3xl" />
      </div>

      {/*
        To use a real background video, drop a file at /public/hero.mp4
        (and an optional /public/hero-poster.jpg) and uncomment below:

        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay muted loop playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      */}

      {/* Contrast overlays — darker on the left where the text sits */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
        aria-hidden="true"
      />

      {/* Editorial content — bottom-left aligned, not centered */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 sm:pb-28 lg:px-8">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70"
          >
            <span className="h-px w-6 bg-brand" aria-hidden="true" />
            Transporte de maquinaria pesada
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            Movemos tu maquinaria con la precisión que tu proyecto exige.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease }}
            className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-white/75 sm:text-lg"
          >
            Cargas especiales y equipos pesados en toda Argentina. Planificación,
            seguros y seguimiento en cada traslado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.44, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Solicitar cotización
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
            >
              Ver qué transportamos
            </a>
          </motion.div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-white/50"
        >
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
