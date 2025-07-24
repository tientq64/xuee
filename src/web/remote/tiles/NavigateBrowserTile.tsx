import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

interface NavigateBrowserTileProps {
    direct: -1 | 1
}

export function NavigateBrowserTile({ direct }: NavigateBrowserTileProps): TileNode {
    const isPrev: boolean = direct === -1

    return (
        <Tile
            icon={isPrev ? 'arrow_top_left' : 'arrow_top_right'}
            tap={() => sender.navigateBrowser(direct)}
        >
            {isPrev ? 'Trở về trên trình duyệt' : 'Đi tiếp trên trình duyệt'}
        </Tile>
    )
}
