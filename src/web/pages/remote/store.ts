import { DataConnection } from 'peerjs'
import { proxy } from 'valtio'
import { SiteName } from '../../../common/types/types'
import { Sheet } from './types/types'

export interface Remote {
    siteName: string
    currentSheet: Sheet | undefined
    conn: DataConnection | undefined
}

export const remote = proxy<Remote>({
    siteName: SiteName.Other,
    currentSheet: undefined,
    conn: undefined
})
