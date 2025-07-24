import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

interface FlipTileProps {
    flipX?: number
}

export function FlipTile({ flipX }: FlipTileProps): TileNode {
    return (
        <Tile icon="flip" tap={() => sender.setFlipX(flipX)}>
            Lật
        </Tile>
    )
}
