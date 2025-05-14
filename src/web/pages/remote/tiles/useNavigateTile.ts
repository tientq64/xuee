import { Tile } from '../types/types'

export function useNavigateTile(direct: -1 | 1): Tile {
    const isPrev: boolean = direct === -1

    return {
        text: isPrev ? 'Trở về' : 'Đi tiếp',
        icon: isPrev ? 'undo' : 'redo'
    }
}
