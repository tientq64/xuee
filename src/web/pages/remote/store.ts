import { DataConnection } from 'peerjs'
import { proxy, useSnapshot } from 'valtio'
import { SiteName } from '../../../common/types/types'
import { PeerError } from './types/types'

export interface Remote {
    siteName: SiteName
    conn: DataConnection | undefined
    peerError: PeerError | undefined
}

export const remote = proxy<Remote>({
    siteName: SiteName.Other,
    conn: undefined,
    peerError: undefined
})

export function useRemote() {
    return useSnapshot(remote)
}
