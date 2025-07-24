import { remote } from '@remote/store'

export function resolveQRCodeScan(value: string | null): void {
    if (remote.qrcodeScanResolve === undefined) return

    remote.qrcodeScanResolve(value)
    remote.qrcodeScanResolve = undefined
}
