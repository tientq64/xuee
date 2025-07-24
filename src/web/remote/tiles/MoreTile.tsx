import { Tile } from '@remote/components/Tile'
import { useRemote } from '@remote/store'
import { SubSheetName, TileNode } from '@remote/types/types'

export function MoreTile(): TileNode {
    const { subSheetName } = useRemote()

    const isOpen: boolean = subSheetName === SubSheetName.More

    return (
        <Tile
            icon="more"
            iconClassName={isOpen ? undefined : 'rotate-180'}
            subSheetName={SubSheetName.More}
            movedSubSheetName={SubSheetName.More}
        >
            Thêm...
        </Tile>
    )
}
