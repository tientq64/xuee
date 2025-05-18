import { sender } from '@remote/constants/sender'
import { Tile } from '@remote/types/types'

export function useReopenClosedTabTile(): Tile {
    return {
        text: 'Mở lại tab đã đóng',
        icon: 'history',
        press: sender.reopenClosedTab
    }
}
