import { receiveTabInfo } from './funcs/receiveTabInfo'
import { receiveTabTotal } from './funcs/receiveTabTotal'
import { reconnectErrorPeer } from './funcs/reconnectErrorPeer'
import { reconnectPeer } from './funcs/reconnectPeer'
import { vibrate } from './funcs/vibrate'
export const remoteFuncs = {
    receiveTabInfo,
    receiveTabTotal,
    reconnectErrorPeer,
    reconnectPeer,
    vibrate
}
export const remoteFuncNames = [
    'receiveTabInfo',
    'receiveTabTotal',
    'reconnectErrorPeer',
    'reconnectPeer',
    'vibrate'
]
export type RemoteFuncs = typeof remoteFuncs
