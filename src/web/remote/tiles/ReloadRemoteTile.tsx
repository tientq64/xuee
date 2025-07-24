import { Tile } from '@remote/components/Tile'
import { TileNode } from '@remote/types/types'

export function ReloadRemoteTile(): TileNode {
    return (
        <Tile icon="mfg_nest_yale_lock" tap={() => location.reload()}>
            Tải lại điều khiển
        </Tile>
    )
}
