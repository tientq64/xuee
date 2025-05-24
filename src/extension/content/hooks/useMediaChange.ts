import { content, useContent } from '@content/store'
import { useEffect } from 'preact/hooks'

export function useMediaChange(): void {
    const { media } = useContent()

    useEffect(() => {
        if (media === null) return

        const rotate: number = Number(media.dataset.xueeRotate) || 0
        const scale: number = Number(media.dataset.xueeScale) || 1
        const flipX: number = Number(media.dataset.xueeFlipX) || 1
        const flipY: number = Number(media.dataset.xueeFlipY) || 1
        const translateX: number = Number(media.dataset.xueeTranslateX) || 1
        const translateY: number = Number(media.dataset.xueeTranslateY) || 1

        content.rotate = rotate
        content.scale = scale
        content.flipX = flipX
        content.flipY = flipY
        content.translateX = translateX
        content.translateY = translateY
    }, [media])
}
