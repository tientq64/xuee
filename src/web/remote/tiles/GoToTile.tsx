import { Tile } from '@remote/components/Tile'
import { SubSheetName, TileNode } from '@remote/types/types'

export function GoToTile(): TileNode {
    return (
        <Tile icon="captive_portal" subSheetName={SubSheetName.GoTo}>
            Đến trang web...
        </Tile>
    )
}
