import { BackgroundFuncs } from '@background/funcs'
import { DataPacket } from '@common/types/types'
import { RemoteFuncs } from '@remote/funcs'

export const sender = new Proxy<BackgroundFuncs & RemoteFuncs>({} as any, {
    get: (_, funcName: string): Function => {
        return (...args: any[]): void => {
            chrome.runtime.sendMessage<DataPacket>([funcName, args])
        }
    }
})
