import { RealSiteName } from '../../../../common/types/types'
import { mergeSheet } from '../helpers/mergeSheet'
import { sheetToTilesets } from '../helpers/sheetToTilesets'
import { useCommonSheet } from '../sheets/useCommonSheet'
import { useTikTokSheet } from '../sheets/useTikTokSheet'
import { useYouTubeSheet } from '../sheets/useYouTubeSheet'
import { useRemote } from '../store'
import { Sheet, Tileset } from '../types/types'

export function useTilesets(): Tileset[] {
    const { siteName } = useRemote()

    const sheetsMap: Record<RealSiteName, Sheet> = {
        youtube: useYouTubeSheet(),
        tiktok: useTikTokSheet()
    }

    let sheet: Sheet = useCommonSheet()

    const siteSheet: Sheet | undefined = sheetsMap[siteName as RealSiteName]
    sheet = mergeSheet(sheet, siteSheet)

    const tilesets: Tileset[] = sheetToTilesets(sheet)

    return tilesets
}
