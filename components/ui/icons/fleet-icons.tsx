import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Plancha hidráulica autodeslizante — very low deck, tilts down at the rear to load. */
export function PlanchaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* low deck sloping down at the rear (hydraulic tilt), cab at the front */}
      <path d="M1.2 17.3 L3 15.3 L16.5 15.3 L16.5 12.8 L20 12.8 L22.5 15.6 L22.5 17.3" />
      <line x1="17.6" y1="12.8" x2="17.6" y2="15.3" />
      <line x1="1.2" y1="17.3" x2="22.5" y2="17.3" />
      {/* wheels */}
      <circle cx="5.5" cy="18.7" r="1.4" />
      <circle cx="19.5" cy="18.7" r="1.4" />
    </svg>
  )
}

/** Carretón de 15 metros — long low-bed with two axle clusters. */
export function Carreton15Icon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M1.5 17 L1.5 14.5 L17 14.5 L17 12.5 L20 12.5 L22.5 15.3 L22.5 17" />
      <path d="M17.6 12.5 L17.6 14.5" />
      <line x1="1.5" y1="17" x2="22.5" y2="17" />
      {/* front axle cluster */}
      <circle cx="4.2" cy="18.7" r="1.4" />
      <circle cx="7.4" cy="18.7" r="1.4" />
      {/* rear axle cluster near cab */}
      <circle cx="16.6" cy="18.7" r="1.4" />
      <circle cx="19.8" cy="18.7" r="1.4" />
    </svg>
  )
}

/** Carretón cuello desmontable — gooseneck dip right behind the cab. */
export function CarretonCuelloIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* gooseneck: dips down from the cab, then flat bed */}
      <path d="M1.5 17 L1.5 15 L11 15 L13.2 11.5 L15.7 11.5 L15.7 15 L17 15 L17 12.7 L20 12.7 L22.5 15.4 L22.5 17" />
      <line x1="1.5" y1="17" x2="22.5" y2="17" />
      <circle cx="4.2" cy="18.7" r="1.4" />
      <circle cx="7.4" cy="18.7" r="1.4" />
      <circle cx="16.4" cy="18.7" r="1.4" />
      <circle cx="19.7" cy="18.7" r="1.4" />
    </svg>
  )
}

/** Camión playo balancín — flatbed with an overhanging long load and a rocking
 *  rear bogie (the "balancín"). */
export function PlayoBalancinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* long cargo overhanging the deck, dashed to suggest it extends past the truck */}
      <path d="M0.75 11.5 L20 11.5" strokeDasharray="2.5 2" />
      {/* flatbed + cab */}
      <path d="M3 17 L3 13.3 L17 13.3 L17 10.5 L20 10.5 L22.5 13.4 L22.5 17" />
      <line x1="3" y1="17" x2="22.5" y2="17" />
      {/* front wheel */}
      <circle cx="5.5" cy="18.7" r="1.4" />
      {/* rocking rear bogie: two wheels joined by a pivoting beam */}
      <line x1="15.4" y1="18.7" x2="19.6" y2="18.7" />
      <circle cx="15.4" cy="18.7" r="1.4" />
      <circle cx="19.6" cy="18.7" r="1.4" />
      <circle cx="17.5" cy="17.6" r="0.6" fill="currentColor" />
    </svg>
  )
}

/** Portacontenedor — chassis carrying a ribbed shipping container. */
export function PortacontenedorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* container box with ribbing */}
      <rect x="3" y="7.5" width="14" height="6.3" rx="0.6" />
      <line x1="6.3" y1="7.5" x2="6.3" y2="13.8" />
      <line x1="9.7" y1="7.5" x2="9.7" y2="13.8" />
      <line x1="13.1" y1="7.5" x2="13.1" y2="13.8" />
      {/* chassis + cab */}
      <path d="M1.5 17 L1.5 14.7 L17 14.7 L17 12.7 L20 12.7 L22.5 15.4 L22.5 17" />
      <line x1="1.5" y1="17" x2="22.5" y2="17" />
      <circle cx="4.2" cy="18.7" r="1.4" />
      <circle cx="7.4" cy="18.7" r="1.4" />
      <circle cx="19.5" cy="18.7" r="1.4" />
    </svg>
  )
}
