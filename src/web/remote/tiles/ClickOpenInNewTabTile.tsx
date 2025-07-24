import { Tile } from '@remote/components/Tile'
import { remote, useRemote } from '@remote/store'
import { TileColor, TileNode } from '@remote/types/types'

export function ClickOpenInNewTabTile(): TileNode {
    const { clickOpenInNewTab } = useRemote()

    return (
        <Tile
            icon="open_in_new"
            color={clickOpenInNewTab ? TileColor.Yellow : undefined}
            tap={() => (remote.clickOpenInNewTab = !remote.clickOpenInNewTab)}
        >
            Mở trong tab mới
        </Tile>
    )
}
