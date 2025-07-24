import { Site, otherSite } from '@common/constants/sites'
import { persist } from '@common/helpers/persist'
import Peer, { DataConnection, PeerError, PeerErrorType } from 'peerjs'
import { Snapshot, proxy, useSnapshot } from 'valtio'
import { SubSheetName } from './types/types'

export interface Remote {
    site: Site
    peer: Peer | undefined
    conn: DataConnection | undefined
    peerError: PeerError<PeerErrorType> | undefined
    subSheetName: SubSheetName | undefined
    siteId: string | undefined
    sheetId: string | undefined
    extensionId: string | undefined
    clickInput: string
    clickOpenInNewTab: boolean
    clickTimerId: number
    tabTotal: number
    tabIndex: number
    tabId: number | undefined
    qrcodeScanResolve: Function | undefined
    tapByHover: boolean
    hoveringTilesetIndex: number
    hoverTapped: boolean
    slowMode: boolean
}

export const remote = proxy<Remote>({
    site: otherSite,
    peer: undefined,
    conn: undefined,
    peerError: undefined,
    subSheetName: undefined,
    siteId: undefined,
    sheetId: undefined,
    extensionId: undefined,
    clickInput: '',
    clickOpenInNewTab: false,
    clickTimerId: 0,
    tabTotal: 0,
    tabIndex: -1,
    tabId: undefined,
    qrcodeScanResolve: undefined,
    tapByHover: false,
    hoveringTilesetIndex: -1,
    hoverTapped: false,
    slowMode: false
})

export function useRemote(): Snapshot<Remote> {
    return useSnapshot(remote)
}

persist(remote, 'xuee:remote/local', ['extensionId'])
