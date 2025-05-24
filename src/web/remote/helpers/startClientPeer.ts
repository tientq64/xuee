import { peerId } from '@common/constants/constants'
import { isValidDataPacket } from '@common/helpers/isValidDataPacket'
import { ref } from '@common/helpers/ref'
import { safeCall } from '@common/utils/safeCall'
import { remoteFuncs, RemoteFuncs } from '@remote/constants/funcs'
import { reconnectErrorConn } from '@remote/funcs/reconnectErrorConn'
import { reconnectErrorPeer } from '@remote/funcs/reconnectErrorPeer'
import { reconnectPeer } from '@remote/funcs/reconnectPeer'
import { remote } from '@remote/store'
import Peer, { DataConnection, PeerError } from 'peerjs'

export function startClientPeer(): void {
    const peer: Peer = new Peer()
    remote.peer = ref(peer)
    peer.on('error', handlePeerError)
    peer.on('disconnected', handlePeerDisconnected)
    peer.on('open', handlePeerOpen)
}

function handlePeerError(error: PeerError<any>): void {
    remote.conn = undefined
    remote.peerError = error
    reconnectErrorPeer(2000)
}

function handlePeerDisconnected(): void {
    reconnectPeer()
}

function handlePeerOpen(): void {
    const { peer } = remote
    if (peer === undefined) return
    const conn: DataConnection = peer.connect(peerId)
    conn.on('close', handleConnClose)
    conn.on('iceStateChanged', handleConnIceStateChanged)
    conn.on('open', handleConnOpen.bind(null, conn))
    conn.on('data', handleConnData)
}

function handleConnClose(): void {
    remote.conn = undefined
    reconnectErrorConn(2000)
}

function handleConnIceStateChanged(iceState: RTCIceConnectionState): void {
    if (iceState !== 'disconnected') return
    reconnectPeer()
}

function handleConnOpen(conn: DataConnection): void {
    remote.conn = ref(conn)
    remote.peerError = undefined
}

function handleConnData(data: unknown): void {
    if (!isValidDataPacket(data)) return
    const [funcName, args] = data
    const func: Function | undefined = remoteFuncs[funcName as keyof RemoteFuncs]
    safeCall(func, ...args)
}
