import Peer, { DataConnection } from 'peerjs'
import { ref } from 'valtio'
import { peerId } from '../../../common/constants/constants'
import { isValidDataPacket } from '../../../common/helpers/isValidDataPacket'
import { remoteFuncNames } from '../../../web/pages/remote/funcs'
import { sender } from '../constants/sender'
import { BackgroundFuncs, backgroundFuncs } from '../funcs'
import { background } from '../store'

export function startHostPeer(): void {
    const peer: Peer = new Peer(peerId)
    peer.on('connection', handlePeerConnection)
    peer.on('error', handlePeerError)
    peer.on('disconnected', handlePeerDisconnected)
}

function handlePeerConnection(conn: DataConnection): void {
    conn.on('open', () => handleConnOpen(conn))
    conn.on('data', handleConnData)
}

function handlePeerError(): void {
    setTimeout(startHostPeer, 5000)
}

function handlePeerDisconnected(): void {
    setTimeout(startHostPeer, 5000)
}

function handleConnOpen(conn: DataConnection): void {
    background.conn = ref(conn)
    sender.receiveSiteUrl(background.currentTab?.url ?? '')
}

function handleConnData(data: unknown): void {
    if (!isValidDataPacket(data)) return
    const [funcName, args] = data
    if (remoteFuncNames.includes(funcName)) return
    const func: Function | undefined =
        backgroundFuncs[funcName as keyof BackgroundFuncs] ?? sender[funcName as keyof {}]
    func?.(...args)
}
