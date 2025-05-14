import chromep from 'chrome-promise'
import { ref } from '../../../common/helpers/ref'
import { sender } from '../constants/sender'
import { background } from '../store'
import { Tab } from '../types/types'

export function startEvents(): void {
    chrome.tabs.onUpdated.addListener((_, { url }, tab) => {
        if (!tab.active) return
        background.currentTab = ref(tab)
        if (url !== undefined) {
            sender.receiveSiteUrl(url ?? '')
        }
    })

    chrome.tabs.onActivated.addListener(async ({ tabId }) => {
        const tab: Tab = await chromep.tabs.get(tabId)
        background.currentTab = ref(tab)
        sender.receiveSiteUrl(tab.url ?? '')
    })
}
