import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

export function MoveCursorToCornerTile(): TileNode {
    return (
        <Tile icon="bottom_right_click" tap={sender.moveCursorToCorner}>
            Di chuột ra góc
        </Tile>
    )
}
