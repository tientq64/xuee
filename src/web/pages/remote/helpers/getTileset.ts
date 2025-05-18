import { castArray } from '@common/utils/castArray'
import { Sheet, SheetCoord, SheetTile, Tileset } from '@remote/types/types'

export function getTileset(sheet: Sheet, coord: string): Tileset {
    const sheetTile: SheetTile | undefined = sheet[coord as SheetCoord]

    return castArray(sheetTile) as Tileset
}
