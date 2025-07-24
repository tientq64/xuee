import { isVideo } from '@content/helpers/isVideo'
import { Media } from '@content/types/types'
import { updateMedia } from './updateMedia'

export function seekBy(seconds: number): void {
    const media: Media | null = updateMedia()
    if (!isVideo(media)) return

    media.currentTime += seconds
}
