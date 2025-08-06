import { updateMedia } from '@content/funcs/updateMedia'
import { content, useContent } from '@content/store'
import { Media } from '@content/types/types'
import { useEffect } from 'preact/hooks'

export function useMediaTransform(): void {
    const { rotate, scale, flipX, flipY, translateX, translateY, portrait, isFullmedia, media } =
        useContent()

    useEffect(() => {
        if (!isFullmedia) return

        const media: Media | null = updateMedia()
        if (media === null) return

        media.dataset.rotate = String(rotate)
        media.dataset.scale = String(scale)
        media.dataset.flipX = String(flipX)
        media.dataset.flipY = String(flipY)
        media.dataset.translateX = String(translateX)
        media.dataset.translateY = String(translateY)
        media.dataset.portrait = String(portrait)

        media.style.translate = `calc(${translateX}px - 50%) calc(${translateY}px - 50%)`
        media.style.rotate = `${rotate}deg`
        media.style.scale = `${scale * flipX} ${scale * flipY}`

        const { top, right, bottom, left, width, height } = media.getBoundingClientRect()
        if (width > innerWidth) {
            if (left > 0) {
                content.translateX -= left
            } else if (right < innerWidth) {
                content.translateX += innerWidth - right
            }
        } else {
            content.translateX = 0
        }
        if (height > innerHeight) {
            if (top > 0) {
                content.translateY -= top
            } else if (bottom < innerHeight) {
                content.translateY += innerHeight - bottom
            }
        } else {
            content.translateY = 0
        }

        return () => {
            media.style.translate = ''
            media.style.rotate = ''
            media.style.scale = ''
        }
    }, [rotate, scale, flipX, flipY, translateX, translateY, portrait, isFullmedia])
}
