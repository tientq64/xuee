import { clamp } from '@common/utils/clamp'
import { content } from '@content/store'

export function setRotate(value: number, relative: boolean = false): void {
    const { media } = content
    if (media === null) return

    let { rotate } = content
    if (relative) {
        rotate += value
    } else {
        rotate = value
    }
    rotate = clamp(rotate, 360)

    content.rotate = rotate
}
