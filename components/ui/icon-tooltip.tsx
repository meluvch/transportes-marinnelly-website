'use client'

import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

type IconTooltipProps = {
  label: string
  className?: string
  children: ReactNode
}

/** A small, self-contained tooltip (not the native `title`) that opens on
 *  hover/focus for desktop and on tap for touch devices — the trigger
 *  itself owns the open state instead of relying on `:hover`. */
export function IconTooltip({ label, className = '', children }: IconTooltipProps) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-describedby={id}
        // Pointer events (not mouse events) so a tap's synthetic "enter" is
        // ignored — otherwise touch would open it and the click right after
        // would immediately toggle it shut again. Click alone covers both
        // touch (tap) and keyboard (Enter/Space triggers a click too).
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') setOpen(true)
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') setOpen(false)
        }}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        className={`inline-flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 ${className}`}
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            id={id}
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-max max-w-[calc(100vw-3rem)] text-left sm:max-w-[220px]"
          >
            <span className="absolute -top-1 left-3.5 size-2 rotate-45 bg-foreground" />
            <span className="relative block rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium leading-snug text-background shadow-lg">
              {label}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
