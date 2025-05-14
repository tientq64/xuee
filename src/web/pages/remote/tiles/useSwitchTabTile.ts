import { Tile, TileColor } from '../types/types'

export function useSwitchTabTile(direct: -1 | 1): Tile {
    const isLeft: boolean = direct === -1

    return {
        text: isLeft ? 'Tab trái' : 'Tab phải',
        icon: isLeft ? 'arrow_back' : 'arrow_forward',
        color: TileColor.Blue
    }
}
