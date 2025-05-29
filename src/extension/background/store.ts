import { persist } from '@common/helpers/persist'
import { DataConnection, PeerError, PeerErrorType } from 'peerjs'
import { proxy, Snapshot, useSnapshot } from 'valtio'
import { syncAppDataToGist } from './funcs/syncAppDataToGist'
import { GistStatus, Tab } from './types/types'

export interface Background {
    currentTab: Tab | undefined
    conn: DataConnection | undefined
    peerError: PeerError<PeerErrorType> | undefined
    bgTabId: number | undefined
    gistToken: string | undefined
    gistId: string | undefined
    gistFilename: string | undefined
    gistStatus: GistStatus
    syncToGistError: unknown
    syncFromGistError: unknown
    needFirstSync: boolean
}

export const background = proxy<Background>({
    currentTab: undefined,
    conn: undefined,
    peerError: undefined,
    bgTabId: undefined,
    gistToken: undefined,
    gistId: undefined,
    gistFilename: undefined,
    gistStatus: GistStatus.Unknown,
    syncToGistError: undefined,
    syncFromGistError: undefined,
    needFirstSync: false
})

export function useBackground(): Snapshot<Background> {
    return useSnapshot(background)
}

persist(background, 'xuee:background/local', [
    'gistToken',
    'gistId',
    'gistFilename',
    'needFirstSync'
])

persist(background, 'xuee:background/sync', [], () => {
    syncAppDataToGist()
})
