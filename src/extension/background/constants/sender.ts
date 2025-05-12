import { remoteFuncNames, RemoteFuncs } from '../../../web/pages/remote/funcs'
import { contentFuncNames, ContentFuncs } from '../../content/funcs'
import { background } from '../store'

export const sender = new Proxy<ContentFuncs & RemoteFuncs>({} as any, {
    get: (_, funcName: string): Function => {
        return (...args: any[]): void => {
            if (contentFuncNames.includes(funcName)) {
                const { currentTab } = background
                if (!currentTab?.id) return
                chrome.tabs.sendMessage(currentTab.id, [funcName, args])
            } else if (remoteFuncNames.includes(funcName)) {
                background.conn?.send([funcName, args])
            }
        }
    }
})
