import { ReactElement, useEffect } from 'react'
import { TileTag } from './components/TileTag'
import { tileCols, tileRows } from './constants/constants'
import { startClientPeer } from './helpers/startClientPeer'
import { useEnsureFullscreen } from './hooks/useEnsureFullscreen'
import { usePreventContextMenu } from './hooks/usePreventContextMenu'
import { useTilesets } from './hooks/useTilesets'

export function RemotePage(): ReactElement {
    const tilesets = useTilesets()

    useEnsureFullscreen()
    usePreventContextMenu()

    useEffect(() => {
        startClientPeer()
    }, [])

    return (
        <div className="h-full select-none">
            <div
                className="grid h-full gap-[3px] bg-radial from-zinc-700 from-30% to-zinc-900 to-75%
                    p-1"
                style={{
                    gridTemplateColumns: `repeat(${tileCols}, 1fr)`,
                    gridTemplateRows: `repeat(${tileRows}, 1fr)`
                }}
            >
                {tilesets.map((tileset, index) => (
                    <TileTag key={index} tileset={tileset} index={index} />
                ))}
            </div>
        </div>
    )
}
