import { content } from '@content/store'

export function setFlipX(flipX?: number): void {
    if (!content.isFullmedia) return

    flipX ??= content.flipX * -1
    flipX = flipX > 0 ? 1 : -1

    content.flipX = flipX
}
