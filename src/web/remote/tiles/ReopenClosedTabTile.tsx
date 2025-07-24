import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

export function ReopenClosedTabTile(): TileNode {
    return (
        <Tile icon="history" tap={sender.reopenClosedTab}>
            Mở lại tab đã đóng
        </Tile>
    )
}
