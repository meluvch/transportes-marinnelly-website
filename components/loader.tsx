'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// A single flowing "S" curve — evokes a route being traveled without the
// literal map-turn styling of the old version.
const ROUTE_PATH = 'M 24 146 C 100 20, 170 20, 220 96 C 270 172, 340 172, 416 56'
const DRAW_DURATION = 2.1
const DRAW_EASE = [0.65, 0, 0.35, 1] as const

export function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Lock scroll while the intro plays
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setDone(true)
    }, 2900)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    if (done) {
      document.body.style.overflow = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
          aria-hidden="true"
        >
          {/* Soft ambient glow behind the mark, for depth */}
          <motion.div
            className="pointer-events-none absolute size-[36rem] rounded-full bg-brand/10 blur-3xl"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />

          <div className="relative flex w-full max-w-2xl flex-col items-center gap-10 px-6">
            <svg
              viewBox="0 0 440 200"
              className="w-full overflow-visible"
              fill="none"
              role="presentation"
            >
              {/* faint base track */}
              <motion.path
                d={ROUTE_PATH}
                stroke="var(--border)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* soft glowing trail behind the drawn line */}
              <motion.path
                d={ROUTE_PATH}
                stroke="var(--brand)"
                strokeWidth="10"
                strokeLinecap="round"
                className="opacity-20 blur-[6px]"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: DRAW_DURATION, ease: DRAW_EASE }}
              />

              {/* the line being drawn */}
              <motion.path
                d={ROUTE_PATH}
                stroke="var(--brand)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: DRAW_DURATION, ease: DRAW_EASE }}
              />

              {/* traveling marker, with its own soft glow */}
              <motion.circle
                r="10"
                fill="var(--brand)"
                className="opacity-30 blur-[3px]"
                initial={{ offsetDistance: '0%' }}
                animate={{ offsetDistance: '100%' }}
                transition={{ duration: DRAW_DURATION, ease: DRAW_EASE }}
                style={{ offsetPath: `path('${ROUTE_PATH}')` }}
              />
              <motion.circle
                r="6"
                fill="var(--brand)"
                initial={{ offsetDistance: '0%', scale: 0.6 }}
                animate={{ offsetDistance: '100%', scale: 1 }}
                transition={{
                  offsetDistance: { duration: DRAW_DURATION, ease: DRAW_EASE },
                  scale: { duration: 0.3, ease: 'easeOut' },
                }}
                style={{ offsetPath: `path('${ROUTE_PATH}')` }}
              />

              {/* destination pin — pops in right as the marker arrives */}
              <motion.g
                initial={{ opacity: 0, scale: 0, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: DRAW_DURATION - 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: '416px 45px' }}
              >
                <path
                  d="M416 56 C 406 56 398 48.5 398 39 C 398 28 416 10 416 10 C 416 10 434 28 434 39 C 434 48.5 426 56 416 56 Z"
                  fill="var(--brand)"
                />
                <circle cx="416" cy="38" r="6.5" fill="var(--background)" />
              </motion.g>
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/logo-marinelly.png"
                alt="Transporte y Logística Marinelly"
                width={220}
                height={73}
                priority
                className="h-10 w-auto sm:h-12"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
