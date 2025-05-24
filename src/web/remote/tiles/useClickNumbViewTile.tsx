import { resetClickNumb } from '@remote/helpers/resetClickNumb'
import { useRemote } from '@remote/store'
import { Tile, TileColor } from '@remote/types/types'

export function useClickNumbViewTile(cb: VoidFunction): Tile {
    const { clickNumbInput, clickNumbOpenInNewTab } = useRemote()

    const press = (): void => {
        resetClickNumb()
        cb()
    }

    return {
        text: 'Số đang nhập, nhấn để reset',
        iconText: clickNumbInput,
        color: clickNumbOpenInNewTab ? TileColor.Yellow : undefined,
        press
    }
}
