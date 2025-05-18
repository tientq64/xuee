export async function navigateBrowser(direct: -1 | 1): Promise<void> {
    try {
        if (direct === -1) {
            await chrome.tabs.goBack()
        } else if (direct === 1) {
            await chrome.tabs.goForward()
        }
    } catch (error) {
        console.log(error)
    }
}
