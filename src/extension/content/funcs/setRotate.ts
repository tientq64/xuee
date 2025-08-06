import { wrap } from '@common/utils/wrap'
import { content } from '@content/store'

export function setRotate(rotate: number, relative: boolean = false): void {
    if (!content.isFullmedia) return

    if (relative) rotate += content.rotate
    rotate = wrap(rotate, 360)

    content.rotate = rotate
}
