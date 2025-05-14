export function keepAwake(): void {
    chrome.power.requestKeepAwake(chrome.power.Level.DISPLAY)
}
