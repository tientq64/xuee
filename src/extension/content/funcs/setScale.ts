import { clamp } from '@common/utils/clamp'
import { content } from '@content/store'

export function setScale(scale: number, relative: boolean = false): void {
    if (!content.isFullmedia) return

    if (relative) scale += content.scale
    scale = clamp(scale, 1, 10)

    content.scale = scale
}
