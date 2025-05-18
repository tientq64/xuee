import { sender } from '@background/constants/sender'
import { Tab } from '@background/types/types'
import { TabInfo } from '@common/types/types'

export function sendTabInfoToRemote(tab: Tab | undefined, excludeTabUrl: boolean = false): void {
    let tabInfo: TabInfo
    if (tab === undefined) {
        tabInfo = [undefined, '', -1]
    } else {
        const tabUrl: string | null = excludeTabUrl ? null : (tab.url ?? '')
        tabInfo = [tab.id, tabUrl, tab.index]
    }
    sender.receiveTabInfo(tabInfo)
}
