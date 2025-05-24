import { remote } from '@remote/store'
import { reconnectPeer } from './reconnectPeer'

let delayTimeoutId: number = 0

export function reconnectErrorConn(delay?: number): void {
    clearTimeout(delayTimeoutId)

    delayTimeoutId = window.setTimeout(() => {
        if (remote.conn !== undefined) return
        reconnectPeer()
    }, delay)
}
