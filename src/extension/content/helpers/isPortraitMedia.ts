import { Media } from '@content/types/types'
import { isVideo } from './isVideo'

export function isPortraitMedia(media: Media): boolean {
    let width: number
    let height: number

    if (isVideo(media)) {
        width = media.videoWidth
        height = media.videoHeight
    } else {
        width = media.naturalWidth
        height = media.naturalHeight
    }

    const ratio: number = width / height
    return ratio < 1
}
