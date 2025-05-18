import { Tab } from '@background/types/types'
import chromep from 'chrome-promise'

export async function getTabs(): Promise<Tab[]> {
    return await chromep.tabs.query({ currentWindow: true })
}
