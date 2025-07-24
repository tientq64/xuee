import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

export function FullmediaTile(): TileNode {
    return (
        <Tile icon="wallpaper" tap={sender.fullmedia}>
            Xem ảnh/video
        </Tile>
    )
}
