import { ref } from '@common/helpers/ref'
import { remote } from '@remote/store'

export function scanQRCode(): Promise<string | null> {
    return new Promise((resolve) => {
        remote.qrcodeScanResolve = ref(resolve)
    })
}
