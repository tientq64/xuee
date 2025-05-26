import { ScrollAmount } from '@common/constants/constants'
import { sender } from '@remote/constants/sender'
import { Tile } from '@remote/types/types'
import { useMemo } from 'preact/hooks'

export function useScrollTile(amount: ScrollAmount): Tile {
    return useMemo(() => {
        const isUp: boolean = amount < 0
        const isMax: boolean = Math.abs(amount) === ScrollAmount.Max

        if (isMax) {
            return {
                text: isUp ? 'Cuộn lên đầu' : 'Cuộn xuống cuối',
                icon: 'double_arrow',
                className: isUp ? '-rotate-90' : 'rotate-90',
                press: () => sender.scroll(amount)
            }
        }

        return {
            text: isUp ? 'Cuộn lên' : 'Cuộn xuống',
            icon: isUp ? 'arrow_upward' : 'arrow_downward',
            press: () => sender.scroll(amount)
        }
    }, [amount])
}
