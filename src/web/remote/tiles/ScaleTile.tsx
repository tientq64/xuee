import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { useRemote } from '@remote/store'
import { TileColor, TileNode } from '@remote/types/types'

interface ScaleTileProps {
    amount: number
}

export function ScaleTile({ amount }: ScaleTileProps): TileNode {
    const { slowMode } = useRemote()

    const isZoomOut: boolean = amount < 0

    return (
        <Tile
            icon={isZoomOut ? 'zoom_out' : 'zoom_in'}
            color={slowMode ? TileColor.Yellow : undefined}
            tap={() => sender.setScale(amount, true)}
        >
            {isZoomOut ? 'Thu nhỏ' : 'Phóng to'}
        </Tile>
    )
}
