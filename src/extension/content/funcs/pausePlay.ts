import { isVideo } from '@content/helpers/isVideo'
import { Media } from '@content/types/types'
import { updateMedia } from './updateMedia'

export function pausePlay(): void {
    const media: Media | null = updateMedia()
    if (!isVideo(media)) return

    if (media.paused) {
        media.play()
    } else {
        media.pause()
    }
}
