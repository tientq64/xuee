export async function reloadTab(): Promise<void> {
    await chrome.tabs.reload()
}
