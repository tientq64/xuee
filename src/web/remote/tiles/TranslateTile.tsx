import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { useRemote } from '@remote/store'
import { TileColor, TileNode } from '@remote/types/types'

export function TranslateTile(): TileNode {
    const { slowMode } = useRemote()

    return (
        <Tile
            icon="drag_pan"
            color={slowMode ? TileColor.Yellow : undefined}
            moveScale={slowMode ? 5 : 40}
            move={(x, y) => {
                sender.setTranslate(x, y, true)
            }}
        >
            Di chuyển
        </Tile>
    )
}
