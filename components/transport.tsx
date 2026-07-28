'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, MessageCircle, Truck, X } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { IconTooltip } from '@/components/ui/icon-tooltip'
import { ICONS, ICON_CATEGORY_STYLES, ICON_CATEGORY } from '@/components/icons/transport-icons'
import { TRANSPORT_ITEMS, WHATSAPP_URL } from '@/lib/site'

const N = TRANSPORT_ITEMS.length // 9 categories
const CTA_INDEX = N // the deck's final "card" is the WhatsApp CTA, not a category

// How much scroll (in px) each card "step" takes. Bigger = slower, more
// deliberate transitions instead of the cards snapping past in a blur.
const SCROLL_PER_CARD = 260

export function Transport() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Which category is expanded into the near-fullscreen reader (null = closed)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null)
  const overlayCardRef = useRef<HTMLDivElement>(null)
  const overlayContentRef = useRef<HTMLDivElement>(null)

  // --- Deck: pinned scroll, top card slides away to the right each step ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

      // Resting "stacked" look — a few mm of peek behind whichever card is
      // currently on top.
      cards.forEach((card, i) => {
        const depth = Math.min(i, 3)
        gsap.set(card, {
          y: depth * 7,
          scale: 1 - depth * 0.02,
          rotate: i % 2 === 0 ? -1.5 : 1.5,
          zIndex: cards.length - i,
        })
      })

      // Pin the title together with the deck so both stay put on screen —
      // only the cards move as the user scrolls.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=' + N * SCROLL_PER_CARD,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(N, Math.floor(self.progress * (N + 0.001)))
            setActiveIndex((prev) => (prev !== idx ? idx : prev))
          },
        },
      })

      for (let i = 0; i < N; i++) {
        const card = cardRefs.current[i]
        if (!card) continue

        // The top card slides out and fades away completely — it must
        // leave the visible screen, not just peek off the deck's edge.
        tl.to(card, { x: '160%', rotate: 8, opacity: 0, duration: 0.8, ease: 'power1.inOut' }, i)

        // The rest of the stack settles up by one depth level in the same
        // beat, so it never "jumps" — it reads as the deck getting shorter.
        for (let j = i + 1; j < cards.length; j++) {
          const behind = cardRefs.current[j]
          if (!behind) continue
          const newDepth = Math.min(j - (i + 1), 3)
          tl.to(
            behind,
            { y: newDepth * 7, scale: 1 - newDepth * 0.02, duration: 0.8, ease: 'power1.inOut' },
            i
          )
        }
      }

      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // --- Expand / collapse the active category into the near-fullscreen reader ---
  function openCategory(i: number) {
    const card = cardRefs.current[i]
    if (!card) return
    setSourceRect(card.getBoundingClientRect())
    setOpenIndex(i)
  }

  function closeReader() {
    const card = cardRefs.current[openIndex ?? activeIndex]
    const rect = card?.getBoundingClientRect() ?? sourceRect
    if (overlayCardRef.current && rect) {
      gsap.to(overlayCardRef.current, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 16,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          setOpenIndex(null)
          setSourceRect(null)
        },
      })
      gsap.to(overlayContentRef.current, { opacity: 0, duration: 0.2 })
      gsap.to('[data-reader-backdrop]', { opacity: 0, duration: 0.4 })
    } else {
      setOpenIndex(null)
      setSourceRect(null)
    }
  }

  useEffect(() => {
    if (openIndex === null || !sourceRect || !overlayCardRef.current) return
    document.body.style.overflow = 'hidden'

    const el = overlayCardRef.current
    gsap.set(el, {
      position: 'fixed',
      top: sourceRect.top,
      left: sourceRect.left,
      width: sourceRect.width,
      height: sourceRect.height,
      borderRadius: 16,
      zIndex: 60,
    })
    gsap.set('[data-reader-backdrop]', { opacity: 0 })
    gsap.set(overlayContentRef.current, { opacity: 0 })

    const margin = window.innerWidth < 640 ? 10 : 32
    gsap.to('[data-reader-backdrop]', { opacity: 1, duration: 0.35 })
    gsap.to(el, {
      top: margin,
      left: margin,
      width: window.innerWidth - margin * 2,
      height: window.innerHeight - margin * 2,
      borderRadius: 24,
      duration: 0.55,
      ease: 'power3.out',
      onComplete: () => {
        gsap.to(overlayContentRef.current, { opacity: 1, duration: 0.35 })
      },
    })

    return () => {
      document.body.style.overflow = ''
    }
  }, [openIndex, sourceRect])

  function changeCategory(dir: 1 | -1) {
    if (openIndex === null) return
    const next = (openIndex + dir + N) % N
    gsap.to(overlayContentRef.current, {
      opacity: 0,
      x: dir * -16,
      duration: 0.18,
      onComplete: () => {
        setOpenIndex(next)
        gsap.fromTo(
          overlayContentRef.current,
          { opacity: 0, x: dir * 16 },
          { opacity: 1, x: 0, duration: 0.25 }
        )
      },
    })
  }

  const item = openIndex !== null ? TRANSPORT_ITEMS[openIndex] : null

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="scroll-mt-24 overflow-hidden bg-background"
    >
      <div ref={pinRef} className="mx-auto flex min-h-[85svh] w-full max-w-6xl items-center px-6 pt-20 lg:px-8">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="Qué transportamos"
            title="Equipos pesados y cargas especiales, en manos expertas."
            description="Cada tipo de maquinaria requiere una logística propia. Tocá una tarjeta (o seguí bajando) para ver el detalle de cada categoría."
          />

          {/* The deck */}
          <div
            ref={stageRef}
            className="relative mx-auto aspect-[3/2] w-full max-w-md lg:max-w-xl"
          >
            {TRANSPORT_ITEMS.map((cat, i) => (
              <div
                key={cat.slug}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                onClick={() => activeIndex === i && openCategory(i)}
                className="absolute inset-0 flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-lg"
              >
                <div className="relative flex-1 overflow-hidden bg-neutral-900">
                  {cat.image ? (
                    <Image
                      src={cat.image || '/placeholder.svg'}
                      alt={`Transporte de ${cat.title.toLowerCase()}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 90vw, 576px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0" aria-hidden="true">
                      <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(135deg,white_0,white_1px,transparent_1px,transparent_11px)]" />
                      <Truck className="absolute right-4 top-4 size-8 text-white/15" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {cat.title}
                  </h3>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </div>
              </div>
            ))}

            {/* Final card: WhatsApp CTA — links out directly, doesn't expand */}
            <a
              ref={(el) => {
                cardRefs.current[CTA_INDEX] = el as unknown as HTMLDivElement
              }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-brand p-8 text-center shadow-lg"
            >
              <MessageCircle className="size-10 text-brand-foreground" />
              <div>
                <h3 className="font-display text-lg font-semibold text-brand-foreground">
                  ¿Tenés otra máquina para trasladar?
                </h3>
                <p className="mt-1 text-sm text-brand-foreground/85">
                  Contanos por WhatsApp y te cotizamos al toque.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Near-fullscreen category reader */}
      {openIndex !== null && item && (
        <>
          <div
            data-reader-backdrop
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeReader}
          />
          <div
            ref={overlayCardRef}
            className="fixed z-[60] flex flex-col overflow-hidden bg-background shadow-2xl"
          >
            <div ref={overlayContentRef} className="flex h-full flex-col overflow-y-auto">
              <div className="relative aspect-[16/9] w-full shrink-0 sm:aspect-auto sm:h-48 lg:h-56">
                {item.image ? (
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={`Transporte de ${item.title.toLowerCase()}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                <button
                  type="button"
                  onClick={closeReader}
                  aria-label="Volver"
                  className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-transform hover:scale-105"
                >
                  <X className="size-5" />
                </button>

                <button
                  type="button"
                  onClick={() => changeCategory(-1)}
                  aria-label="Categoría anterior"
                  className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-transform hover:scale-105"
                >
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => changeCategory(1)}
                  aria-label="Siguiente categoría"
                  className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-transform hover:scale-105"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>

              <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-6 py-8 sm:px-10">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Qué transportamos · {openIndex + 1} / {N}
                </p>
                <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                  {item.title}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">{item.about}</p>

                <p className="text-base leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Traslado:</span> {item.transfer}
                </p>

                <div className="flex flex-wrap items-center gap-2.5">
                  {item.transferIcons.map(({ icon, tooltip }, iconIndex) => {
                    const SpecIcon = ICONS[icon]
                    return (
                      <IconTooltip
                        key={iconIndex}
                        label={tooltip}
                        className={`size-9 ${ICON_CATEGORY_STYLES[ICON_CATEGORY[icon]]}`}
                      >
                        <SpecIcon className="size-4.5" strokeWidth={1.7} />
                      </IconTooltip>
                    )
                  })}
                </div>

                <a
                  href={`${WHATSAPP_URL}%20-%20${encodeURIComponent(item.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="size-4" />
                  Consultar por {item.title.toLowerCase()}
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
