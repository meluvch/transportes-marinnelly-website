import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt =
  'Transporte y Logística Marinelly — Transporte de maquinaria pesada y cargas especiales en toda Argentina'

// Reuses the real logo (white background + orange wordmark, exactly how it
// appears in the header/footer) instead of inventing new social-card
// artwork — so link previews on WhatsApp/LinkedIn/etc. actually look like
// the site instead of showing nothing (there was no og:image at all before).
export default async function OpengraphImage() {
  const logoData = readFileSync(join(process.cwd(), 'public', 'logo-marinelly.png'))
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          position: 'relative',
        }}
      >
        <img src={logoSrc} width={620} height={205} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 32,
            color: '#57534e',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          Transporte de maquinaria pesada y cargas especiales
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 32,
            color: '#57534e',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          en toda Argentina
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 18,
            background: '#FF6B01',
          }}
        />
      </div>
    ),
    size
  )
}
