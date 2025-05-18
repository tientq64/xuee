import { SiteName } from '@common/constants/sites'
import { mergeSheet } from '@remote/helpers/mergeSheet'
import { sheetToTilesets } from '@remote/helpers/sheetToTilesets'
import { useRemote } from '@remote/store'
import { Sheet, SubSheetName, Tileset } from '@remote/types/types'
import { useClickSubSheet } from '@sheets/useClickSubSheet'
import { useCommonSheet } from '@sheets/useCommonSheet'
import { useMainSheet } from '@sheets/useMainSheet'
import { useMoreSubSheet } from '@sheets/useMoreSubSheet'
import { useTikTokSheet } from '@sheets/useTikTokSheet'
import { useYouTubeSheet } from '@sheets/useYouTubeSheet'
import { useMemo } from 'react'

export function useTilesets(): Tileset[] {
    const { site, subSheetName, sheetId } = useRemote()

    const commonSheet: Sheet = useCommonSheet()
    const mainSheet: Sheet = useMainSheet()

    const siteSheets: Record<SiteName, Sheet> = {
        [SiteName.YouTube]: useYouTubeSheet(),
        [SiteName.TikTok]: useTikTokSheet(),
        [SiteName.Other]: {}
    }
    const subSheets: Record<SubSheetName, Sheet> = {
        [SubSheetName.More]: useMoreSubSheet(),
        [SubSheetName.Click]: useClickSubSheet()
    }

    const tilesets = useMemo<Tileset[]>(() => {
        let sheet: Sheet

        if (subSheetName !== undefined) {
            sheet = subSheets[subSheetName]
        } else {
            sheet = siteSheets[site.name]
            sheet = mergeSheet(mainSheet, sheet)
        }
        sheet = mergeSheet(commonSheet, sheet)

        return sheetToTilesets(sheet)
    }, [sheetId, commonSheet, mainSheet, siteSheets, subSheets])

    return tilesets
}
