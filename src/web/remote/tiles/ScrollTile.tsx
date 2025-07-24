import { ScrollAmount } from '@common/constants/constants'
import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

interface ScrollTileProps {
    amount: ScrollAmount
}

export function ScrollTile({ amount }: ScrollTileProps): TileNode {
    const isUp: boolean = amount < 0
    const isMax: boolean = Math.abs(amount) === ScrollAmount.Max

    if (isMax) {
        return (
            <Tile
                icon="double_arrow"
                iconClassName={isUp ? '-rotate-90' : 'rotate-90'}
                tap={() => sender.scroll(amount)}
            >
                {isUp ? 'Cuộn lên đầu' : 'Cuộn xuống cuối'}
            </Tile>
        )
    }

    return (
        <Tile icon={isUp ? 'arrow_upward' : 'arrow_downward'} tap={() => sender.scroll(amount)}>
            {isUp ? 'Cuộn lên' : 'Cuộn xuống'}
        </Tile>
    )
}
