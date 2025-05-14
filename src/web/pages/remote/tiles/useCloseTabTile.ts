import { Tile, TileColor } from '../types/types'

export function useCloseTabTile(): Tile {
    return {
        text: 'Đóng',
        icon: 'close',
        color: TileColor.Red
    }
}
