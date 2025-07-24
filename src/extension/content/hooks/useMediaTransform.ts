import { updateMedia } from '@content/funcs/updateMedia'
import { content, useContent } from '@content/store'
import { Media } from '@content/types/types'
import { useEffect } from 'preact/hooks'

export function useMediaTransform(): void {
    const { rotate, scale, flipX, flipY, portrait } = useContent()

    useEffect(() => {
        const media: Media | null = updateMedia()
        if (media === null) return

        const transform: string = [
            `rotate(${rotate}deg)`,
            `scale(${scale * flipX}, ${scale * flipY})`
        ].join(' ')

        content.transform = transform

        media.dataset.rotate = String(rotate)
        media.dataset.scale = String(scale)
        media.dataset.flipX = String(flipX)
        media.dataset.flipY = String(flipY)
        media.dataset.portrait = String(portrait)
        media.style.transform = transform
    }, [rotate, scale, flipX, flipY, portrait])
}
