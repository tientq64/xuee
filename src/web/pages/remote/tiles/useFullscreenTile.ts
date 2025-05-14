import { sender } from '../constants/sender'
import { Tile } from '../types/types'

export function useFullscreenTile(): Tile {
    return {
        text: 'Toàn màn hình',
        icon: 'screenshot_frame_2',
        press: sender.fullscreen
    }
}
