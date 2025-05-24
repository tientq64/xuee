import { backgroundFuncs, BackgroundFuncs } from '@background/constants/funcs'
import { sender } from '@background/constants/sender'
import { isValidDataPacket } from '@common/helpers/isValidDataPacket'
import { safeCall } from '@common/utils/safeCall'
import { contentFuncNames } from '@content/constants/funcNames'
import { useEffect } from 'preact/hooks'

export function useSetupHostMessenger(): void {
    useEffect(() => {
        chrome.runtime.onMessage.addListener(handleRuntimeMessage)
    }, [])
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
