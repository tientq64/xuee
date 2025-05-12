import { DataConnection } from 'peerjs'
import { proxy } from 'valtio'
import { Tab } from './types/types'

export interface Background {
    conn: DataConnection | undefined
    currentTab: Tab | undefined
}

export const background = proxy<Background>({
    conn: undefined,
    currentTab: undefined
})
