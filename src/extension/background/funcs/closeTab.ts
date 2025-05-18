import { getTabs } from '@background/helpers/getTabs'
import { background } from '@background/store'
import { Tab } from '@background/types/types'
import chromep from 'chrome-promise'
import { fullscreen } from './fullscreen'

export async function closeTab(): Promise<void> {
    const { currentTab } = background
    if (currentTab?.id === undefined) return

    const tabs: Tab[] = await getTabs()
    if (tabs.length <= 1) {
        fullscreen(false)
        return
    }

    await chromep.tabs.remove(currentTab.id)
}
