'use client'

import { useState, type FormEvent } from 'react'
import { MessageCircle, Mail, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { EMAIL, EMAIL_HREF, WHATSAPP_URL } from '@/lib/site'

export function Contact() {
  const [pending, setPending] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const form = new FormData(e.currentTarget)
    const get = (k: string) => (form.get(k) as string) || '-'
    const message = [
      'Hola Guido! Quiero cotizar un traslado.',
      '',
      `Nombre: ${get('nombre')}`,
      `Teléfono: ${get('telefono')}`,
      `Detalle: ${get('mensaje')}`,
    ].join('\n')
    const url = `https://wa.me/5491163640392?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setPending(false)
  }

  return (
    <section id="contacto" className="scroll-mt-24 bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div className="flex min-w-0 flex-col gap-8">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
                ¿Necesitás mover una maquinaria?
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Contanos tu proyecto. Coordinamos el traslado de principio a fin y
                te respondemos con una cotización clara, en general en menos de
                una hora hábil.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  WhatsApp
                </a>
                <a
                  href={EMAIL_HREF}
                  className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-neutral-50 sm:w-auto"
                >
                  <Mail className="size-4 shrink-0" />
                  <span className="truncate">{EMAIL}</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — short form: WhatsApp above is the main CTA, this is a
              quick alternative for people who'd rather type than chat. */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Nombre<span className="text-brand"> *</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className="w-full border-0 border-b border-border bg-transparent pb-2 text-foreground outline-none transition-colors focus:border-brand"
                />
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Teléfono<span className="text-brand"> *</span>
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  className="w-full border-0 border-b border-border bg-transparent pb-2 text-foreground outline-none transition-colors focus:border-brand"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="mensaje"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Contanos tu traslado
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={3}
                  placeholder="Origen, destino y tipo de maquinaria a trasladar"
                  className="w-full resize-none border-0 border-b border-border bg-transparent pb-2 text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-brand"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
                >
                  Enviar solicitud
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
