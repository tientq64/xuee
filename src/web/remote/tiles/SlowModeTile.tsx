import { Tile } from '@remote/components/Tile'
import { remote, useRemote } from '@remote/store'
import { TileColor, TileNode } from '@remote/types/types'

export function SlowModeTile(): TileNode {
    const { slowMode } = useRemote()

    return (
        <Tile
            icon="speed_0_25"
            iconClassName="scale-125"
            color={slowMode ? TileColor.Yellow : undefined}
            tap={() => (remote.slowMode = !remote.slowMode)}
        >
            Chế độ chậm
        </Tile>
    )
}
