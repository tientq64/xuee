import { sheets } from '@remote/constants/sheets'
import { mergeSheet } from '@remote/helpers/mergeSheet'
import { sheetToTilesets } from '@remote/helpers/sheetToTilesets'
import { commonSheet } from '@remote/sheets/commonSheet'
import { mainSheet } from '@remote/sheets/mainSheet'
import { remote, useRemote } from '@remote/store'
import { Sheet, Tileset } from '@remote/types/types'
import { useMemo } from 'preact/hooks'

export function useTilesets(): Tileset[] {
    const { sheetId } = useRemote()

    return useMemo<Tileset[]>(() => {
        const { site, subSheetName } = remote

        let sheet: Sheet

        if (subSheetName !== undefined) {
            sheet = sheets[subSheetName]
        } else {
            sheet = sheets[site.name]
            sheet = mergeSheet(mainSheet, sheet)
        }
        sheet = mergeSheet(commonSheet, sheet)

        return sheetToTilesets(sheet)
    }, [sheetId])
}
