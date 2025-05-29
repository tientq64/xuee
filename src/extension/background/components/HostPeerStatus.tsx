import { startHostPeer } from '@background/helpers/startHostPeer'
import { useBackground } from '@background/store'
import { Icon } from '@common/components/Icon'
import { Tile } from '@remote/types/types'
import { getPeerTile } from '@tiles/usePeerTile'
import { useNetwork } from 'ahooks'
import clsx from 'clsx'
import { VNode } from 'preact'
import { useMemo } from 'preact/hooks'

export function HostPeerStatus(): VNode {
    const { conn, peerError } = useBackground()
    const { effectiveType } = useNetwork()

    const tile = useMemo<Tile>(() => {
        return getPeerTile(
            conn,
            peerError,
            effectiveType,
            'Chờ kết nối từ điện thoại...',
            'Đã kết nối với điện thoại',
            startHostPeer
        )
    }, [conn, peerError, effectiveType])

    return (
        <div class="flex flex-col items-center justify-center gap-3">
            <Icon
                className={clsx(tile.color, tile.spin && 'animate-pending -scale-x-100')}
                name={tile.icon}
                size={40}
            />
            {tile.text}
        </div>
    )
}
