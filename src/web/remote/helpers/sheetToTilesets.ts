import { emptyTileset, tileCount } from '@remote/constants/constants'
import { Sheet, SheetCoord, Tileset } from '@remote/types/types'

const templTilesets = Array<Tileset>(tileCount).fill(emptyTileset)

const sheetCoordToIndexMap: Record<SheetCoord, number> = {
    '00': 0,
    '01': 1,
    '02': 2,
    '10': 3,
    '11': 4,
    '12': 5,
    '20': 6,
    '21': 7,
    '22': 8,
    '30': 9,
    '31': 10,
    '32': 11,
    '40': 12,
    '41': 13,
    '42': 14,
    '50': 15,
    '51': 16,
    '52': 17,
    '60': 18,
    '61': 19,
    '62': 20,
    '70': 21,
    '71': 22,
    '72': 23,
    '80': 24,
    '81': 25,
    '82': 26
}

export function sheetToTilesets(sheet: Sheet): Tileset[] {
    const tilesets: Tileset[] = [...templTilesets]

    for (const coord in sheet) {
        const index: number = sheetCoordToIndexMap[coord as SheetCoord]
        tilesets[index] = sheet[coord as SheetCoord] ?? emptyTileset
    }

    return tilesets
}
