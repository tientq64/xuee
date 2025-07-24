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
                sendToContent(data)
            } else if (remoteFuncNames.includes(funcName)) {
                sendToRemote(data)
            } else if (commandFuncNames.includes(funcName)) {
                sendToCommand(data)
            }
        }
    }
})

function sendToContent(data: DataPacket): void {
    const { currentTab } = background
    if (currentTab?.id === undefined) return

    chrome.tabs.sendMessage<DataPacket>(currentTab.id, data)
}

function sendToRemote(data: DataPacket): void {
    const { conn } = background
    if (conn === undefined) return

    conn.send(data)
}

function sendToCommand(data: DataPacket): void {
    const { bgTabId } = background
    if (bgTabId === undefined) return

    const json: string = JSON.stringify(data)
    const base64: string = btoa(encodeURIComponent(json))
    const xueeUrl: string = `xuee://${base64}`
    chrome.tabs.update(bgTabId, { url: xueeUrl })
}
