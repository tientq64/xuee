import { Tile } from '@remote/components/Tile'
import { remote } from '@remote/store'
import { TileNode } from '@remote/types/types'

interface ClickNumberTileProps {
    number: number
}

export function ClickNumberTile({ number }: ClickNumberTileProps): TileNode {
    return <Tile iconText={number} tap={() => (remote.clickInput += number)}></Tile>
}
