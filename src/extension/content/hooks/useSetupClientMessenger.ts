import { isValidDataPacket } from '@common/helpers/isValidDataPacket'
import { safeCall } from '@common/utils/safeCall'
import { contentFuncs, ContentFuncs } from '@content/constants/funcs'
import { useEffect } from 'preact/hooks'

export function useSetupClientMessenger(): void {
    useEffect(() => {
        chrome.runtime.onMessage.addListener(handleRuntimeMessage)
    }, [])
}

function handleRuntimeMessage(data: unknown): void {
    if (!isValidDataPacket(data)) return
    const [funcName, args] = data
    const func: Function | undefined = contentFuncs[funcName as keyof ContentFuncs]
    safeCall(func, ...args)
}
