import { sender } from '@remote/constants/sender'
import { Tile } from '@remote/types/types'

export function useRecordScreenTile(): Tile {
    return recordScreenTile
}

const recordScreenTile: Tile = {
    text: 'Quay màn hình',
    icon: 'video_camera_back',
    press: sender.recordScreen
}
