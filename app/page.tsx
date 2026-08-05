import { Loader } from '@/components/loader'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Clients } from '@/components/clients'
import { Transport } from '@/components/transport'
import { Impact } from '@/components/impact'
import { Commitment } from '@/components/commitment'
import { Fleet } from '@/components/fleet'
import { Coverage } from '@/components/coverage'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export default function Page() {
  return (
    <>
      <Loader />
      <SiteHeader />
      <main>
        <Hero />
        <Clients />
        <Transport />
        <Coverage />
        <Contact />
        <Commitment />
        <Fleet />
        <Impact />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  )
}
