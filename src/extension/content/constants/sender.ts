import { BackgroundFuncs } from '@background/constants/funcs'
import { CommandFuncs } from '@command/constants/funcs'
import { DataPacket } from '@common/types/types'
import { RemoteFuncs } from '@remote/constants/funcs'

export const sender = new Proxy<BackgroundFuncs & CommandFuncs & RemoteFuncs>({} as any, {
    get: (_, funcName: string): Function => {
        return (...args: any[]): void => {
            chrome.runtime.sendMessage<DataPacket>([funcName, args])
        }
    }
})
