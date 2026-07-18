export const WHATSAPP_URL =
  'https://wa.me/5491163640392?text=Hola%20Guido!%20Quiero%20cotizar%20un%20traslado'

export const EMAIL = 'contacto@transportesmarinelly.com.ar'
export const EMAIL_HREF = `mailto:${EMAIL}`

export const LOCATION = {
  base: 'Bernal',
  region: 'Provincia de Buenos Aires',
  country: 'Argentina',
}

export const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cobertura', href: '#cobertura' },
  { label: 'Nuestro compromiso', href: '#compromiso' },
] as const

export type TransportItem = {
  slug: string
  title: string
  description: string
  /** Drop a real photo path here (e.g. '/transporte/excavadoras.jpg'). Leave '' to show the branded fallback. */
  image: string
}

export const TRANSPORT_ITEMS: TransportItem[] = [
  {
    slug: 'excavadoras',
    title: 'Excavadoras',
    description: 'Traslado seguro de excavadoras de cadenas y ruedas.',
    image: '',
  },
  {
    slug: 'retroexcavadoras',
    title: 'Retroexcavadoras',
    description: 'Logística precisa para retroexcavadoras y mixtas.',
    image: '',
  },
  {
    slug: 'motoniveladoras',
    title: 'Motoniveladoras',
    description: 'Transporte de motoniveladoras y equipo vial.',
    image: '',
  },
  {
    slug: 'rodillos',
    title: 'Rodillos compactadores',
    description: 'Traslado de rodillos y compactadores de suelo.',
    image: '',
  },
  {
    slug: 'gruas',
    title: 'Grúas',
    description: 'Movimiento de grúas y equipos de izaje.',
    image: '',
  },
  {
    slug: 'autoelevadores',
    title: 'Autoelevadores',
    description: 'Transporte de autoelevadores y equipos de carga.',
    image: '',
  },
  {
    slug: 'maquinaria-agricola',
    title: 'Maquinaria agrícola',
    description: 'Cosechadoras, tractores, sembradoras y pulverizadoras.',
    image: '',
  },
  {
    slug: 'equipos-industriales',
    title: 'Equipos industriales',
    description: 'Maquinaria industrial y equipos de gran porte.',
    image: '',
  },
  {
    slug: 'cargas-especiales',
    title: 'Cargas especiales',
    description: 'Soluciones a medida para cargas fuera de norma.',
    image: '',
  },
]

export const COMMITMENTS = [
  {
    title: 'Conductores especializados',
    text: 'Choferes con experiencia comprobada en transporte de maquinaria pesada.',
  },
  {
    title: 'Seguimiento satelital',
    text: 'Monitoreo en tiempo real durante todo el recorrido.',
  },
  {
    title: 'Gestión de permisos',
    text: 'Tramitamos permisos y autorizaciones para cargas especiales.',
  },
  {
    title: 'Seguros de carga',
    text: 'Cobertura integral que protege el valor de tu maquinaria.',
  },
  {
    title: 'Cobertura nacional',
    text: 'Operamos en cualquier punto de Argentina.',
  },
  {
    title: 'Planificación logística',
    text: 'Rutas y tiempos estudiados para cada traslado.',
  },
  {
    title: 'Atención personalizada',
    text: 'Un interlocutor directo para todo tu proyecto.',
  },
  {
    title: 'Respuesta rápida',
    text: 'Cotizaciones y coordinación en tiempos ágiles.',
  },
  {
    title: 'Equipamiento especializado',
    text: 'Flota preparada para cada tipo de carga y peso.',
  },
]

export type FleetUnit = {
  slug: 'plancha' | 'carreton-15m' | 'carreton-cuello' | 'playo-balancin' | 'portacontenedor'
  name: string
  capacity: string
}

export const FLEET: FleetUnit[] = [
  {
    slug: 'plancha',
    name: 'Plancha hidráulica autodeslizante',
    capacity: '14 toneladas',
  },
  {
    slug: 'carreton-15m',
    name: 'Carretón de 15 metros',
    capacity: '25 toneladas',
  },
  {
    slug: 'carreton-cuello',
    name: 'Carretón cuello desmontable',
    capacity: '40 toneladas',
  },
  {
    slug: 'playo-balancin',
    name: 'Camión playo balancín',
    capacity: 'Cargas de gran longitud',
  },
]

export const CLIENTS = [
  { name: 'Wentek', src: '/clientes/wentek.png' },
  { name: 'Maquinarias Independencia', src: '/clientes/maquinarias-independencia.png' },
  { name: 'Tecno Fundaciones', src: '/clientes/tecno-fundaciones.png' },
  { name: 'ASV Fire', src: '/clientes/asv-fire.png' },
  { name: 'Decormec', src: '/clientes/decormec.png' },
  { name: 'Expoagro', src: '/clientes/expoagro.png' },
  { name: 'Rentall Maquinarias', src: '/clientes/rentall.png' },
  { name: 'Grúas Daniele', src: '/clientes/gruas-daniele.png' },
  { name: 'Bahisa', src: '/clientes/bahisa.png' },
  { name: 'La Rural', src: '/clientes/la-rural.png' },
  { name: 'Exponenciar', src: '/clientes/exponenciar.png' },
  { name: 'Game Rental', src: '/clientes/game-rental.png' },
  { name: 'Autoelevadores Daniel', src: '/clientes/autoelevadores-daniel.png' },
  { name: 'American Vial', src: '/clientes/american-vial.png' },
  { name: 'Sullair Argentina', src: '/clientes/sullair.png' },
  { name: 'Sheraton', src: '/clientes/sheraton.png' },
  { name: 'Manuga Plus', src: '/clientes/manuga-plus.png' },
]
