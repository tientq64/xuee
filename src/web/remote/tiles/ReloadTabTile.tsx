import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

export function ReloadTabTile(): TileNode {
    return (
        <Tile icon="refresh" tap={sender.reloadTab}>
            Tải lại
        </Tile>
    )
}
