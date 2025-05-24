import { sender } from '@remote/constants/sender'
import { Tile, TileColor } from '@remote/types/types'

export function useCloseTabTile(): Tile {
    return {
        text: 'Đóng',
        icon: 'close',
        color: TileColor.Red,
        press: sender.closeTab
    }
}
