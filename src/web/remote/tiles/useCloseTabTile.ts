import { sender } from '@remote/constants/sender'
import { Tile, TileColor } from '@remote/types/types'

export function useCloseTabTile(): Tile {
    return closeTabTile
}

const closeTabTile: Tile = {
    text: 'Đóng',
    icon: 'close',
    color: TileColor.Red,
    press: sender.closeTab
}
