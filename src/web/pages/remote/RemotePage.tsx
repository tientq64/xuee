import { ReactNode, useEffect } from 'react'
import { startClientPeer } from './helpers/startClientPeer'

export function RemotePage(): ReactNode {
    useEffect(startClientPeer, [])

    return <div className="h-full">remote</div>
}
