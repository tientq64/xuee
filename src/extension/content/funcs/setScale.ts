import { clamp } from '@common/utils/clamp'
import { content } from '@content/store'

export function setScale(scale: number, relative?: boolean): void {
    if (relative) scale += content.scale
    scale = clamp(scale, 0.1, 10)

    content.scale = scale
}
