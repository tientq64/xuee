import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

export function ReloadExtensionTile(): TileNode {
    return (
        <Tile icon="extension" tap={sender.reloadExtension}>
            Tải lại tiện ích mở rộng
        </Tile>
    )
}
