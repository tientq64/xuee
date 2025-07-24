import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

interface NavigateTileProps {
    direct: -1 | 1
}

export function NavigateTile({ direct }: NavigateTileProps): TileNode {
    const isPrev: boolean = direct === -1

    return (
        <Tile icon={isPrev ? 'undo' : 'redo'} tap={() => sender.navigate(direct)}>
            {isPrev ? 'Trở về' : 'Đi tiếp'}
        </Tile>
    )
}
