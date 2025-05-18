import { BackgroundFuncs } from '@background/funcs'
import { ContentFuncs } from '@content/funcs'
import { remote } from '@remote/store'

export const sender = new Proxy<BackgroundFuncs & ContentFuncs>({} as any, {
    get: (_, funcName: string): Function => {
        return (...args: any[]): void => {
            remote.conn?.send([funcName, args])
        }
    }
})
