import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

interface MoveTabTileProps {
    direct: -1 | 1
}

export function MoveTabTile({ direct }: MoveTabTileProps): TileNode {
    const isLeft: boolean = direct === -1

    return (
        <Tile
            icon={isLeft ? 'right_panel_open' : 'left_panel_open'}
            tap={() => sender.moveTab(direct)}
        >
            {isLeft ? 'Di chuyển tab sang trái' : 'Di chuyển tab sang phải'}
        </Tile>
    )
}
