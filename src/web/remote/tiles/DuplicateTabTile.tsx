import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

export function DuplicateTabTile(): TileNode {
    return (
        <Tile icon="tab_inactive" tap={sender.duplicateTab}>
            Nhân đôi tab
        </Tile>
    )
}
