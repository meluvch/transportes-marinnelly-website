'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Lock scroll while the intro plays
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setDone(true)
    }, 2200)
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
          <div className="flex w-full max-w-md flex-col items-center gap-8 px-6">
            <svg
              viewBox="0 0 300 80"
              className="w-full"
              fill="none"
              role="presentation"
            >
              {/* faint base track */}
              <path
                d="M4 60 C 60 60, 70 20, 120 20 S 200 60, 250 40 S 296 20, 296 20"
                stroke="var(--border)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* animated orange route */}
              <motion.path
                d="M4 60 C 60 60, 70 20, 120 20 S 200 60, 250 40 S 296 20, 296 20"
                stroke="var(--brand)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
              />
              {/* moving marker */}
              <motion.circle
                r="4"
                fill="var(--brand)"
                initial={{ offsetDistance: '0%' }}
                animate={{ offsetDistance: '100%' }}
                transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
                style={{
                  offsetPath:
                    "path('M4 60 C 60 60, 70 20, 120 20 S 200 60, 250 40 S 296 20, 296 20')",
                }}
              />
            </svg>
            <motion.span
              className="font-display text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Marinelly
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
