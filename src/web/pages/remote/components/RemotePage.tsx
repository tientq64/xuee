import { tileCols, tileRows } from '@remote/constants/constants'
import { useEnsureFullscreen } from '@remote/hooks/useEnsureFullscreen'
import { usePreventContextMenu } from '@remote/hooks/usePreventContextMenu'
import { useStartClientPeer } from '@remote/hooks/useStartClientPeer'
import { useTilesets } from '@remote/hooks/useTilesets'
import { Tileset } from '@remote/types/types'
import { ReactElement } from 'react'
import { TileTag } from './TileTag'

export function RemotePage(): ReactElement {
    const tilesets: Tileset[] = useTilesets()

    useEnsureFullscreen()
    usePreventContextMenu()
    useStartClientPeer()

    return (
        <div className="h-full overflow-hidden select-none">
            <div
                className="grid h-full gap-[3px] bg-radial from-zinc-700 from-30% to-zinc-900 to-75%
                    p-1"
                style={{
                    gridTemplateColumns: `repeat(${tileCols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${tileRows}, minmax(0, 1fr))`
                }}
            >
                {tilesets.map((tileset, index) => (
                    <TileTag key={index} tileset={tileset} index={index} />
                ))}
            </div>
        </div>
    )
}
