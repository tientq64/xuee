import { tileCols, tileRows } from '@remote/constants/constants'
import { handleRemoteTouchEnd } from '@remote/helpers/handleRemoteTouchEnd'
import { handleRemoteTouchMove } from '@remote/helpers/handleRemoteTouchMove'
import { useClickNumb } from '@remote/hooks/useClickNumb'
import { useEnsureFullscreen } from '@remote/hooks/useEnsureFullscreen'
import { useGenerateSheetId } from '@remote/hooks/useGenerateSheetId'
import { usePreventContextMenu } from '@remote/hooks/usePreventContextMenu'
import { useStartClientPeer } from '@remote/hooks/useStartClientPeer'
import { useTilesets } from '@remote/hooks/useTilesets'
import { useRemote } from '@remote/store'
import { Tileset } from '@remote/types/types'
import { VNode } from 'preact'
import { QRCodeScanner } from './QRCodeScanner'
import { TilesetTag } from './TilesetTag'

export function RemotePage(): VNode {
    const { tapByHover } = useRemote()
    const tilesets: Tileset[] = useTilesets()

    useGenerateSheetId()
    useEnsureFullscreen()
    usePreventContextMenu()
    useStartClientPeer()
    useClickNumb()

    return (
        <div
            className="h-full overflow-hidden select-none"
            onTouchMove={tapByHover ? handleRemoteTouchMove : undefined}
            onTouchEnd={tapByHover ? handleRemoteTouchEnd : undefined}
        >
            <div
                className="grid h-full gap-[3px] bg-radial from-zinc-700 from-30% to-zinc-900 to-75%
                    p-1"
                style={{
                    gridTemplateColumns: `repeat(${tileCols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${tileRows}, minmax(0, 1fr))`
                }}
            >
                {tilesets.map((tileset, index) => (
                    <TilesetTag key={index} tileset={tileset} index={index} />
                ))}
            </div>

            <QRCodeScanner />
        </div>
    )
}
