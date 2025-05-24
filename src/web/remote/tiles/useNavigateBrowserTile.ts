import { sender } from '@remote/constants/sender'
import { Tile } from '@remote/types/types'

export function useNavigateBrowserTile(direct: -1 | 1): Tile {
    const isPrev: boolean = direct === -1

    return {
        text: isPrev ? 'Trở về trên trình duyệt' : 'Đi tiếp trên trình duyệt',
        icon: isPrev ? 'arrow_top_left' : 'arrow_top_right',
        press: () => sender.navigateBrowser(direct)
    }
}
