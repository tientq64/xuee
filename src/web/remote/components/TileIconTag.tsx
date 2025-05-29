import { Icon } from '@common/components/Icon'
import { Tile } from '@remote/types/types'
import clsx from 'clsx'
import { VNode } from 'preact'

interface TileIconTagProps {
    tile: Tile
    isSubTile?: boolean
}

export function TileIconTag({ tile, isSubTile = false }: TileIconTagProps): VNode | null {
    const isEmpty: boolean = tile.icon === undefined && tile.iconText === undefined
    const size: number = isSubTile ? 24 : 32

    if (isEmpty) return null

    return (
        <div className="flex min-h-9 items-center justify-center">
            {tile.icon !== undefined && (
                <Icon
                    className={clsx(tile.className, tile.spin && 'animate-spin')}
                    source={tile.icon}
                    size={size}
                />
            )}
            {tile.iconText !== undefined && <div className="text-3xl">{tile.iconText}</div>}
        </div>
    )
}
