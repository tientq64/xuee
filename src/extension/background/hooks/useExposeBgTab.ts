import { useBackground } from '@background/store'
import { TabChangeInfo } from '@background/types/types'
import chromep from 'chrome-promise'
import { useEffect } from 'preact/hooks'

const exposedHash: string = '#exposed'

export function useExposeBgTab(): void {
    const { bgTabId } = useBackground()

    const handleForcePinBgTab = (tabId: number, changeInfo: TabChangeInfo) => {
        if (bgTabId === undefined) return
        if (tabId !== bgTabId) return
        if (changeInfo.pinned === undefined) return
        if (changeInfo.pinned) return

        chromep.tabs.update(bgTabId, { pinned: true })
    }

    useEffect(() => {
        if (location.hash === exposedHash) return

        const url: URL = new URL(location.href)
        url.hash = exposedHash
        chromep.tabs.create({
            active: false,
            index: 0,
            pinned: true,
            url: url.toString()
        })
        window.close()
    }, [])

    useEffect(() => {
        if (location.hash !== exposedHash) return
        if (bgTabId === undefined) return

        chrome.tabs.onUpdated.addListener(handleForcePinBgTab)

        return () => {
            chrome.tabs.onUpdated.removeListener(handleForcePinBgTab)
        }
    }, [bgTabId])
}
