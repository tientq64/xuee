import { ScrollAmount } from '@common/constants/constants'
import { sender } from '@remote/constants/sender'
import { resetClickNumb } from '@remote/helpers/resetClickNumb'
import { useSubSheetEffect } from '@remote/hooks/useSubSheetEffect'
import { remote, useRemote } from '@remote/store'
import { Sheet, SubSheetName } from '@remote/types/types'
import { useClickNumbIntTile } from '@tiles/useClickNumbIntTile'
import { useClickNumbTile } from '@tiles/useClickNumbTile'
import { useClickNumbViewTile } from '@tiles/useClickNumbViewTile'
import { useScrollTile } from '@tiles/useScrollTile'

export function useClickSubSheet(): Sheet {
    const { clickNumbOpenInNewTab } = useRemote()

    useSubSheetEffect(() => {
        return () => {
            resetClickNumb()
        }
    }, SubSheetName.Click)

    return {
        '21': [useClickNumbViewTile(handleTilePress)],
        '30': [useClickNumbIntTile(7, handleTilePress)],
        '31': [useClickNumbIntTile(8, handleTilePress)],
        '32': [useClickNumbIntTile(9, handleTilePress)],
        '40': [useClickNumbIntTile(4, handleTilePress)],
        '41': [useClickNumbIntTile(5, handleTilePress)],
        '42': [useClickNumbIntTile(6, handleTilePress)],
        '50': [useClickNumbIntTile(1, handleTilePress)],
        '51': [useClickNumbIntTile(2, handleTilePress)],
        '52': [useClickNumbIntTile(3, handleTilePress)],
        '60': [useClickNumbTile(clickNumbOpenInNewTab)],
        '61': [useClickNumbIntTile(0, handleTilePress)],
        '70': [useScrollTile(-ScrollAmount.Base), useScrollTile(-ScrollAmount.Max)],
        '80': [useScrollTile(ScrollAmount.Base), useScrollTile(ScrollAmount.Max)]
    }
}

function handleTilePress(numb?: number): void {
    const { clickNumbTimeoutId } = remote
    clearTimeout(clickNumbTimeoutId)
    if (numb !== undefined && Number.isFinite(numb)) {
        remote.clickNumbInput += numb
    }
    remote.clickNumbTimeoutId = window.setTimeout(submitClickNumb, 1000)
}

function submitClickNumb(): void {
    const { clickNumbInput, clickNumbOpenInNewTab } = remote
    if (clickNumbInput === '') return
    sender.clickNumb(clickNumbInput, clickNumbOpenInNewTab)
    resetClickNumb()
    remote.subSheetName = undefined
}
