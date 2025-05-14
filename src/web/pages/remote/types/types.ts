import { MaterialSymbols } from 'material-design-icons-literal-types'
import { PeerErrorType, PeerError as PeerJsError } from 'peerjs'
import { ReactElement } from 'react'
import { AnyFunction } from '../../../../common/types/types'

export enum TileColor {
    Red = 'text-rose-400',
    Yellow = 'text-orange-300',
    Green = 'text-emerald-400',
    Blue = 'text-blue-400',
    Gray = 'text-slate-400'
}

export interface Tile {
    text?: string
    icon?: MaterialSymbols
    color?: TileColor
    spin?: boolean
    disabled?: boolean
    press?: AnyFunction | null
    content?: ReactElement
}

export type Tileset = [pressTile?: Tile, holdTile?: Tile, moveTile?: Tile]

export type SheetCoord =
    | '00'
    | '01'
    | '02'
    | '10'
    | '11'
    | '12'
    | '20'
    | '21'
    | '22'
    | '30'
    | '31'
    | '32'
    | '40'
    | '41'
    | '42'
    | '50'
    | '51'
    | '52'
    | '60'
    | '61'
    | '62'
    | '70'
    | '71'
    | '72'

export type SheetTile = Tileset | Tile

export type Sheet = Partial<Record<SheetCoord, SheetTile>>

export type PeerError = PeerJsError<PeerErrorType>
