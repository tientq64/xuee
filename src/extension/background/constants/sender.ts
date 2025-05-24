import { background } from '@background/store'
import { commandFuncNames } from '@command/constants/funcNames'
import type { CommandFuncs } from '@command/constants/funcs'
import { DataPacket } from '@common/types/types'
import { contentFuncNames } from '@content/constants/funcNames'
import type { ContentFuncs } from '@content/constants/funcs'
import { remoteFuncNames } from '@remote/constants/funcNames'
import type { RemoteFuncs } from '@remote/constants/funcs'

export const sender = new Proxy<ContentFuncs & RemoteFuncs & CommandFuncs>({} as any, {
    get: (_, funcName: string): Function => {
        return (...args: any[]): void => {
            const data: DataPacket = [funcName, args]

            if (contentFuncNames.includes(funcName)) {
                const currentTabId: number | undefined = background.currentTab?.id
                if (currentTabId === undefined) return
                chrome.tabs.sendMessage<DataPacket>(currentTabId, data)
            } else if (remoteFuncNames.includes(funcName)) {
                background.conn?.send(data)
            } else if (commandFuncNames.includes(funcName)) {
                const json: string = JSON.stringify(data)
                const base64: string = btoa(encodeURIComponent(json))
                const xueeUrl: string = `xuee://${base64}`
                location.href = xueeUrl
            }
        }
    }
})
