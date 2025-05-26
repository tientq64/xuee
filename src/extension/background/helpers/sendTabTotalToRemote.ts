import { sender } from '@background/constants/sender'
import { background } from '@background/store'
import { Tab } from '@background/types/types'
import { getTabs } from './getTabs'

export async function sendTabTotalToRemote(): Promise<void> {
    const tabs: Tab[] = await getTabs()
    const offset: number = background.bgTabId === undefined ? 0 : 1
    sender.receiveTabTotal(tabs.length - offset)
}
