import { emptyTileset, tileCols, tileRows } from '@remote/constants/constants'
import { Sheet, Tileset } from '@remote/types/types'
import { getTileset } from './getTileset'
import { sheetCoordToIndex } from './sheetCoordToIndex'

export function sheetToTilesets(sheet: Sheet): Tileset[] {
    const tilesets = Array<Tileset>(tileCols * tileRows).fill(emptyTileset)

    for (const coord in sheet) {
        const index: number = sheetCoordToIndex(coord)
        tilesets[index] = getTileset(sheet, coord)
    }

    return tilesets
}
