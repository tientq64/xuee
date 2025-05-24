import { useRemote } from '@remote/store'
import { Tile, TileColor } from '@remote/types/types'

export function useClickNumbIntTile(numb: number, cb: (numb: number) => void): Tile {
    const { clickNumbOpenInNewTab } = useRemote()

    return {
        iconText: numb,
        color: clickNumbOpenInNewTab ? TileColor.Yellow : undefined,
        press: () => cb?.(numb)
    }
}
