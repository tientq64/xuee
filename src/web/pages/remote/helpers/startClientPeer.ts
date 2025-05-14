import Peer, { DataConnection } from 'peerjs'
import { ref } from 'valtio'
import { peerId } from '../../../../common/constants/constants'
import { isValidDataPacket } from '../../../../common/helpers/isValidDataPacket'
import { RemoteFuncs, remoteFuncs } from '../funcs'
import { reconnectErrorPeer } from '../funcs/reconnectErrorPeer'
import { remote } from '../store'
import { PeerError } from '../types/types'

export function startClientPeer(): void {
    const peer: Peer = new Peer()
    peer.on('open', () => handlePeerOpen(peer))
    peer.on('error', handlePeerError)
    peer.on('disconnected', handlePeerDisconnected)
}

function handlePeerOpen(peer: Peer): void {
    const conn: DataConnection = peer.connect(peerId)
    conn.on('open', () => handleConnOpen(conn))
    conn.on('data', handleConnData)
    conn.on('close', handleConnClose)
    conn.on('iceStateChanged', handleConnIceStateChanged)
}

function handlePeerError(error: PeerError): void {
    remote.conn = undefined
    remote.peerError = error
    reconnectErrorPeer(2000)
}

function handlePeerDisconnected(): void {
    startClientPeer()
}

function handleConnOpen(conn: DataConnection): void {
    remote.conn = ref(conn)
    remote.peerError = undefined
}

function handleConnData(data: unknown): void {
    if (!isValidDataPacket(data)) return
    const [funcName, args] = data
    const func: Function | undefined = remoteFuncs[funcName as keyof RemoteFuncs]
    func?.(...args)
}

function handleConnClose(): void {
    startClientPeer()
}

function handleConnIceStateChanged(iceState: RTCIceConnectionState): void {
    if (iceState !== 'disconnected') return
    startClientPeer()
}
