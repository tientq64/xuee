import { getActiveTab } from '@background/helpers/getActiveTab'
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
        const bgTab: Tab = await chromep.tabs.getCurrent()
        background.bgTabId = bgTab.id
    }, [])
}
