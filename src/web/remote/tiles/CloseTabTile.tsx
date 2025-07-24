import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileColor, TileNode } from '@remote/types/types'

export function CloseTabTile(): TileNode {
    return (
        <Tile icon="close" color={TileColor.Red} tap={sender.closeTab}>
            Đóng
        </Tile>
    )
}
