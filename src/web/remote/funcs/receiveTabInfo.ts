import { getSiteByUrl } from '@common/helpers/getSiteByUrl'
import { TabInfo } from '@common/types/types'
import { remote } from '@remote/store'

export function receiveTabInfo(tabInfo: TabInfo): void {
    const [tabId, tabUrl, tabIndex] = tabInfo

    remote.tabId = tabId
    if (tabUrl !== null) {
        remote.site = getSiteByUrl(tabUrl)
    }
    remote.tabIndex = tabIndex

    const siteId: string = `${remote.tabId}/${remote.site.name}`
    if (siteId !== remote.siteId) {
        remote.siteId = siteId
        remote.subSheetName = undefined
    }
}
