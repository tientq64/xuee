import { remote } from '@remote/store'

export function handleRemoteTouchEnd(): void {
    if (remote.tapByHover) {
        if (remote.hoveringTilesetIndex >= 0) {
            remote.hoverTapped = true
        } else {
            remote.subSheetName = undefined
        }
        remote.tapByHover = false
    }
}
