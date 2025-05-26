import { sender } from '@remote/constants/sender'
import { Tile } from '@remote/types/types'

export function usePrintScreenTile(): Tile {
    return printScreenTile
}

const printScreenTile: Tile = {
    text: 'Chụp màn hình',
    icon: 'photo_camera',
    press: sender.printScreen
}
