import { getTabs } from '@background/helpers/getTabs'
import { background } from '@background/store'
import { Tab } from '@background/types/types'
import { wrap } from '@common/utils/wrap'
import chromep from 'chrome-promise'

export async function switchTab(direct: -1 | 1): Promise<void> {
    const { currentTab, bgTabId } = background
    if (currentTab?.id === undefined) return

    const tabs: Tab[] = await getTabs()
    if (tabs.length === 0) return

    const toTabIndex: number = wrap(
        currentTab.index + direct,
        bgTabId === undefined ? 0 : 1,
        tabs.length
    )
    const toTab: Tab = tabs[toTabIndex]
    if (toTab.id === undefined) return

    await chromep.tabs.update(toTab.id, { active: true })
}
