import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

interface SeekSegmentNumberTileProps {
    segment: number
}

export function SeekSegmentNumberTile({ segment }: SeekSegmentNumberTileProps): TileNode {
    return <Tile iconText={segment} tap={() => sender.seekToSegment(segment)}></Tile>
}
