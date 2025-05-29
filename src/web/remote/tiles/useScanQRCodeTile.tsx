import { Tile } from '@remote/types/types'

export function useScanQRCodeTile(): Tile {
    return {
        text: 'Quét mã QR',
        icon: 'qr_code_scanner'
    }
}
