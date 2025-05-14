import chromep from 'chrome-promise'
import { ref } from '../../../common/helpers/ref'
import { background } from '../store'
import { Tab } from '../types/types'

export async function initState(): Promise<void> {
    const [currentTab]: Tab[] = await chromep.tabs.query({ active: true })
    background.currentTab = ref(currentTab)
}
