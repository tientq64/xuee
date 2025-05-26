import { sender } from '@remote/constants/sender'
import { Tile, TileColor } from '@remote/types/types'
import { useMemo } from 'preact/hooks'

export function useSwitchTabTile(direct: -1 | 1): Tile {
    return useMemo(() => {
        const isLeft: boolean = direct === -1

        return {
            text: isLeft ? 'Tab trái' : 'Tab phải',
            icon: isLeft ? 'arrow_back' : 'arrow_forward',
            color: TileColor.Blue,
            press: () => sender.switchTab(direct)
        }
    }, [direct])
}
