import { Sheet, SheetName } from '@remote/types/types'
import { clickSubSheet } from '../sheets/clickSubSheet'
import { commonSheet } from '../sheets/commonSheet'
import { goToSubSheet } from '../sheets/goToSubSheet'
import { mainSheet } from '../sheets/mainSheet'
import { mediaSheet } from '../sheets/mediaSheet'
import { moreSubSheet } from '../sheets/moreSubSheet'
import { otherSheet } from '../sheets/otherSheet'
import { seekSheet } from '../sheets/seekSheet'
import { threadsSheet } from '../sheets/threadsSheet'
import { tikTokSheet } from '../sheets/tikTokSheet'
import { videoSheet } from '../sheets/videoSheet'
import { youTubeSheet } from '../sheets/youTubeSheet'

export const sheets: Record<SheetName, Sheet> = {
    click: clickSubSheet,
    common: commonSheet,
    goTo: goToSubSheet,
    main: mainSheet,
    media: mediaSheet,
    more: moreSubSheet,
    other: otherSheet,
    seek: seekSheet,
    threads: threadsSheet,
    tikTok: tikTokSheet,
    video: videoSheet,
    youTube: youTubeSheet
}
