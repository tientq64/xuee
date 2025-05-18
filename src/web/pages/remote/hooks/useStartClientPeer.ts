import { startClientPeer } from '@remote/helpers/startClientPeer'
import { remote } from '@remote/store'
import { useEffect } from 'react'

export function useStartClientPeer(): void {
    useEffect(() => {
        startClientPeer()
        return () => {
            remote.peer?.destroy()
        }
    }, [])
}
