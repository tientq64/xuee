import { resetClickNumb } from '@remote/helpers/resetClickNumb'
import { useRemote } from '@remote/store'
import { Tile, TileColor } from '@remote/types/types'
import { useCallback, useMemo } from 'preact/hooks'

export function useClickNumbViewTile(cb: VoidFunction): Tile {
    const { clickNumbInput, clickNumbOpenInNewTab } = useRemote()

    const press = useCallback((): void => {
        resetClickNumb()
        cb()
    }, [cb])

    return useMemo(() => {
        return {
            text: 'Số đang nhập, nhấn để reset',
            iconText: clickNumbInput,
            color: clickNumbOpenInNewTab ? TileColor.Yellow : undefined,
            press
        }
    }, [clickNumbInput, clickNumbOpenInNewTab, press])
}
