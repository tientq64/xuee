import { Tile } from '@remote/components/Tile'
import { remote, useRemote } from '@remote/store'
import { TileColor, TileNode } from '@remote/types/types'

export function SlowModeTile(): TileNode {
    const { slowMode } = useRemote()

    return (
        <Tile
            icon="filter_tilt_shift"
            color={slowMode ? TileColor.Yellow : undefined}
            tap={() => (remote.slowMode = !remote.slowMode)}
        >
            Chế độ chậm
        </Tile>
    )
}
