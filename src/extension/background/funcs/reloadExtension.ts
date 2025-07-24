import { background } from '@background/store'

export function reloadExtension(): void {
    const { bgTabId } = background
    if (bgTabId === undefined) return

    chrome.tabs.reload(bgTabId)
}
