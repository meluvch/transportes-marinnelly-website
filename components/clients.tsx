'use client'

import Image from 'next/image'
import { CLIENTS } from '@/lib/site'
import { Reveal } from '@/components/reveal'

export function Clients() {
  const track = [...CLIENTS, ...CLIENTS]

  return (
    <section className="relative rounded-t-[1.75rem] border-b border-border/60 bg-background py-16 shadow-[0_-30px_60px_-24px_rgba(0,0,0,0.35)] sm:rounded-t-[2.5rem] sm:py-20">
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
        <ul className="flex w-max animate-[marquee_45s_linear_infinite] items-center gap-4 group-hover:[animation-play-state:paused] sm:gap-5">
          {track.map((client, i) => (
            <li
              key={`${client.name}-${i}`}
              className="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-neutral-50 p-4 transition-colors duration-300 hover:border-brand/40 hover:bg-neutral-100 sm:h-24 sm:w-44"
            >
              <Image
                src={client.src || '/placeholder.svg'}
                alt={client.name}
                width={200}
                height={80}
                className="h-full w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
