import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

export function MinimizeTile(): TileNode {
    return (
        <Tile icon="call_to_action" tap={sender.minimize}>
            Ẩn/hiện cửa sổ
        </Tile>
    )
}
