import { isPortraitMedia } from '@content/helpers/isPortraitMedia'
import { content, useContent } from '@content/store'
import { Media } from '@content/types/types'
import { useEffect } from 'preact/hooks'

const mediaClassName: string = 'xuee-media'

export function useMediaChange(): void {
    const { media } = useContent()

    useEffect(() => {
        if (media === null) return

        const rotate: number = Number(media.dataset.rotate) || 0
        const scale: number = Number(media.dataset.scale) || 1
        const flipX: number = Number(media.dataset.flipX) || 1
        const flipY: number = Number(media.dataset.flipY) || 1
        const translateX: number = Number(media.dataset.translateX) || 1
        const translateY: number = Number(media.dataset.translateY) || 1
        const portrait: boolean = isPortraitMedia(media as Media)

        content.rotate = rotate
        content.scale = scale
        content.flipX = flipX
        content.flipY = flipY
        content.translateX = translateX
        content.translateY = translateY
        content.portrait = portrait

        media.classList.add(mediaClassName)

        return () => {
            media.classList.remove(mediaClassName)
        }
    }, [media])
}
