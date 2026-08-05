'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/site'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Escape closes the mobile menu, and focus moves into it on open and
  // back to the hamburger button on close — standard dialog behavior.
  useEffect(() => {
    if (!open) return

    const menuButton = menuButtonRef.current
    closeButtonRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      menuButton?.focus()
    }
  }, [open])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <div
        // Inert while the mobile menu overlay is open — otherwise this bar's
        // own links/hamburger button stay reachable by Tab underneath the
        // full-screen overlay that visually covers them.
        inert={open}
        className={`pointer-events-auto mt-3 flex w-full max-w-6xl items-center justify-between rounded-full border px-4 transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'h-14 border-border/70 bg-background/95 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl'
            : 'h-16 border-transparent bg-transparent'
        }`}
      >
        <a
          href="#inicio"
          className="flex items-center"
          aria-label="Transportes Marinelly - Inicio"
        >
          <Image
            src="/logo-marinelly.png"
            alt="Transportes Marinelly"
            width={180}
            height={60}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mix-blend-difference text-sm font-medium text-white transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-transform duration-200 hover:-translate-y-0.5 lg:inline-flex"
          >
            Solicitar cotización
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            // mix-blend-difference (same trick as the desktop nav links)
            // instead of a fixed text-foreground: a plain dark icon is
            // invisible against the dark hero before the header has scrolled
            // to its opaque state — this stays legible against any
            // background automatically.
            className="mix-blend-difference inline-flex size-10 items-center justify-center rounded-full text-white transition-opacity hover:opacity-70 lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="pointer-events-auto fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-6">
            <Image
              src="/logo-marinelly.png"
              alt="Transportes Marinelly"
              width={180}
              height={60}
              className="h-9 w-auto"
            />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-foreground/5"
              aria-label="Cerrar menú"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav
            className="flex flex-1 flex-col justify-center gap-2 px-6"
            aria-label="Móvil"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-2xl font-medium text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-brand px-6 py-4 text-base font-semibold text-brand-foreground"
            >
              Solicitar cotización
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
