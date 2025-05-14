import { sender } from '../constants/sender'
import { Tile } from '../types/types'

export function useReloadTabTile(): Tile {
    return {
        text: 'Tải lại',
        icon: 'refresh',
        press: sender.reloadTab
    }
}
