import { sender } from '@background/constants/sender'
import { background } from '@background/store'
import { Tab } from '@background/types/types'
import { TabInfo } from '@common/types/types'

export function sendTabInfoToRemote(tab: Tab | undefined, excludeTabUrl: boolean = false): void {
    let tabInfo: TabInfo
    if (tab === undefined) {
        tabInfo = [undefined, '', -1]
    } else {
        const tabUrl: string | null = excludeTabUrl ? null : (tab.url ?? '')
        const offset: number = background.bgTabId === undefined ? 0 : 1
        tabInfo = [tab.id, tabUrl, tab.index - offset]
    }
    sender.receiveTabInfo(tabInfo)
}
