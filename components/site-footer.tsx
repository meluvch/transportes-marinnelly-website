import Image from 'next/image'
import { EMAIL, EMAIL_HREF, LOCATION, NAV_LINKS, WHATSAPP_URL } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Image
              src="/logo-marinelly.png"
              alt="Transporte y Logística Marinelly"
              width={170}
              height={44}
              className="h-8 w-auto"
            />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Transporte de maquinaria pesada y cargas especiales en toda
              Argentina.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-10">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Navegación
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Contacto
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={EMAIL_HREF}
                    className="break-all text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Base operativa
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {LOCATION.base}
                <br />
                {LOCATION.region}
                <br />
                {LOCATION.country}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Transporte y Logística Marinelly.
            Todos los derechos reservados.
          </p>
          <p>Cobertura nacional · Argentina</p>
        </div>
      </div>
    </footer>
  )
}
