import Peer, { DataConnection } from 'peerjs'
import { ref } from 'valtio'
import { peerId } from '../../../../common/constants/constants'
import { sender } from '../constants/sender'
import { remote } from '../store'

export function startClientPeer(): void {
    const peer: Peer = new Peer()
    peer.on('open', () => handlePeerOpen(peer))
}

function handlePeerOpen(peer: Peer): void {
    const conn: DataConnection = peer.connect(peerId)
    conn.on('open', () => handleConnOpen(conn))
}

function handleConnOpen(conn: DataConnection): void {
    remote.conn = ref(conn)
    sender.reload()
}
