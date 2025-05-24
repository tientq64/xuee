import { isValidDataPacket } from '@common/helpers/isValidDataPacket'
import { safeCall } from '@common/utils/safeCall'
import { CommandFuncs, commandFuncs } from './constants/funcs'

const xueeUrl: string = process.argv[2]
const base64: string = xueeUrl.slice(7, -1)
const json: string = decodeURIComponent(atob(base64))
const data: unknown = JSON.parse(json)

if (isValidDataPacket(data)) {
    const [funcName, args] = data
    const func: Function | undefined = commandFuncs[funcName as keyof CommandFuncs]
    safeCall(func, ...args)
}
