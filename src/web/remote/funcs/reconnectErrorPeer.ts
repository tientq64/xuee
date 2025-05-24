import { remote } from '@remote/store'
import { reconnectPeer } from './reconnectPeer'

let delayTimeoutId: number = 0

export function reconnectErrorPeer(delay?: number): void {
    clearTimeout(delayTimeoutId)

    delayTimeoutId = window.setTimeout(() => {
        if (remote.peerError === undefined) return
        reconnectPeer()
    }, delay)
}
