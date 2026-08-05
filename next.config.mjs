/** @type {import('next').NextConfig} */
const nextConfig = {
  // Real type errors should fail the build — tsc passes clean, so this was
  // only ever masking future regressions, not working around a known issue.
  images: {
    // RECOMMENDATION: this site is deployed on Vercel, which supports Next's
    // Image Optimization natively at no extra setup. Turning it on (drop
    // this block) would give automatic AVIF/WebP conversion and
    // per-breakpoint resizing for every <Image>, which is a real Core Web
    // Vitals (LCP) win on image-heavy sections like Transport/Fleet/Impact.
    // It's left off here because `unoptimized: true` was set to keep the
    // option of moving to a static host (Cloudflare Pages/GitHub Pages/
    // Netlify) open, none of which run the optimizer — that's a hosting
    // decision, not a bug, so not flipping it without sign-off.
    unoptimized: true,
  },
  // Baseline security headers recommended for any public site. Note: these
  // only take effect on a server deploy (current Vercel setup) — if the
  // static-export option noted above is ever taken, `headers()` stops being
  // applied and the equivalent config would need to move to the static
  // host's own headers mechanism (e.g. Vercel/Netlify `headers` in config,
  // or a `_headers` file).
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
