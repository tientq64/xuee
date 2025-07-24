import { background } from '@background/store'

export async function duplicateTab(): Promise<void> {
    const { currentTab } = background
    if (currentTab?.id === undefined) return

    await chrome.tabs.duplicate(currentTab.id)
}
