import { Tile } from '@remote/components/Tile'
import { SubSheetName, TileNode } from '@remote/types/types'

export function SeekToSegmentTile(): TileNode {
    return (
        <Tile icon="pace" subSheetName={SubSheetName.Seek} movedSubSheetName={SubSheetName.Seek}>
            Tua đến...
        </Tile>
    )
}
