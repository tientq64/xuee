import { sender } from '@remote/constants/sender'
import { Tile } from '@remote/types/types'

export function useFullmediaTile(): Tile {
    return fullmediaTile
}

const fullmediaTile: Tile = {
    text: 'Xem ảnh/video',
    icon: 'wallpaper',
    press: sender.fullmedia
}
