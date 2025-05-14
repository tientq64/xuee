import chromep from 'chrome-promise'
import { Window } from '../types/types'

export async function fullscreen(isFullscreen?: boolean): Promise<void> {
    const win: Window = await chromep.windows.getCurrent()
    if (win.id === undefined) return
    if (win.state === 'minimized') return

    isFullscreen ??= win.state !== 'fullscreen'

    chromep.windows.update(win.id, {
        state: isFullscreen ? 'fullscreen' : 'maximized'
    })
}
