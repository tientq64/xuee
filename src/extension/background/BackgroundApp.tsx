import { clsm } from '@common/utils/clsm'
import { Tile } from '@remote/types/types'
import { getPeerTile } from '@tiles/usePeerTile'
import { Icon } from '@web/components/Icon'
import { useNetwork } from 'ahooks'
import { VNode } from 'preact'
import { startHostPeer } from './helpers/startHostPeer'
import { useExposeBgTab } from './hooks/useExposeBgTab'
import { useKeepAwake } from './hooks/useKeepAwake'
import { useSetupEvents } from './hooks/useSetupEvents'
import { useSetupHostMessenger } from './hooks/useSetupHostMessenger'
import { useSetupHostPeer } from './hooks/useSetupHostPeer'
import { useSetupState } from './hooks/useSetupState'
import { useBackground } from './store'

export function BackgroundApp(): VNode {
    const { conn, peerError } = useBackground()
    const { effectiveType } = useNetwork()

    const tile: Tile = getPeerTile(
        conn,
        peerError,
        effectiveType,
        'Chờ kết nối từ điều khiển...',
        'Đã kết nối với điều khiển',
        startHostPeer
    )

    useSetupState()
    useKeepAwake()
    useSetupEvents()
    useSetupHostMessenger()
    useSetupHostPeer()
    useExposeBgTab()

    return (
        <div class="flex h-full flex-col items-center justify-center gap-3">
            <Icon
                className={clsm(tile.color, tile.spin && 'animate-pending -scale-x-100')}
                name={tile.icon}
                size={40}
            />
            {tile.text}
        </div>
    )
}
