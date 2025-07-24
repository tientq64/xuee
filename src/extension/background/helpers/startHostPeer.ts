import { backgroundFuncs, BackgroundFuncs } from '@background/constants/funcs'
import { sender } from '@background/constants/sender'
import { background } from '@background/store'
import { isValidDataPacket } from '@common/helpers/isValidDataPacket'
import { ref } from '@common/helpers/ref'
import { safeCall } from '@common/utils/safeCall'
import { remoteFuncNames } from '@remote/constants/funcNames'
import dayjs from 'dayjs'
import Peer, { DataConnection, PeerError } from 'peerjs'
import { sendTabInfoToRemote } from './sendTabInfoToRemote'
import { sendTabTotalToRemote } from './sendTabTotalToRemote'

let peer: Peer | undefined
let reconnectErrorPeerTimeoutId: number = 0

export function startHostPeer(): void {
    clearTimeout(reconnectErrorPeerTimeoutId)
    background.peerError = undefined
    if (peer !== undefined) return

    peer = new Peer(chrome.runtime.id)
    peer.on('error', handlePeerError)
    peer.on('disconnected', handlePeerDisconnected)
    peer.on('close', handlePeerClose)
    peer.on('connection', handlePeerConnection)
}

function reconnectErrorPeer(delay: number): void {
    clearTimeout(reconnectErrorPeerTimeoutId)
    if (peer !== undefined) {
        peer.removeAllListeners()
        peer.destroy()
    }
    peer = undefined
    background.conn = undefined
    reconnectErrorPeerTimeoutId = window.setTimeout(startHostPeer, delay)
}

function handlePeerError(error: PeerError<any>): void {
    console.log(1, dayjs().format('HH:mm:ss.SSS'), error.type, error)
    background.peerError = error
    reconnectErrorPeer(5000)
}

function handlePeerDisconnected(): void {
    console.log(2, dayjs().format('HH:mm:ss.SSS'))
    reconnectErrorPeer(5000)
}

function handlePeerClose(): void {
    console.log(3, dayjs().format('HH:mm:ss.SSS'))
    reconnectErrorPeer(5000)
}

function handlePeerConnection(conn: DataConnection): void {
    background.conn?.close()
    conn.on('iceStateChanged', handleConnIceStateChanged)
    conn.on('open', handleConnOpen.bind(null, conn))
    conn.on('data', handleConnData)
}

function handleConnIceStateChanged(iceState: RTCIceConnectionState): void {
    switch (iceState) {
        case 'disconnected':
            background.conn = undefined
            break
        case 'checking':
            background.conn = undefined
            break
        case 'connected':
            background.peerError = undefined
            break
    }
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
