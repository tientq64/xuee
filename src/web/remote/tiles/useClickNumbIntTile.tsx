import { useRemote } from '@remote/store'
import { Tile, TileColor } from '@remote/types/types'
import { useMemo } from 'preact/hooks'

export type ClickNumbIntTileCallback = (numb: number) => void

export function useClickNumbIntTile(numb: number, cb: ClickNumbIntTileCallback): Tile {
    const { clickNumbOpenInNewTab } = useRemote()

    return useMemo(() => {
        return {
            iconText: numb,
            color: clickNumbOpenInNewTab ? TileColor.Yellow : undefined,
            press: () => cb?.(numb)
        }
    }, [clickNumbOpenInNewTab, numb, cb])
}
