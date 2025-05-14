import { tileCols, tileRows } from '../constants/constants'
import { Sheet, Tileset } from '../types/types'
import { getTileset } from './getTileset'
import { sheetCoordToIndex } from './sheetCoordToIndex'

export function sheetToTilesets(sheet: Sheet): Tileset[] {
    const tilesets = Array<Tileset>(tileCols * tileRows).fill([])

    for (const coord in sheet) {
        const index: number = sheetCoordToIndex(coord)
        tilesets[index] = getTileset(sheet, coord)
    }

    return tilesets
}
