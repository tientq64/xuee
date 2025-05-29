import { getActiveTab } from '@background/helpers/getActiveTab'
import { getTabs } from '@background/helpers/getTabs'
import { background } from '@background/store'
import { Tab } from '@background/types/types'
import { ref } from '@common/helpers/ref'
import { useAsyncEffect } from 'ahooks'
import chromep from 'chrome-promise'

export function useSetupState(): void {
    useAsyncEffect(async () => {
        const currentTab: Tab | undefined = await getActiveTab()
        background.currentTab = ref(currentTab)
    }, [])

    useAsyncEffect(async () => {
        let bgTab: Tab = await chromep.tabs.getCurrent()
        const tabs: Tab[] = await getTabs()
        const duplicateBgTabs: Tab[] = tabs.filter((tab) => {
            return tab.id !== bgTab.id && tab.url === bgTab.url
        })
        duplicateBgTabs.forEach((tab) => {
            if (tab.id === undefined) return
            chromep.tabs.remove(tab.id)
        })
        background.bgTabId = bgTab.id
    }, [])
}
