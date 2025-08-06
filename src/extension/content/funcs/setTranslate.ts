import { content } from '@content/store'

export function setTranslate(
    translateX: number,
    translateY: number,
    relative: boolean = false
): void {
    if (!content.isFullmedia) return

    if (relative) {
        translateX += content.translateX
        translateY += content.translateY
    }

    content.translateX = translateX
    content.translateY = translateY
}
