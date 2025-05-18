import { background } from '@background/store'
import { Tab } from '@background/types/types'
import { ref } from '@common/helpers/ref'
import { getActiveTab } from './getActiveTab'

export async function initState(): Promise<void> {
    const currentTab: Tab | undefined = await getActiveTab()
    background.currentTab = ref(currentTab)
}
