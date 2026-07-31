'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { WHATSAPP_URL } from '@/lib/site'
import { STATIC_MAP_BODY } from '@/components/coverage-map-static'
import { MAP_PATHS, MAP_RECTS } from '@/components/coverage-map-paths'

type DestKey = 'mendoza' | 'cordoba' | 'neuquen' | 'corrientes'

const ORDER: DestKey[] = ['mendoza', 'cordoba', 'neuquen', 'corrientes']

const GRID_ROWS = 8
const GRID_COLS = 12

export function Coverage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mapWrapRef = useRef<HTMLDivElement>(null)
  const legendDotRef = useRef<HTMLSpanElement>(null)

  const routeGroupRefs = useRef<Record<DestKey, SVGGElement | null>>({
    mendoza: null,
    cordoba: null,
    neuquen: null,
    corrientes: null,
  })
  const shimmerRefs = useRef<Record<DestKey, SVGGradientElement | null>>({
    mendoza: null,
    cordoba: null,
    neuquen: null,
    corrientes: null,
  })
  const gridSquareRefs = useRef<(SVGRectElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // 1. Map appears: fade + translateY, ~1s, power3.out
      gsap.from(mapWrapRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      // 2. Short pinned "camera push-in", tuned very differently per layout:
      //
      // Desktop: text and map sit side by side, so the section is never
      // much taller than the viewport. The pin triggers off the map's own
      // position (not the section's) so it engages exactly when the map is
      // in frame, then it simply scales up in place.
      //
      // Mobile: text stacks above the map, and the whole section is taller
      // than one screen — so this is a different composition, not just a
      // smaller version of the desktop one. The pin engages the moment the
      // section itself enters (title + description visible immediately,
      // per the brief), and the map is pulled up (negative y) at the same
      // time it scales, tucking its top edge under the text/button so the
      // *entire* scene — heading, copy and map together — fits in one
      // viewport for the whole animation instead of the map trailing off
      // below the fold. The Quilmes marker isn't touched here: it has no
      // animation of its own (see the render below), so it rides along
      // rigidly with the rest of the map instead of drifting independently.
      const mm = gsap.matchMedia()
      mm.add(
        { isDesktop: '(min-width: 1024px)', isMobile: '(max-width: 1023px)' },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean }
          if (isDesktop) {
            gsap.fromTo(
              mapWrapRef.current,
              { scale: 1 },
              {
                scale: 1.35,
                ease: 'none',
                scrollTrigger: {
                  trigger: mapWrapRef.current,
                  pin: sectionRef.current,
                  start: 'top top+=88',
                  end: '+=320',
                  scrub: 0.4,
                  anticipatePin: 1,
                },
              }
            )
          } else {
            const mobilePinConfig = {
              trigger: sectionRef.current,
              start: 'top top+=64',
              end: '+=360',
            }
            // The upward tuck is set instantly the moment the pin engages
            // (onEnter/onEnterBack), not scrubbed with scroll — the map
            // needs to already be in its compact, fully-on-screen position
            // from the very first pinned frame, otherwise it's still
            // sitting at its natural (untucked) height for part of the
            // scroll and gets clipped by the viewport before a gradual tuck
            // would catch up. The zoom itself is the only thing that
            // scrubs smoothly across the pin's scroll range.
            ScrollTrigger.create({
              ...mobilePinConfig,
              pin: true,
              anticipatePin: 1,
              onEnter: () => gsap.set(mapWrapRef.current, { y: -130 }),
              onEnterBack: () => gsap.set(mapWrapRef.current, { y: -130 }),
              onLeaveBack: () => gsap.set(mapWrapRef.current, { y: 0 }),
            })
            gsap.fromTo(
              mapWrapRef.current,
              { scale: 1 },
              {
                scale: 1.35,
                ease: 'none',
                scrollTrigger: { ...mobilePinConfig, scrub: 0.4 },
              }
            )
          }
        }
      )

      // 3. Background grid: a single scroll-free driver computes every
      // square's opacity each frame from its distance + angle to the grid's
      // center, producing one coordinated wave that breathes outward and
      // back (with a light swirl from the angle term) instead of each
      // square flickering independently. One ticking tween instead of ~96
      // separate ones — cheaper, and reads as a single coherent effect.
      const squares = gridSquareRefs.current.filter(
        (el): el is SVGRectElement => el !== null
      )
      const centerRow = (GRID_ROWS - 1) / 2
      const centerCol = (GRID_COLS - 1) / 2
      const gridMeta = squares.map((el, i) => {
        const row = Math.floor(i / GRID_COLS)
        const col = i % GRID_COLS
        const dx = col - centerCol
        const dy = row - centerRow
        return {
          el,
          dist: Math.sqrt(dx * dx + dy * dy),
          angle: Math.atan2(dy, dx),
        }
      })
      const maxDist = Math.max(1, ...gridMeta.map((m) => m.dist))
      const gridDriver = { t: 0 }
      gsap.to(gridDriver, {
        t: Math.PI * 2,
        duration: 9,
        repeat: -1,
        ease: 'none',
        onUpdate: () => {
          for (const m of gridMeta) {
            const phase = (m.dist / maxDist) * Math.PI * 2.2 + m.angle * 0.6
            const wave = (Math.sin(gridDriver.t - phase) + 1) / 2
            m.el.style.opacity = (0.15 + wave * 0.35).toFixed(3)
          }
        },
      })

      // 4. Routes: a soft stagger entrance (fade + tiny scale-up) as the map
      // scrolls into view, then a perpetual "traffic flowing" shimmer on
      // top of the always-visible solid line — it never disappears or
      // blinks, it just gets a moving highlight, like a route in motion.
      // Each route's shimmer starts on a randomized delay so they don't all
      // pulse in lockstep.
      ORDER.forEach((key, i) => {
        const group = routeGroupRefs.current[key]
        if (!group) return
        gsap.from(group, {
          opacity: 0,
          scale: 0.94,
          transformOrigin: '50% 50%',
          duration: 0.7,
          ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: mapWrapRef.current, start: 'top 55%' },
        })
      })

      ORDER.forEach((key) => {
        const grad = shimmerRefs.current[key]
        if (!grad) return
        gsap.fromTo(
          grad,
          { attr: { x1: '-60%', x2: '-20%' } },
          {
            attr: { x1: '140%', x2: '180%' },
            duration: gsap.utils.random(2.2, 2.9),
            repeat: -1,
            ease: 'none',
            delay: gsap.utils.random(0, 1.8),
          }
        )
      })

      // Legend dot next to "Cobertura: Nacional" keeps blinking
      gsap.to(legendDotRef.current, {
        opacity: 0.4,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="cobertura"
      ref={sectionRef}
      className="scroll-mt-24 overflow-hidden bg-neutral-50 py-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.5fr] lg:gap-12">
          <div className="relative z-10 flex flex-col gap-5 lg:gap-8">
            <SectionHeading
              eyebrow="Cobertura"
              title="Operamos en todo el país."
              description="Llegamos a cualquier punto de Argentina. Zona de Quilmes, Buenos Aires es nuestra base operativa, pero tu proyecto puede estar donde sea."
            />

            <div className="flex flex-col gap-2 lg:gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <MapPin className="size-4" />
                </span>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Base operativa:</span> Quilmes,
                  Provincia de Buenos Aires
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="relative flex size-8 items-center justify-center rounded-full bg-foreground/5 text-foreground">
                  <span
                    aria-hidden="true"
                    className="absolute inline-flex size-2 animate-ping rounded-full bg-foreground/60"
                  />
                  <span ref={legendDotRef} className="relative size-2 rounded-full bg-foreground" />
                </span>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Cobertura:</span> Nacional, en
                  cualquier provincia
                </p>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Consultanos por traslados especiales
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Map — single responsive SVG, no raster image. */}
          <div
            ref={mapWrapRef}
            className="relative z-0 mx-auto w-full max-w-[280px] will-change-transform sm:max-w-[380px] lg:max-w-none"
          >
            <svg
              viewBox="0 0 560 368"
              className="block h-auto w-full overflow-visible"
              role="img"
              aria-label="Mapa de cobertura nacional: base en Quilmes, con rutas frecuentes hacia Córdoba, Mendoza, Neuquén y Corrientes, y cobertura en el resto del país."
            >
              <g dangerouslySetInnerHTML={{ __html: STATIC_MAP_BODY }} />

              <g opacity={0.5}>
                {Array.from({ length: GRID_ROWS }).map((_, row) =>
                  Array.from({ length: GRID_COLS }).map((__, col) => (
                    <rect
                      key={`${row}-${col}`}
                      ref={(el) => {
                        gridSquareRefs.current[row * GRID_COLS + col] = el
                      }}
                      x={col * 46 - 40}
                      y={230 + row * 18}
                      width={40}
                      height={14}
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth={0.4}
                      opacity={0.25}
                      transform={`skewX(-30) translate(${row * -9}, 0)`}
                    />
                  ))
                )}
              </g>

              <defs>
                {ORDER.map((key) => (
                  <linearGradient
                    key={key}
                    id={`shimmer-${key}`}
                    ref={(el) => {
                      shimmerRefs.current[key] = el as unknown as SVGGradientElement
                    }}
                    x1="-60%"
                    y1="0"
                    x2="-20%"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#FF6B01" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFD6AD" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#FF6B01" stopOpacity="0" />
                  </linearGradient>
                ))}
              </defs>

              {/* Main routes: solid line (always visible) + a moving highlight
                  band on top for the "flowing traffic" feel. */}
              {ORDER.map((key) => (
                <g
                  key={key}
                  ref={(el) => {
                    routeGroupRefs.current[key] = el
                  }}
                  style={{ transformBox: 'fill-box' }}
                >
                  <path d={MAP_PATHS[`arc_${key}`]} fill="#FF6B01" />
                  <path d={MAP_PATHS[`arc_${key}`]} fill={`url(#shimmer-${key})`} />
                  <rect {...MAP_RECTS[`rect_${key}`]} fill="#FF6B01" />
                  <path d={MAP_PATHS[`text_${key}`]} fill="white" />
                </g>
              ))}

              {/* Quilmes marker: static, no animation of its own — it just
                  scales along with the rest of the map during the pinned
                  zoom (see effect #2 above). */}
              <rect {...MAP_RECTS.rect_quilmes} fill="white" stroke="#FF6B01" />
              <path d={MAP_PATHS.text_base_quilmes} fill="#FF6B01" />
              <path d={MAP_PATHS.quilmes_ring} fill="#FF6B01" />
              <path d={MAP_PATHS.quilmes_dot} fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
