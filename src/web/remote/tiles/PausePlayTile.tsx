import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

export function PausePlayTile(): TileNode {
    return (
        <Tile icon="pause" tap={sender.pausePlay}>
            Tạm dừng/Tiếp tục
        </Tile>
    )
}
