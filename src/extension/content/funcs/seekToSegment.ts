import { isVideo } from '@content/helpers/isVideo'
import { Media } from '@content/types/types'
import { updateMedia } from './updateMedia'

export function seekToSegment(segment: number): void {
    const media: Media | null = updateMedia()
    if (!isVideo(media)) return

    if (!Number.isFinite(media.duration)) return

    const fraction: number = segment / 10
    const segmentTime: number = fraction * media.duration
    media.currentTime = segmentTime
}
