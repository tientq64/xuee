import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

export function FullscreenTile(): TileNode {
    return (
        <Tile icon="screenshot_frame_2" tap={sender.fullscreen}>
            Toàn màn hình
        </Tile>
    )
}
