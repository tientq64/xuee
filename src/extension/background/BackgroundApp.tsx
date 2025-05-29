import { VNode } from 'preact'
import { GistAuth } from './components/GistAuth'
import { HostPeerQRCode } from './components/HostPeerQRCode'
import { HostPeerStatus } from './components/HostPeerStatus'
import { useExposeBgTab } from './hooks/useExposeBgTab'
import { useKeepAwake } from './hooks/useKeepAwake'
import { useSetupEvents } from './hooks/useSetupEvents'
import { useSetupHostMessenger } from './hooks/useSetupHostMessenger'
import { useSetupHostPeer } from './hooks/useSetupHostPeer'
import { useSetupState } from './hooks/useSetupState'

export function BackgroundApp(): VNode {
    useSetupState()
    useKeepAwake()
    useSetupEvents()
    useSetupHostMessenger()
    useSetupHostPeer()
    useExposeBgTab()

    return (
        <div
            class="grid h-full grid-cols-2 grid-rows-2 gap-px bg-zinc-700 text-center
                [&>*]:bg-zinc-900"
        >
            <HostPeerStatus />
            <HostPeerQRCode />
            <GistAuth />
            <div />
        </div>
    )
}
