import { Window, WindowState } from '@background/types/types'
import chromep from 'chrome-promise'

let restoreState: WindowState | undefined = 'maximized'

export async function minimize(minimized?: boolean): Promise<void> {
    const win: Window = await chromep.windows.getCurrent()
    if (win.id === undefined) return
    if (win.type !== 'normal') return

    minimized ??= win.state !== 'minimized'
    if (minimized) {
        restoreState = win.state
    }

    const state: WindowState | undefined = minimized ? 'minimized' : restoreState
    await chromep.windows.update(win.id, { state })
}
