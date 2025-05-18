import { Site, otherSite } from '@common/constants/sites'
import Peer, { DataConnection, PeerError, PeerErrorType } from 'peerjs'
import { proxy, subscribe, useSnapshot } from 'valtio'
import { SubSheetName } from './types/types'

export interface Remote {
    site: Site
    peer: Peer | undefined
    conn: DataConnection | undefined
    peerError: PeerError<PeerErrorType> | undefined
    subSheetName: SubSheetName | undefined
    siteId: string | undefined
    sheetId: string | undefined
    clickNumbInput: string
    clickNumbOpenInNewTab: boolean
    clickNumbTimeoutId: number
    tabTotal: number
    tabIndex: number
    tabId: number | undefined
}

export const remote = proxy<Remote>({
    site: otherSite,
    peer: undefined,
    conn: undefined,
    peerError: undefined,
    subSheetName: undefined,
    siteId: undefined,
    sheetId: undefined,
    clickNumbInput: '',
    clickNumbOpenInNewTab: false,
    clickNumbTimeoutId: 0,
    tabTotal: 0,
    tabIndex: -1,
    tabId: undefined
})

export function useRemote() {
    return useSnapshot(remote)
}

subscribe(remote, () => {
    const { siteId, subSheetName } = remote

    const sheetId: string = `${siteId}/${subSheetName}`

    if (sheetId !== remote.sheetId) {
        remote.sheetId = sheetId
    }
})
