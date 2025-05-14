import { DataConnection } from 'peerjs'
import { proxy } from 'valtio'
import { Tab } from './types/types'

export interface Background {
    currentTab: Tab
    conn: DataConnection | undefined
}

export const background = proxy<Background>({
    currentTab: {} as Tab,
    conn: undefined
})
