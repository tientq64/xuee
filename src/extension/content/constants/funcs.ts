import { clickNumb } from '../funcs/clickNumb'
import { fullmedia } from '../funcs/fullmedia'
import { markClick } from '../funcs/markClick'
import { navigate } from '../funcs/navigate'
import { pausePlay } from '../funcs/pausePlay'
import { scroll } from '../funcs/scroll'
import { seekBy } from '../funcs/seekBy'
import { seekToSegment } from '../funcs/seekToSegment'
import { setFlipX } from '../funcs/setFlipX'
import { setRotate } from '../funcs/setRotate'
import { setScale } from '../funcs/setScale'
import { setVideoQuality } from '../funcs/setVideoQuality'
import { updateMedia } from '../funcs/updateMedia'

export const contentFuncs = {
    clickNumb,
    fullmedia,
    markClick,
    navigate,
    pausePlay,
    scroll,
    seekBy,
    seekToSegment,
    setFlipX,
    setRotate,
    setScale,
    setVideoQuality,
    updateMedia
}
export type ContentFuncs = typeof contentFuncs
