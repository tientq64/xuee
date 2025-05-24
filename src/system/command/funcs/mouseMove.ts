import { mouse, Point, screen } from '@nut-tree-fork/nut-js'

export async function mouseMove(
    x?: number | number,
    y?: number | number,
    relative: boolean = false
): Promise<void> {
    const [pos, width, height]: [Point, number, number] = await Promise.all([
        mouse.getPosition(),
        screen.width(),
        screen.height()
    ])

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
