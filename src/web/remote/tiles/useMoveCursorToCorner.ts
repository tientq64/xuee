import { sender } from '@remote/constants/sender'
import { Tile } from '@remote/types/types'

export function useMoveCursorToCorner(): Tile {
    return moveCursorToCorner
}

const moveCursorToCorner: Tile = {
    text: 'Di chuyển chuột ra góc',
    icon: 'bottom_right_click',
    press: sender.moveCursorToCorner
}
