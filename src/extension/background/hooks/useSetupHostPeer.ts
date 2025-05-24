import { startHostPeer } from '@background/helpers/startHostPeer'
import { useBackground } from '@background/store'
import { useEffect } from 'preact/hooks'

export function useSetupHostPeer(): void {
    const { conn } = useBackground()

    useEffect(() => {
        startHostPeer()
    }, [])

    useEffect(() => {
        if (conn === undefined) return
        return () => {
            conn.removeAllListeners()
        }
    }, [conn])
}
