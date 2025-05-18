import { sender } from '@background/constants/sender'
import { Tab } from '@background/types/types'
import { getTabs } from './getTabs'

export async function sendTabTotalToRemote(): Promise<void> {
    const tabs: Tab[] = await getTabs()
    sender.receiveTabTotal(tabs.length)
}
