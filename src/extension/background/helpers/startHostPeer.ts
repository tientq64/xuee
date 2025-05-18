import { sender } from '@background/constants/sender'
import { backgroundFuncs, BackgroundFuncs } from '@background/funcs'
import { background } from '@background/store'
import { peerId } from '@common/constants/constants'
import { isValidDataPacket } from '@common/helpers/isValidDataPacket'
import { ref } from '@common/helpers/ref'
import { safeCall } from '@common/utils/safeCall'
import { remoteFuncNames } from '@remote/funcs'
import dayjs from 'dayjs'
import Peer, { DataConnection, PeerError } from 'peerjs'
import { sendTabInfoToRemote } from './sendTabInfoToRemote'
import { sendTabTotalToRemote } from './sendTabTotalToRemote'

let peer: Peer | undefined
let reconnectErrorPeerTimeoutId: number = 0

export function startHostPeer(): void {
    if (peer !== undefined) return
    peer = new Peer(peerId)
    peer.on('error', handlePeerError)
    peer.on('disconnected', handlePeerDisconnected)
    peer.on('connection', handlePeerConnection)
    peer.on('close', handlePeerClose)
}

function reconnectErrorPeer(delay: number): void {
    peer?.destroy()
    peer = undefined
    clearTimeout(reconnectErrorPeerTimeoutId)
    reconnectErrorPeerTimeoutId = setTimeout(startHostPeer, delay)
}

function handlePeerError(error: PeerError<any>): void {
    console.log(1, dayjs().format('HH:mm:ss.SSS'), error.type, error)
    reconnectErrorPeer(5000)
}

function handlePeerDisconnected(): void {
    console.log(2, dayjs().format('HH:mm:ss.SSS'))
    reconnectErrorPeer(5000)
}

function handlePeerConnection(conn: DataConnection): void {
    conn.on('open', handleConnOpen.bind(null, conn))
    conn.on('data', handleConnData)
}

function handlePeerClose(): void {
    console.log(3, dayjs().format('HH:mm:ss.SSS'))
    reconnectErrorPeer(5000)
}

async function handleConnOpen(conn: DataConnection): Promise<void> {
    background.conn = ref(conn)
    sendTabInfoToRemote(background.currentTab)
    sendTabTotalToRemote()
}

function handleConnData(data: unknown): void {
    if (!isValidDataPacket(data)) return

    const [funcName, args] = data
    if (remoteFuncNames.includes(funcName)) return

    let func: Function | undefined
    func = backgroundFuncs[funcName as keyof BackgroundFuncs]
    func ??= sender[funcName as keyof {}]
    safeCall(func, ...args)
}
