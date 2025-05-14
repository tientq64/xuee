import { isValidDataPacket } from '../../../common/helpers/isValidDataPacket'
import { contentFuncNames } from '../../content/funcs'
import { backgroundFuncs, BackgroundFuncs } from '../funcs'
import { MessageSender } from '../types/types'

export function startMessenger(): void {
    chrome.runtime.onMessage.addListener(handleRuntimeMessage)
}

function handleRuntimeMessage(data: unknown, sender: MessageSender): undefined {
    if (!isValidDataPacket(data)) return
    const [funcName, args] = data
    if (contentFuncNames.includes(funcName)) return
    const func: Function | undefined =
        backgroundFuncs[funcName as keyof BackgroundFuncs] ?? sender[funcName as keyof {}]
    func?.(...args)
}
