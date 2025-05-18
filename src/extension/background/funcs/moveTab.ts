import { getTabs } from '@background/helpers/getTabs'
import { background } from '@background/store'
import { Tab } from '@background/types/types'
import { modulo } from '@common/utils/modulo'
import chromep from 'chrome-promise'

export async function moveTab(direct: -1 | 1): Promise<void> {
    const { currentTab } = background
    if (currentTab?.id === undefined) return

    const tabs: Tab[] = await getTabs()
    if (tabs.length === 0) return

    const toTabIndex: number = modulo(currentTab.index + direct, tabs.length)
    await chromep.tabs.move(currentTab.id, { index: toTabIndex })
}
