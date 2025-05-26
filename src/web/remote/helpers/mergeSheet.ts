import { Sheet, SheetCoord, Tileset } from '@remote/types/types'

export function mergeSheet(sheetA: Sheet, sheetB: Sheet): Sheet {
    const sheet: Sheet = { ...sheetA }

    for (const coordB in sheetB) {
        const coord = coordB as SheetCoord

        const tilesetB: Tileset | undefined = sheetB[coord]
        if (tilesetB === undefined) continue

        const tilesetA: Tileset | undefined = sheetA[coord]
        if (tilesetA === undefined) {
            sheet[coord] = tilesetB
            continue
        }
        const tileset: Tileset = [...tilesetA]

        tilesetB.forEach((tileB, i) => {
            if (tileB === undefined) return
            tileset[i] = tileB
        })
        sheet[coord] = tileset
    }

    return sheet
}
