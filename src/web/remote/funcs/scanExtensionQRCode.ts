import { scanQRCode } from '@remote/helpers/scanQRCode'
import { remote } from '@remote/store'
import { vibrate } from './vibrate'

export async function scanExtensionQRCode(): Promise<void> {
    const extensionId: string | null = await scanQRCode()
    if (extensionId === null) return

    remote.extensionId = extensionId
    vibrate()
}
