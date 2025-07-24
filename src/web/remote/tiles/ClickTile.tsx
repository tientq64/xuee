import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { SubSheetName, TileNode } from '@remote/types/types'

export function ClickTile(): TileNode {
    return (
        <Tile
            icon="web_traffic"
            iconClassName="scale-115"
            subSheetName={SubSheetName.Click}
            tap={() => sender.markClick()}
        >
            Click...
        </Tile>
    )
}
