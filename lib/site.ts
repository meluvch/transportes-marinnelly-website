import type { IconKey } from '@/components/icons/transport-icons'

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
  /** The "Qué es" paragraph shown in the expanded detail card. */
  about: string
  /** The "Traslado:" copy — rendered next to the method/condition icons. */
  transfer: string
  /** Icons (with their own tooltip copy) shown alongside "Traslado:". */
  transferIcons: { icon: IconKey; tooltip: string }[]
  /** Drop a real photo path here (e.g. '/transporte/excavadoras.jpg'). Leave '' to show the branded fallback. */
  image: string
}

export const TRANSPORT_ITEMS: TransportItem[] = [
  {
    slug: 'excavadoras',
    title: 'Excavadoras',
    description: 'Traslado seguro de excavadoras de cadenas y ruedas.',
    about:
      'Excavadoras de cadenas y de ruedas, para obra vial, movimiento de suelo y demolición.',
    transfer: 'en plancha hasta 14 toneladas. Si supera ese peso, se utiliza carretón.',
    transferIcons: [
      { icon: 'plancha', tooltip: 'Traslado en plancha (hasta 14 toneladas)' },
      { icon: 'carreton', tooltip: 'Traslado en carretón (más de 14 toneladas)' },
    ],
    image: '/transporte/excavadoras.jpg',
  },
  {
    slug: 'retroexcavadoras',
    title: 'Retroexcavadoras',
    description: 'Logística precisa para retroexcavadoras y mixtas.',
    about:
      'Equipo mixto (pala frontal + retro) que nos acompaña en el día a día. Su versatilidad lo hace ideal para trabajos en zonas urbanas o de difícil acceso.',
    transfer: 'en plancha para equipos pesados. Si no puede autocargarse, se utiliza malacate.',
    transferIcons: [
      { icon: 'plancha', tooltip: 'Traslado en plancha para equipos pesados' },
      { icon: 'malacate', tooltip: 'Uso de malacate si el equipo no puede autocargarse' },
    ],
    image: '/transporte/retroexcavadoras.jpg',
  },
  {
    slug: 'motoniveladoras',
    title: 'Motoniveladoras',
    description: 'Transporte de motoniveladoras y equipo vial.',
    about: 'Equipo vial de gran longitud, usado para nivelación de caminos y terraplenes.',
    transfer:
      'en carretón extendido. Su hoja frontal y largo total requieren planificación de ruta para curvas y cruces angostos.',
    transferIcons: [
      { icon: 'carreton', tooltip: 'Traslado en carretón extendido' },
      { icon: 'largo', tooltip: 'Requiere planificación de ruta por su longitud' },
    ],
    image: '/transporte/motoniveladoras.jpg',
  },
  {
    slug: 'rodillos',
    title: 'Rodillos compactadores',
    description: 'Traslado de rodillos y compactadores de suelo.',
    about:
      'Compactadores de suelo y asfalto, de distintos pesos según sean para obra vial o urbana.',
    transfer:
      'en carretón si es doble pata de cabra (obligatorio). En plancha, se ayuda con malacate y requiere eje con goma trasero.',
    transferIcons: [
      { icon: 'carreton', tooltip: 'Traslado obligatorio en carretón (doble pata de cabra)' },
      { icon: 'plancha', tooltip: 'Traslado en plancha con eje con goma trasero' },
      { icon: 'malacate', tooltip: 'Se ayuda con malacate para la carga' },
    ],
    image: '/transporte/rodillos.jpg',
  },
  {
    slug: 'gruas',
    title: 'Grúas',
    description: 'Movimiento de grúas y equipos de izaje.',
    about: 'Grúas móviles y equipos de izaje, desde modelos chicos hasta unidades de gran porte.',
    transfer:
      'varía según el modelo, pudiendo ir aparejadas para aprovechar el viaje. Brazos articulados de más de 15 mtrs requieren carretón obligatoriamente.',
    transferIcons: [
      { icon: 'carreton', tooltip: 'Traslado obligatorio en carretón (brazos de más de 15 mtrs)' },
      { icon: 'largo', tooltip: 'Según el largo del brazo articulado' },
    ],
    image: '/transporte/gruas.jpg',
  },
  {
    slug: 'autoelevadores',
    title: 'Autoelevadores',
    description: 'Transporte de autoelevadores y equipos de carga.',
    about: 'Autoelevadores de uso industrial y logístico, de distintas capacidades de carga.',
    transfer:
      'en plancha hasta 10 toneladas; por encima de ese peso, en carretón. Suelen contratarse ambas unidades cuando se necesita el carretón para carga palletizada y la plancha para llevar el autoelevador que realiza la carga en el otro camión.',
    transferIcons: [
      { icon: 'plancha', tooltip: 'Traslado en plancha (hasta 10 toneladas)' },
      { icon: 'carreton', tooltip: 'Traslado en carretón (más de 10 toneladas)' },
      { icon: 'peso', tooltip: 'Límite de peso según unidad' },
    ],
    image: '/transporte/autoelevadores.jpg',
  },
  {
    slug: 'maquinaria-agricola',
    title: 'Maquinaria agrícola',
    description: 'Cosechadoras, tractores, sembradoras y pulverizadoras.',
    about:
      'Cosechadoras, tractores, sembradoras y pulverizadoras, propios de la época de cosecha.',
    transfer:
      'en carretón de 15 mtrs. Cargas de ancho o alto considerable (cabezales, plataformas) suelen requerir desarme parcial y permisos de carga especial según la ruta.',
    transferIcons: [
      { icon: 'carreton', tooltip: 'Traslado en carretón de 15 mtrs' },
      { icon: 'permisos', tooltip: 'Requiere permisos de carga especial según la ruta' },
      { icon: 'desarme', tooltip: 'Puede requerir desarme parcial de la unidad' },
    ],
    image: '/transporte/maquinaria-agricola.jpg',
  },
  {
    slug: 'equipos-industriales',
    title: 'Equipos industriales',
    description: 'Maquinaria industrial y equipos de gran porte.',
    about:
      'Maquinaria de planta e industria pesada: desde equipos de producción hasta estructuras de gran porte.',
    transfer: 'se planifica a medida según el peso, las dimensiones y el punto exacto de carga y descarga.',
    transferIcons: [
      { icon: 'a-medida', tooltip: 'Traslado planificado a medida según cada caso' },
    ],
    image: '/transporte/equipos-industriales.jpg',
  },
  {
    slug: 'cargas-especiales',
    title: 'Cargas especiales',
    description: 'Soluciones a medida para cargas fuera de norma.',
    about:
      'Todo lo que no entra en las categorías anteriores: piezas fuera de norma, estructuras, equipos atípicos.',
    transfer:
      'se coordina de forma personalizada: relevamiento previo, permisos especiales y, si hace falta, escolta.',
    transferIcons: [
      { icon: 'permisos', tooltip: 'Requiere permisos especiales' },
      { icon: 'escolta', tooltip: 'Puede requerir escolta' },
    ],
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
  // 'portacontenedor' has no entry in FLEET yet (and no case in
  // UNIT_ICONS/components/fleet.tsx) — kept in the union as scaffolding for
  // when that unit is added to the fleet, not currently rendered anywhere.
  slug: 'plancha' | 'carreton-15m' | 'carreton-cuello' | 'playo-balancin' | 'portacontenedor'
  name: string
  specs: { icon: IconKey; label: string }[]
}

export const FLEET: FleetUnit[] = [
  {
    slug: 'plancha',
    name: 'Plancha hidráulica autodeslizante',
    specs: [
      { icon: 'peso', label: 'Carga hasta 14 toneladas' },
      { icon: 'largo', label: 'Dimensiones planchada: 8.00 x 2.60 mtrs' },
      { icon: 'capas', label: 'Base de chapa semillada' },
      { icon: 'malacate', label: 'Malacate para 10 toneladas' },
      { icon: 'columnas', label: 'Opción con columnas laterales de contención' },
      { icon: 'altura', label: '130 cm de piso a planchada' },
    ],
  },
  {
    slug: 'carreton-15m',
    name: 'Carretón vial 3 ejes',
    specs: [
      { icon: 'peso', label: 'Carga hasta 25 toneladas' },
      { icon: 'largo', label: 'Dimensiones planchada: 13.00 x 2.60 mtrs' },
      { icon: 'largo', label: 'Dimensiones pecho: 2.50 x 2.60 mtrs' },
      { icon: 'ancho-extensible', label: 'Ancho extensible a 3.20 mtrs' },
      { icon: 'altura', label: '85 cm de piso a planchada' },
    ],
  },
  {
    slug: 'carreton-cuello',
    name: 'Carretón cuello desmontable',
    specs: [
      { icon: 'peso', label: 'Carga hasta 40 toneladas' },
      { icon: 'largo', label: 'Dimensiones planchada: 9.00 x 2.60 mtrs' },
      { icon: 'ancho-extensible', label: 'Ancho extensible a 3.20 mtrs' },
      { icon: 'altura', label: '70 cm de piso a planchada' },
    ],
  },
  {
    slug: 'playo-balancin',
    name: 'Camión playo balancín',
    specs: [
      { icon: 'peso', label: 'Carga hasta 14 toneladas' },
      { icon: 'largo', label: 'Dimensiones planchada: 7.00 x 2.60 mtrs' },
      { icon: 'pallets', label: 'Capacidad: 14 pallets' },
      { icon: 'altura', label: '120 cm de piso a planchada' },
      { icon: 'baranda', label: 'Baranda volcable' },
    ],
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
