import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Same treatment as app/icon.tsx, scaled up for iOS home-screen use (which
// needs a solid background — no transparency).
export default function AppleIcon() {
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
        }}
      >
        <span
          style={{
            color: '#fff',
            fontSize: 108,
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
