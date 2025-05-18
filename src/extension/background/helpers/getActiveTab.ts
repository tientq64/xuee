import { Tab } from '@background/types/types'
import chromep from 'chrome-promise'

export async function getActiveTab(): Promise<Tab | undefined> {
    const [tab]: Tab[] = await chromep.tabs.query({
        active: true,
        currentWindow: true
    })

    return tab
}
