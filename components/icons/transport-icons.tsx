import type { ComponentType, SVGProps } from 'react'
import {
  Weight,
  Ruler,
  UnfoldHorizontal,
  MoveVertical,
  Layers,
  Columns2,
  Package,
  PanelBottomOpen,
  FileCheck,
  Wrench,
  Siren,
  Settings2,
} from 'lucide-react'
import {
  PlanchaIcon,
  Carreton15Icon,
  MalacateIcon,
} from '@/components/icons/fleet-icons'

/**
 * Single source of truth for every "spec" / "traslado" icon used across the
 * Fleet cards and the Transport reader tooltips, so both sections stay in
 * sync instead of duplicating icon choices.
 */
export type IconKey =
  | 'plancha'
  | 'carreton'
  | 'malacate'
  | 'peso'
  | 'largo'
  | 'ancho-extensible'
  | 'altura'
  | 'capas'
  | 'columnas'
  | 'pallets'
  | 'baranda'
  | 'permisos'
  | 'desarme'
  | 'escolta'
  | 'a-medida'

export const ICONS: Record<IconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  plancha: PlanchaIcon,
  carreton: Carreton15Icon,
  malacate: MalacateIcon,
  peso: Weight,
  largo: Ruler,
  'ancho-extensible': UnfoldHorizontal,
  altura: MoveVertical,
  capas: Layers,
  columnas: Columns2,
  pallets: Package,
  baranda: PanelBottomOpen,
  permisos: FileCheck,
  desarme: Wrench,
  escolta: Siren,
  'a-medida': Settings2,
}

/**
 * Three meaning-groups, each with its own color, so a row mixing several
 * icons reads at a glance: orange = which vehicle, slate = a measurement,
 * indigo = a special/regulatory condition.
 */
export type IconCategory = 'equipo' | 'medida' | 'especial'

export const ICON_CATEGORY: Record<IconKey, IconCategory> = {
  plancha: 'equipo',
  carreton: 'equipo',
  malacate: 'equipo',
  peso: 'medida',
  largo: 'medida',
  'ancho-extensible': 'medida',
  altura: 'medida',
  capas: 'medida',
  columnas: 'medida',
  pallets: 'medida',
  baranda: 'medida',
  permisos: 'especial',
  desarme: 'especial',
  escolta: 'especial',
  'a-medida': 'especial',
}

export const ICON_CATEGORY_STYLES: Record<IconCategory, string> = {
  equipo: 'bg-brand/10 text-brand',
  medida: 'bg-slate-500/10 text-slate-600',
  especial: 'bg-indigo-500/10 text-indigo-600',
}
