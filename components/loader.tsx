'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// An asymmetric swoosh — eases into a shallow dip, then sweeps up with
// gathering momentum, instead of a repeating, symmetric wave.
const ROUTE_PATH = 'M 20 118 C 76 156, 132 156, 176 118 C 244 62, 322 12, 412 34'
const DRAW_DURATION = 1.9
const DRAW_EASE = [0.65, 0, 0.35, 1] as const

export function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Lock scroll while the intro plays
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setDone(true)
    }, 2500)
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
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          aria-hidden="true"
        >
          <div className="flex w-full max-w-lg flex-col items-center gap-8 px-6">
            <svg
              viewBox="0 0 440 180"
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

              {/* the line being drawn */}
              <motion.path
                d={ROUTE_PATH}
                stroke="var(--brand)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: DRAW_DURATION, ease: DRAW_EASE }}
              />

              {/* traveling marker */}
              <motion.circle
                r="5"
                fill="var(--brand)"
                initial={{ offsetDistance: '0%', scale: 0.6 }}
                animate={{ offsetDistance: '100%', scale: 1 }}
                transition={{
                  offsetDistance: { duration: DRAW_DURATION, ease: DRAW_EASE },
                  scale: { duration: 0.3, ease: 'easeOut' },
                }}
                style={{ offsetPath: `path('${ROUTE_PATH}')` }}
              />
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/logo-marinelly.png"
                alt="Transporte y Logística Marinelly"
                width={180}
                height={60}
                priority
                className="h-8 w-auto grayscale sm:h-9"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
