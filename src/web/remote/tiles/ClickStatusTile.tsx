import { Tile } from '@remote/components/Tile'
import { remote, useRemote } from '@remote/store'
import { TileColor, TileNode } from '@remote/types/types'

export function ClickStatusTile(): TileNode {
    const { clickInput, clickOpenInNewTab } = useRemote()

    return (
        <Tile
            iconText={clickInput}
            color={clickOpenInNewTab ? TileColor.Yellow : undefined}
            tap={() => (remote.clickInput = '')}
        >
            Nhấn để xóa
        </Tile>
    )
}
