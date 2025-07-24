import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileColor, TileNode } from '@remote/types/types'

interface SwitchTabTileProps {
    direct: -1 | 1
}

export function SwitchTabTile({ direct }: SwitchTabTileProps): TileNode {
    const isLeft: boolean = direct === -1

    return (
        <Tile
            icon={isLeft ? 'arrow_back' : 'arrow_forward'}
            color={TileColor.Blue}
            tap={() => sender.switchTab(direct)}
        >
            {isLeft ? 'Tab trái' : 'Tab phải'}
        </Tile>
    )
}
