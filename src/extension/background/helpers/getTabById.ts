import { Tab } from '@background/types/types'
import chromep from 'chrome-promise'

export async function getTabById(tabId: number | undefined): Promise<Tab | undefined> {
    if (tabId === undefined) return

    return await chromep.tabs.get(tabId)
}
