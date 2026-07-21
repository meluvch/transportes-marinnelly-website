'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { WHATSAPP_URL } from '@/lib/site'
import { STATIC_MAP_BODY } from '@/components/coverage-map-static'
import { MAP_PATHS } from '@/components/coverage-map-paths'

// Bounding boxes (in the SVG's own 560x368 coordinate space) for each route
// arc, used to drive the clip-path "draw in from Quilmes" reveal. Quilmes
// sits at the high-x edge for every route, so revealing each clip rect from
// x≈352 (Quilmes) leftward toward the destination reads as "drawn from
// Quilmes outward" for all four at once, without needing true stroke-dasharray
// (these arcs are filled dash shapes exported from Figma, not real strokes).
const ARC_BBOX = {
  mendoza: { minX: 244, maxX: 354, minY: 114, maxY: 176 },
  cordoba: { minX: 254, maxX: 354, minY: 94, maxY: 131 },
  neuquen: { minX: 285, maxX: 354, minY: 117, maxY: 212 },
  corrientes: { minX: 286, maxX: 354, minY: 68, maxY: 122 },
} as const

type DestKey = keyof typeof ARC_BBOX

// Order + light stagger the routes draw in — "de a varias" rather than
// strictly one-by-one, per the requested sequence.
const ORDER: DestKey[] = ['mendoza', 'cordoba', 'neuquen', 'corrientes']

export function Coverage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mapWrapRef = useRef<HTMLDivElement>(null)
  const legendDotRef = useRef<HTMLSpanElement>(null)

  const clipRectRefs = useRef<Record<DestKey, SVGRectElement | null>>({
    mendoza: null,
    cordoba: null,
    neuquen: null,
    corrientes: null,
  })
  const labelRefs = useRef<Record<DestKey, SVGPathElement | null>>({
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
  const quilmesDotRef = useRef<SVGPathElement>(null)
  const quilmesRingRef = useRef<SVGPathElement>(null)
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
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      // 2. Background grid: always faintly visible, individual squares
      // drift opacity randomly and asynchronously (own overlay grid — the
      // grid in the source Figma file is fused into the same flattened
      // shape as the 3D map body, so it can't be isolated on its own; see
      // note in chat).
      gridSquareRefs.current.forEach((el) => {
        if (!el) return
        gsap.to(el, {
          opacity: gsap.utils.random(0.15, 0.55),
          duration: gsap.utils.random(2, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 3),
        })
      })

      // 4. Quilmes point: soft glow + gentle breathing scale (1 → 1.05)
      gsap.to(quilmesDotRef.current, {
        scale: 1.05,
        transformOrigin: '347px 121px',
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.fromTo(
        quilmesRingRef.current,
        { scale: 1, opacity: 0.55, transformOrigin: '347px 121px' },
        {
          scale: 2.4,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: 'power2.out',
          transformOrigin: '347px 121px',
        }
      )

      // 3 + 5 + 6. Routes draw in from Quilmes (scroll-triggered, small
      // delay, staggered "in a few at a time"), each label fades in right
      // as its line finishes; lines stay visible and keep a slow subtle
      // shimmer afterwards to suggest constant movement.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mapWrapRef.current,
          start: 'top 55%',
        },
        delay: 0.2,
      })

      ORDER.forEach((key, i) => {
        const box = ARC_BBOX[key]
        const rect = clipRectRefs.current[key]
        const label = labelRefs.current[key]
        if (!rect || !label) return

        tl.fromTo(
          rect,
          { attr: { x: box.maxX, width: 0 } },
          {
            attr: { x: box.minX, width: box.maxX - box.minX + 6 },
            duration: 0.9,
            ease: 'power2.inOut',
          },
          i === 0 ? '+=0.15' : '-=0.55' // several draw in together, lightly staggered
        ).fromTo(
          label,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '>-0.05'
        )
      })

      // Subtle continuous "dashes drifting" shimmer per route, starting
      // once each route has drawn in.
      ORDER.forEach((key) => {
        const grad = shimmerRefs.current[key]
        if (!grad) return
        gsap.to(grad, {
          attr: { x1: '120%', x2: '160%' },
          duration: 3.2,
          repeat: -1,
          ease: 'none',
          delay: gsap.utils.random(0, 1),
        })
      })

      // 9. Keep the small legend dot (next to "Cobertura: Nacional")
      // blinking, echoing the big orange Quilmes marker with its own ring.
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
      className="scroll-mt-24 overflow-hidden bg-neutral-50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Cobertura"
              title="Operamos en todo el país."
              description="Llegamos a cualquier punto de Argentina. Zona de Quilmes, Buenos Aires es nuestra base operativa, pero tu proyecto puede estar donde sea."
            />

            <div className="flex flex-col gap-4">
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

          {/* Map — single responsive SVG, no raster image */}
          <div ref={mapWrapRef} className="mx-auto w-full max-w-[560px] lg:max-w-[1100px]">
            <svg
              viewBox="0 0 560 368"
              className="block h-auto w-full overflow-visible"
              role="img"
              aria-label="Mapa de cobertura nacional: base en Quilmes, con rutas frecuentes hacia Córdoba, Mendoza, Neuquén y Corrientes."
            >
              {/* Static illustration from Figma: grid glow, 3D map block, borders */}
              <g dangerouslySetInnerHTML={{ __html: STATIC_MAP_BODY }} />

              {/* Supplementary flicker grid overlay (see chat note) */}
              <g opacity={0.5}>
                {Array.from({ length: 8 }).map((_, row) =>
                  Array.from({ length: 12 }).map((__, col) => (
                    <rect
                      key={`${row}-${col}`}
                      ref={(el) => {
                        gridSquareRefs.current[row * 12 + col] = el
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
                    x1="-40%"
                    y1="0"
                    x2="0%"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#FF6B01" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFC28A" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FF6B01" stopOpacity="0" />
                  </linearGradient>
                ))}
                {ORDER.map((key) => {
                  const box = ARC_BBOX[key]
                  return (
                    <clipPath key={key} id={`clip-${key}`}>
                      <rect
                        ref={(el) => {
                          clipRectRefs.current[key] = el
                        }}
                        x={box.maxX}
                        y={box.minY - 4}
                        width={0}
                        height={box.maxY - box.minY + 8}
                      />
                    </clipPath>
                  )
                })}
              </defs>

              {/* Route arcs, each clipped to reveal from Quilmes outward */}
              {ORDER.map((key) => (
                <g key={key} clipPath={`url(#clip-${key})`}>
                  <path d={MAP_PATHS[`arc_${key}`]} fill="#FF6B01" />
                  <path d={MAP_PATHS[`arc_${key}`]} fill={`url(#shimmer-${key})`} />
                </g>
              ))}

              {/* Destination labels — fade in right as their route finishes */}
              {ORDER.map((key) => (
                <path
                  key={key}
                  ref={(el) => {
                    labelRefs.current[key] = el
                  }}
                  d={MAP_PATHS[`text_${key}`]}
                  fill="#FF6B01"
                  opacity={0}
                />
              ))}

              {/* Quilmes marker: base label, breathing dot, expanding ring */}
              <path d={MAP_PATHS.text_base_quilmes} fill="#FF6B01" />
              <path ref={quilmesRingRef} d={MAP_PATHS.quilmes_ring} fill="#FF6B01" />
              <path ref={quilmesDotRef} d={MAP_PATHS.quilmes_dot} fill="#FF6B01" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
