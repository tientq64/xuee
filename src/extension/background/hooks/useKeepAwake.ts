import { useEffect } from 'preact/hooks'

export function useKeepAwake(): void {
    useEffect(() => {
        chrome.power.requestKeepAwake(chrome.power.Level.DISPLAY)
    }, [])
}
