import { getActiveTab } from '@background/helpers/getActiveTab'
import { sendTabInfoToRemote } from '@background/helpers/sendTabInfoToRemote'
import { sendTabTotalToRemote } from '@background/helpers/sendTabTotalToRemote'
import { background } from '@background/store'
import { Tab } from '@background/types/types'
import { ref } from '@common/helpers/ref'
import chromep from 'chrome-promise'
import { useEffect } from 'preact/hooks'

export function useSetupEvents(): void {
    useEffect(setupEvents, [])
}

function setupEvents(): void {
    chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
        const { currentTab } = background
        if (currentTab === undefined) return
        if (currentTab.windowId !== tab.windowId) return
        if (!tab.active) return
        background.currentTab = ref(tab)
        if (changeInfo.url !== undefined) {
            sendTabInfoToRemote(tab)
        }
    })

    chrome.tabs.onActivated.addListener(async (activeInfo) => {
        const tab: Tab = await chromep.tabs.get(activeInfo.tabId)
        background.currentTab = ref(tab)
        sendTabInfoToRemote(tab)
    })

    chrome.tabs.onMoved.addListener(async () => {
        const tab: Tab | undefined = await getActiveTab()
        background.currentTab = ref(tab)
        sendTabInfoToRemote(tab, true)
    })

    chrome.tabs.onCreated.addListener(async (newTab) => {
        const tab: Tab | undefined = await getActiveTab()
        background.currentTab = ref(tab)
        sendTabInfoToRemote(tab, !newTab.active)
        sendTabTotalToRemote()
    })

    chrome.tabs.onRemoved.addListener(async () => {
        const tab: Tab | undefined = await getActiveTab()
        background.currentTab = ref(tab)
        sendTabInfoToRemote(tab, true)
        sendTabTotalToRemote()
    })

    chrome.tabs.onAttached.addListener(async () => {
        const tab: Tab | undefined = await getActiveTab()
        background.currentTab = ref(tab)
        sendTabInfoToRemote(tab, true)
        sendTabTotalToRemote()
    })

    chrome.tabs.onDetached.addListener(async () => {
        const tab: Tab | undefined = await getActiveTab()
        background.currentTab = ref(tab)
        sendTabInfoToRemote(tab, true)
        sendTabTotalToRemote()
    })

    chrome.windows.onFocusChanged.addListener(async () => {
        const tab: Tab | undefined = await getActiveTab()
        background.currentTab = ref(tab)
        sendTabInfoToRemote(tab)
        sendTabTotalToRemote()
    })
}
