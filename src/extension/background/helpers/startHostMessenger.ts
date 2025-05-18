import { sender } from '@background/constants/sender'
import { backgroundFuncs, BackgroundFuncs } from '@background/funcs'
import { isValidDataPacket } from '@common/helpers/isValidDataPacket'
import { safeCall } from '@common/utils/safeCall'
import { contentFuncNames } from '@content/funcs'

export function startHostMessenger(): void {
    chrome.runtime.onMessage.addListener(handleRuntimeMessage)
}

function handleRuntimeMessage(data: unknown): undefined {
    if (!isValidDataPacket(data)) return

    const [funcName, args] = data
    if (contentFuncNames.includes(funcName)) return

    let func: Function | undefined
    func = backgroundFuncs[funcName as keyof BackgroundFuncs]
    func ??= sender[funcName as keyof {}]
    safeCall(func, ...args)
}
