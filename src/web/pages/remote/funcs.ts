import { receiveSiteUrl } from './funcs/receiveSiteUrl'
import { reconnectErrorPeer } from './funcs/reconnectErrorPeer'
import { reconnectPeer } from './funcs/reconnectPeer'
import { vibrate } from './funcs/vibrate'
export const remoteFuncs = { receiveSiteUrl, reconnectErrorPeer, reconnectPeer, vibrate }
export const remoteFuncNames = ['receiveSiteUrl', 'reconnectErrorPeer', 'reconnectPeer', 'vibrate']
export type RemoteFuncs = typeof remoteFuncs
