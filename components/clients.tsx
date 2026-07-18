'use client'

import Image from 'next/image'
import { CLIENTS } from '@/lib/site'
import { Reveal } from '@/components/reveal'

export function Clients() {
  const track = [...CLIENTS, ...CLIENTS]

  return (
    <section className="border-b border-border/60 bg-background py-16 sm:py-20">
      <Reveal className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Con la confianza de empresas como
        </p>
      </Reveal>

      <div
        className="group relative mt-12 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <ul className="flex w-max animate-[marquee_45s_linear_infinite] items-center gap-16 group-hover:[animation-play-state:paused] sm:gap-24">
          {track.map((client, i) => (
            <li key={`${client.name}-${i}`} className="flex shrink-0 items-center">
              <Image
                src={client.src || '/placeholder.svg'}
                alt={client.name}
                width={200}
                height={80}
                className="h-9 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-11"
              />
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
