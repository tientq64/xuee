import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

interface RotateTileProps {
    amount: number
}

export function RotateTile({ amount }: RotateTileProps): TileNode {
    const isLeft: boolean = amount < 0

    return (
        <Tile
            icon={isLeft ? 'rotate_left' : 'rotate_right'}
            tap={() => sender.setRotate(amount, true)}
        >
            {isLeft ? 'Xoay trái' : 'Xoay phải'}
        </Tile>
    )
}
