import { startClientPeer } from '@remote/helpers/startClientPeer'
import { remote, useRemote } from '@remote/store'
import { useEffect } from 'preact/hooks'

export function useStartClientPeer(): void {
    const { extensionId } = useRemote()

    useEffect(() => {
        if (extensionId === undefined) return
        startClientPeer()

        return () => {
            const { peer, conn } = remote
            if (peer !== undefined) {
                peer.disconnect()
                peer.destroy()
                remote.peer = undefined
            }
            if (conn !== undefined) {
                conn.close()
                remote.conn = undefined
            }
            remote.peerError = undefined
        }
    }, [extensionId])
}
