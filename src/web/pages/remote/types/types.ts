import { MaterialSymbols } from 'material-design-icons-literal-types'

export enum TileColor {
    Red = 'text-rose-300',
    Yellow = 'text-orange-300',
    Green = 'text-green-300',
    Blue = 'text-blue-300'
}

export interface Tile {
    text: string
    icon: MaterialSymbols
    color?: TileColor
    press?: () => void
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
