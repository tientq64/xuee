import { Tile } from '@remote/components/Tile'
import { TileNode, Tileset } from '@remote/types/types'

export const tileCols: number = 3
export const tileRows: number = 9
export const tileCount: number = tileCols * tileRows
export const holdTime: number = 280
export const emptyTileset: Tileset = []
export const moveThreshold: number = 10
export const blankTile: TileNode = <Tile />
export const clickTime: number = 1000
