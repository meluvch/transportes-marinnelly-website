import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// The real logo (public/logo-marinelly.png) is a wordmark only — no
// standalone mark exists for a favicon. Generated at build time instead of
// shipping a raster asset, using the same brand orange (#FF6B01) and an
// italic weight that echoes the wordmark's lettering.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FF6B01',
          borderRadius: 7,
        }}
      >
        <span
          style={{
            color: '#fff',
            fontSize: 22,
            fontWeight: 700,
            fontStyle: 'italic',
            fontFamily: 'sans-serif',
          }}
        >
          M
        </span>
      </div>
    ),
    size
  )
}
