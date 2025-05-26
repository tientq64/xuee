import { sender } from '@remote/constants/sender'
import { remote, useRemote } from '@remote/store'
import { SubSheetName, Tile, TileColor } from '@remote/types/types'
import { useMemo } from 'preact/hooks'

export function useClickNumbTile(openInNewTab: boolean = false): Tile {
    const { subSheetName } = useRemote()

    return useMemo(() => {
        const isOpen: boolean = subSheetName === SubSheetName.Click

        const pressWhenNotOpen = (): void => {
            remote.clickNumbOpenInNewTab = openInNewTab
            sender.markClick()
        }

        return {
            text: openInNewTab ? 'Click mở trong tab mới...' : 'Click...',
            icon: openInNewTab ? 'open_in_new' : 'web_traffic',
            color: openInNewTab ? TileColor.Yellow : undefined,
            className: 'scale-115',
            subSheetName: SubSheetName.Click,
            press: isOpen ? undefined : pressWhenNotOpen
        }
    }, [subSheetName, openInNewTab])
}
