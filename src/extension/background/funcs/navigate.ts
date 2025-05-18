import { sender } from '@background/constants/sender'
import { background } from '@background/store'
import { navigateBrowser } from './navigateBrowser'

const httpUrlRegex: RegExp = /^https?:\/\//

export function navigate(direct: -1 | 1): void {
    const { currentTab } = background
    if (currentTab?.id === undefined) return

    const url: string | undefined = currentTab.url
    const isHttpUrl: boolean = !!url && httpUrlRegex.test(url)

    if (isHttpUrl) {
        sender.navigate(direct)
    } else {
        navigateBrowser(direct)
    }
}
