import { getMousePositionInfo, MousePositionInfo } from '@command/helpers/getMousePositionInfo'
import { mouse } from '@nut-tree-fork/nut-js'

export async function mouseMove(
    x?: number | number,
    y?: number | number,
    relative: boolean = false
): Promise<void> {
    const [pos, width, height]: MousePositionInfo = await getMousePositionInfo()

    if (typeof x === 'string') {
        x = width * (parseInt(x) / 100)
    }
    if (typeof y === 'string') {
        y = height * (parseInt(y) / 100)
    }

    if (relative) {
        x = pos.x + (x ?? 0)
        y = pos.y + (y ?? 0)
    } else {
        x ??= pos.x
        y ??= pos.y
        if (x < 0) x = width + x
        if (y < 0) y = height + y
    }

    mouse.setPosition({ x, y })
}
