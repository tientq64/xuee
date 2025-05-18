import { sender } from '@remote/constants/sender'
import { Tile } from '@remote/types/types'

export function useReloadTabTile(): Tile {
    return {
        text: 'Tải lại',
        icon: 'refresh',
        press: sender.reloadTab
    }
}
