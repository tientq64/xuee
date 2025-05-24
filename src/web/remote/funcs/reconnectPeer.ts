import { remote } from '@remote/store'

export function reconnectPeer(): void {
    remote.conn = undefined
    remote.peerError = undefined

    const { peer } = remote
    if (peer === undefined) return
    peer.disconnect()
    peer.reconnect()
}
