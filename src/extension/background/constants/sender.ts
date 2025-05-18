import { background } from '@background/store'
import { DataPacket } from '@common/types/types'
import { ContentFuncs, contentFuncNames } from '@content/funcs'
import { RemoteFuncs, remoteFuncNames } from '@remote/funcs'

export const sender = new Proxy<ContentFuncs & RemoteFuncs>({} as any, {
    get: (_, funcName: string): Function => {
        return (...args: any[]): void => {
            if (contentFuncNames.includes(funcName)) {
                const { currentTab } = background
                if (currentTab?.id === undefined) return
                chrome.tabs.sendMessage<DataPacket>(currentTab.id, [funcName, args])
            } else if (remoteFuncNames.includes(funcName)) {
                background.conn?.send([funcName, args] as DataPacket)
            }
        }
    }
})
