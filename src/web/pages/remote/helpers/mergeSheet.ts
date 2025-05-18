import { Sheet, SheetCoord, Tileset } from '@remote/types/types'
import { getTileset } from './getTileset'

export function mergeSheet(sheetA: Sheet, sheetB: Sheet): Sheet {
    const sheet: Sheet = { ...sheetA }

    for (const coord in sheetB) {
        const tilesetA: Tileset = getTileset(sheetA, coord)
        const tilesetB: Tileset = getTileset(sheetB, coord)

        tilesetB.forEach((tileB, i) => {
            if (tileB !== undefined) {
                tilesetA[i] = tileB
            }
        })
        if (tilesetA.length) {
            sheet[coord as SheetCoord] = tilesetA
        }
    }

    return sheet
}
