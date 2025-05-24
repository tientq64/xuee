import { BackgroundFuncs } from '@background/constants/funcs'
import { CommandFuncs } from '@command/constants/funcs'
import { ContentFuncs } from '@content/constants/funcs'
import { remote } from '@remote/store'

export const sender = new Proxy<BackgroundFuncs & CommandFuncs & ContentFuncs>({} as any, {
    get: (_, funcName: string): Function => {
        return (...args: any[]): void => {
            remote.conn?.send([funcName, args])
        }
    }
})
