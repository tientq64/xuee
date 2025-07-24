import { Media } from '@content/types/types'

export function isVideo(media: Media | null): media is HTMLVideoElement {
    return media instanceof HTMLVideoElement
}
