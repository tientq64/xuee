import { BackgroundFuncs } from '../../../../extension/background/funcs'
import { ContentFuncs } from '../../../../extension/content/funcs'
import { remote } from '../store'

export const sender = new Proxy<ContentFuncs & BackgroundFuncs>({} as any, {
    get: (_, funcName: string): Function => {
        return (...args: any[]): void => {
            remote.conn?.send([funcName, args])
        }
    }
})
