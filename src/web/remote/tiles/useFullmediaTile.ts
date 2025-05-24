import { sender } from '@remote/constants/sender'
import { Tile } from '@remote/types/types'

export function useFullmediaTile(): Tile {
    return {
        text: 'Xem ảnh/video',
        icon: 'fit_screen',
        press: sender.fullmedia
    }
}
