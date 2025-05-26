import { Window, WindowState } from '@background/types/types'
import chromep from 'chrome-promise'

export async function fullscreen(isFullscreen?: boolean): Promise<void> {
    const win: Window = await chromep.windows.getCurrent()
    if (win.id === undefined) return
    if (win.type !== 'normal') return
    if (win.state === 'minimized') return

    isFullscreen ??= win.state !== 'fullscreen'

    const state: WindowState = isFullscreen ? 'fullscreen' : 'maximized'
    await chromep.windows.update(win.id, { state })
}
