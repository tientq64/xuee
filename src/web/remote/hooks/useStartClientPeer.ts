import { startClientPeer } from '@remote/helpers/startClientPeer'
import { remote } from '@remote/store'
import { useEffect } from 'preact/hooks'

export function useStartClientPeer(): void {
    useEffect(() => {
        startClientPeer()

        return () => {
            remote.peer?.destroy()
        }
    }, [])
}
