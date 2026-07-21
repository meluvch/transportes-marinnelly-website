'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { WHATSAPP_URL } from '@/lib/site'
import { STATIC_MAP_BODY } from '@/components/coverage-map-static'
import { MAP_PATHS } from '@/components/coverage-map-paths'

const ARC_BBOX = {
  mendoza: { minX: 244, maxX: 354, minY: 114, maxY: 176 },
  cordoba: { minX: 254, maxX: 354, minY: 94, maxY: 131 },
  neuquen: { minX: 285, maxX: 354, minY: 117, maxY: 212 },
  corrientes: { minX: 286, maxX: 354, minY: 68, maxY: 122 },
} as const

type DestKey = keyof typeof ARC_BBOX

const ORDER: DestKey[] = ['mendoza', 'cordoba', 'neuquen', 'corrientes']

// Quilmes marker center + the radius a circular reveal needs to cover every
// "other provinces" gray route (the farthest dot sits ~242 units away).
const QUILMES_CX = 350
const QUILMES_CY = 121
const OTHER_ROUTES_MAX_R = 250

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
  const otherRoutesClipCircleRef = useRef<SVGCircleElement>(null)
  const otherRoutesShimmerRef = useRef<SVGGradientElement>(null)
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
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      // 2. Background grid flicker (own overlay — see chat note)
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

      // 4. Quilmes point: breathing scale + expanding ring.
      // transformBox:'fill-box' (set via inline style below) is what keeps
      // this centered on the dot itself instead of the SVG's own (0,0) —
      // without it the scale was pivoting from the top-left of the whole
      // viewBox, which is why it looked like it was "flying" off to the side.
      gsap.to(quilmesDotRef.current, {
        scale: 1.05,
        transformOrigin: '50% 50%',
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.fromTo(
        quilmesRingRef.current,
        { scale: 1, opacity: 0.55, transformOrigin: '50% 50%' },
        {
          scale: 2.4,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: 'power2.out',
          transformOrigin: '50% 50%',
        }
      )

      // 3 + 5 + 6. Main routes draw in from Quilmes, staggered "a few at a
      // time"; each label fades in right as its line finishes.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: mapWrapRef.current, start: 'top 55%' },
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
          { attr: { x: box.minX, width: box.maxX - box.minX + 6 }, duration: 0.9, ease: 'power2.inOut' },
          i === 0 ? '+=0.15' : '-=0.55'
        ).fromTo(label, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '>-0.05')
      })

      // Gray routes to the rest of the country: reveal as a ring expanding
      // outward from Quilmes (they radiate in every direction, so a
      // circular wipe reads as "drawn outward" better than a straight one).
      tl.fromTo(
        otherRoutesClipCircleRef.current,
        { attr: { r: 0 } },
        { attr: { r: OTHER_ROUTES_MAX_R }, duration: 1.3, ease: 'power2.inOut' },
        '-=0.3'
      )

      // Continuous subtle shimmer on every route, once drawn in
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
      gsap.to(otherRoutesShimmerRef.current, {
        attr: { x1: '120%', x2: '160%' },
        duration: 4,
        repeat: -1,
        ease: 'none',
      })

      // 9. Legend dot next to "Cobertura: Nacional" keeps blinking
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.5fr] lg:gap-12">
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

          {/* Map — single responsive SVG, no raster image. Given ~2x more
              column width now (lg:grid-cols-[0.8fr_1.5fr]) plus a wider
              section container (max-w-7xl) so it actually has room to grow. */}
          <div ref={mapWrapRef} className="mx-auto w-full max-w-[560px] lg:max-w-none">
            <svg
              viewBox="0 0 560 368"
              className="block h-auto w-full overflow-visible"
              role="img"
              aria-label="Mapa de cobertura nacional: base en Quilmes, con rutas frecuentes hacia Córdoba, Mendoza, Neuquén y Corrientes, y cobertura en el resto del país."
            >
              <g dangerouslySetInnerHTML={{ __html: STATIC_MAP_BODY }} />

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
                <linearGradient
                  id="shimmer-other"
                  ref={otherRoutesShimmerRef as never}
                  x1="-40%"
                  y1="0"
                  x2="0%"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#969696" stopOpacity="0" />
                  <stop offset="50%" stopColor="#D8D8D8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#969696" stopOpacity="0" />
                </linearGradient>

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
                <clipPath id="clip-other-routes">
                  <circle ref={otherRoutesClipCircleRef} cx={QUILMES_CX} cy={QUILMES_CY} r={0} />
                </clipPath>
              </defs>

              {/* Gray routes to the rest of the country */}
              <g clipPath="url(#clip-other-routes)">
                <path d={MAP_PATHS.other_routes} fill="#767676" />
                <path d={MAP_PATHS.other_routes} fill="url(#shimmer-other)" />
              </g>

              {/* Main orange routes, each clipped to reveal from Quilmes outward */}
              {ORDER.map((key) => (
                <g key={key} clipPath={`url(#clip-${key})`}>
                  <path d={MAP_PATHS[`arc_${key}`]} fill="#FF6B01" />
                  <path d={MAP_PATHS[`arc_${key}`]} fill={`url(#shimmer-${key})`} />
                </g>
              ))}

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

              <path d={MAP_PATHS.text_base_quilmes} fill="#FF6B01" />
              <path
                ref={quilmesRingRef}
                d={MAP_PATHS.quilmes_ring}
                fill="#FF6B01"
                style={{ transformBox: 'fill-box' }}
              />
              <path
                ref={quilmesDotRef}
                d={MAP_PATHS.quilmes_dot}
                fill="#FF6B01"
                style={{ transformBox: 'fill-box' }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
