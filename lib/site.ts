export const WHATSAPP_URL =
  'https://wa.me/5491163640392?text=Hola%20Guido!%20Quiero%20cotizar%20un%20traslado'

export const EMAIL = 'contacto@transportesmarinelly.com.ar'
export const EMAIL_HREF = `mailto:${EMAIL}`

export const LOCATION = {
  base: 'Quilmes',
  region: 'Prov. de Buenos Aires',
  country: 'Argentina',
}

export const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cobertura', href: '#cobertura' },
  { label: 'Nuestro compromiso', href: '#compromiso' },
  { label: 'Nuestra flota', href: '#flota' },
] as const

export type TransportItem = {
  slug: string
  title: string
  description: string
  /** Longer copy shown in the expanded detail card. */
  longDescription: string
  /** Drop a real photo path here (e.g. '/transporte/excavadoras.jpg'). Leave '' to show the branded fallback. */
  image: string
}

export const TRANSPORT_ITEMS: TransportItem[] = [
  {
    slug: 'excavadoras',
    title: 'Excavadoras',
    description: 'Traslado seguro de excavadoras de cadenas y ruedas.',
    longDescription:
      'Excavadoras de cadenas y de ruedas, para obra vial, movimiento de suelo y demolición. Por su peso y el brazo/pluma que sobresale, el traslado requiere plancha baja y a veces desarme parcial del balde o la pluma para respetar altura y ancho de ruta.',
    image: '/transporte/excavadoras.jpg',
  },
  {
    slug: 'retroexcavadoras',
    title: 'Retroexcavadoras',
    description: 'Logística precisa para retroexcavadoras y mixtas.',
    longDescription:
      'Equipos mixtos (pala frontal + retro), muy usados en obras urbanas y rurales. Son más compactas que una excavadora grande, pero igual exigen amarre firme y cuidado en el descenso por su centro de gravedad alto.',
    image: '/transporte/retroexcavadoras.jpg',
  },
  {
    slug: 'motoniveladoras',
    title: 'Motoniveladoras',
    description: 'Transporte de motoniveladoras y equipo vial.',
    longDescription:
      'Equipo vial de gran longitud, usado para nivelación de caminos y terraplenes. Su hoja frontal y el largo total de la máquina piden un carretón extendido y planificación de ruta para curvas y cruces angostos.',
    image: '/transporte/motoniveladoras.jpg',
  },
  {
    slug: 'rodillos',
    title: 'Rodillos compactadores',
    description: 'Traslado de rodillos y compactadores de suelo.',
    longDescription:
      'Compactadores de suelo y asfalto, de distintos pesos según sean para obra vial o urbana. Suelen trasladarse en plancha por su bajo centro de gravedad, aunque el peso concentrado en poco espacio exige buen cálculo de la carga por eje.',
    image: '/transporte/rodillos.jpg',
  },
  {
    slug: 'gruas',
    title: 'Grúas',
    description: 'Movimiento de grúas y equipos de izaje.',
    longDescription:
      'Grúas móviles y equipos de izaje, desde modelos chicos hasta unidades de gran porte. El traslado varía mucho según el modelo: algunas viajan armadas, otras requieren desmontar la pluma o los contrapesos para cumplir con los límites de ruta.',
    image: '/transporte/gruas.jpg',
  },
  {
    slug: 'autoelevadores',
    title: 'Autoelevadores',
    description: 'Transporte de autoelevadores y equipos de carga.',
    longDescription:
      'Autoelevadores de uso industrial y logístico, de distintas capacidades de carga. Son relativamente compactos, pero por su peso concentrado adelante necesitan un amarre específico para el traslado.',
    image: '/transporte/autoelevadores.jpg',
  },
  {
    slug: 'maquinaria-agricola',
    title: 'Maquinaria agrícola',
    description: 'Cosechadoras, tractores, sembradoras y pulverizadoras.',
    longDescription:
      'Cosechadoras, tractores, sembradoras y pulverizadoras. Muchas veces son cargas de ancho o alto considerable (cabezales, plataformas), por lo que suelen necesitar desarme parcial y permisos de carga especial según la ruta.',
    image: '/transporte/maquinaria-agricola.jpg',
  },
  {
    slug: 'equipos-industriales',
    title: 'Equipos industriales',
    description: 'Maquinaria industrial y equipos de gran porte.',
    longDescription:
      'Maquinaria de planta e industria pesada: desde equipos de producción hasta estructuras de gran porte. Cada traslado se planifica a medida según el peso, las dimensiones y el punto exacto de carga y descarga.',
    image: '/transporte/equipos-industriales.jpg',
  },
  {
    slug: 'cargas-especiales',
    title: 'Cargas especiales',
    description: 'Soluciones a medida para cargas fuera de norma.',
    longDescription:
      'Todo lo que no entra en las categorías anteriores: piezas fuera de norma, estructuras, equipos atípicos. Se coordina de forma personalizada: relevamiento previo, permisos especiales y, si hace falta, escolta.',
    image: '/transporte/cargas-especiales.jpg',
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
