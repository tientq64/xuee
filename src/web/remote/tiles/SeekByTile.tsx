import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { useRemote } from '@remote/store'
import { TileColor, TileNode } from '@remote/types/types'

interface SeekByTileProps {
    seconds: number
}

export function SeekByTile({ seconds }: SeekByTileProps): TileNode {
    const { slowMode } = useRemote()

    const isRewind: boolean = seconds < 0

    return (
        <Tile
            icon={isRewind ? 'fast_rewind' : 'fast_forward'}
            color={slowMode ? TileColor.Yellow : undefined}
            tap={() => sender.seekBy(seconds)}
        >
            {isRewind ? 'Tua lại' : 'Tua đi'}
        </Tile>
    )
}
