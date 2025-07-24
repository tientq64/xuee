import { Tile } from '@remote/components/Tile'
import { scanExtensionQRCode } from '@remote/funcs/scanExtensionQRCode'
import { TileNode } from '@remote/types/types'

export function ScanExtensionQRCodeTile(): TileNode {
    return (
        <Tile icon="qr_code" tap={scanExtensionQRCode}>
            Quét QR kết nối...
        </Tile>
    )
}
