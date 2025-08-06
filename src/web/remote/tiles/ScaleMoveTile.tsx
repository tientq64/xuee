import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

export function ScaleMoveTile(): TileNode {
    return (
        <Tile
            icon="pan_zoom"
            moveScale={0.02}
            move={(_, y) => {
                sender.setScale(-y, true)
            }}
        >
            Thu phóng
        </Tile>
    )
}
