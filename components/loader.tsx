'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ROUTE_PATH = 'M4 66 L60 66 L60 34 L140 34 L140 58 L210 58 L210 22 L280 22 L280 40 L292 40'

export function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Lock scroll while the intro plays
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setDone(true)
    }, 2400)
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
              className="w-full overflow-visible"
              fill="none"
              role="presentation"
            >
              {/* faint base track — a stylized route with clean angled turns */}
              <path
                d={ROUTE_PATH}
                stroke="var(--border)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* animated orange route being traveled */}
              <motion.path
                d={ROUTE_PATH}
                stroke="var(--brand)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
              />
              {/* moving marker traveling the route */}
              <motion.circle
                r="4"
                fill="var(--brand)"
                initial={{ offsetDistance: '0%' }}
                animate={{ offsetDistance: '100%' }}
                transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
                style={{ offsetPath: `path('${ROUTE_PATH}')` }}
              />
              {/* destination pin — pops in right as the marker arrives */}
              <motion.g
                initial={{ opacity: 0, scale: 0, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.75, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: '292px 32px' }}
              >
                <path
                  d="M292 40 C 285 40 279 34.5 279 27.5 C 279 20 292 8 292 8 C 292 8 305 20 305 27.5 C 305 34.5 299 40 292 40 Z"
                  fill="var(--brand)"
                />
                <circle cx="292" cy="27" r="4.5" fill="var(--background)" />
              </motion.g>
            </svg>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Image
                src="/logo-marinelly.png"
                alt="Transporte y Logística Marinelly"
                width={180}
                height={60}
                priority
                className="h-8 w-auto"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
