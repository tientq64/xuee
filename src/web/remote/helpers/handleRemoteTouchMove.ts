import { vibrate } from '@remote/funcs/vibrate'
import { remote } from '@remote/store'
import { TouchEvent } from 'preact/compat'

export function handleRemoteTouchMove(event: TouchEvent<HTMLDivElement>): void {
    if (!remote.tapByHover) return

    let tilesetIndex: number

    try {
        const touch: Touch | null = event.touches.item(0)
        if (touch === null) throw 0

        const hoverEl: Element | null = document.elementFromPoint(touch.clientX, touch.clientY)
        if (hoverEl === null) throw 0

        tilesetIndex = Number(hoverEl.getAttribute('data-tileset-index') ?? -1)
    } catch {
        tilesetIndex = -1
    }

    if (tilesetIndex >= 0 && tilesetIndex !== remote.hoveringTilesetIndex) {
        vibrate()
    }
    remote.hoveringTilesetIndex = tilesetIndex
}
