import { startClientPeer } from '../helpers/startClientPeer'
import { remote } from '../store'

export function reconnectPeer(): void {
    remote.conn = undefined
    remote.peerError = undefined
    startClientPeer()
}
