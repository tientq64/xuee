import { clickTime } from '@remote/constants/constants'
import { sender } from '@remote/constants/sender'
import { remote, useRemote } from '@remote/store'
import { SubSheetName } from '@remote/types/types'
import { useEffect } from 'preact/hooks'
import { useSubSheetEffect } from './useSubSheetEffect'

export function useClickNumb(): void {
    const { clickInput, clickOpenInNewTab } = useRemote()

    useEffect(() => {
        if (clickInput === '') return

        remote.clickTimerId = window.setTimeout(() => {
            sender.clickNumb(clickInput, clickOpenInNewTab)
            remote.subSheetName = undefined
        }, clickTime)

        return () => {
            window.clearTimeout(remote.clickTimerId)
        }
    }, [clickInput, clickOpenInNewTab])

    useSubSheetEffect(() => {
        return () => {
            remote.clickInput = ''
            remote.clickOpenInNewTab = false
        }
    }, SubSheetName.Click)
}
