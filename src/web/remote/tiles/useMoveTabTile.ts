import { sender } from '@remote/constants/sender'
import { Tile } from '@remote/types/types'
import { useMemo } from 'preact/hooks'

export function useMoveTabTile(direct: -1 | 1): Tile {
    return useMemo(() => {
        const isLeft: boolean = direct === -1

        return {
            text: isLeft ? 'Di chuyển tab sang trái' : 'Di chuyển tab sang phải',
            icon: isLeft ? 'right_panel_open' : 'left_panel_open',
            press: () => sender.moveTab(direct)
        }
    }, [direct])
}
