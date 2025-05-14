import { remote } from '../store'
import { reconnectPeer } from './reconnectPeer'

let delayTimeoutId: number = 0

export function reconnectErrorPeer(delay?: number): void {
    clearTimeout(delayTimeoutId)

    delayTimeoutId = setTimeout(() => {
        if (remote.peerError === undefined) return
        reconnectPeer()
    }, delay)
}
