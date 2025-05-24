import { DataConnection, PeerError, PeerErrorType } from 'peerjs'
import { proxy, Snapshot, useSnapshot } from 'valtio'
import { Tab } from './types/types'

export interface Background {
    currentTab: Tab | undefined
    conn: DataConnection | undefined
    peerError: PeerError<PeerErrorType> | undefined
    bgTabId: number | undefined
}

export const background = proxy<Background>({
    currentTab: undefined,
    conn: undefined,
    peerError: undefined,
    bgTabId: undefined
})

export function useBackground(): Snapshot<Background> {
    return useSnapshot(background)
}
