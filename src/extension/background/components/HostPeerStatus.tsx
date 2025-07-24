import { startHostPeer } from '@background/helpers/startHostPeer'
import { useBackground } from '@background/store'
import { Icon } from '@common/components/Icon'
import { TileProps } from '@remote/components/Tile'
import { getPeerTileProps } from '@tiles/PeerTile'
import { useNetwork } from 'ahooks'
import clsx from 'clsx'
import { VNode } from 'preact'
import { useMemo } from 'preact/hooks'

export function HostPeerStatus(): VNode {
    const { conn, peerError } = useBackground()
    const { effectiveType } = useNetwork()

    const peerTileProps = useMemo<TileProps>(() => {
        return getPeerTileProps(
            conn,
            peerError,
            chrome.runtime.id,
            effectiveType,
            'Chờ kết nối từ điện thoại...',
            'Đã kết nối với điện thoại',
            startHostPeer
        )
    }, [conn, peerError, effectiveType])

    return (
        <div class="flex flex-col items-center justify-center gap-3">
            <Icon
                className={clsx(
                    peerTileProps.color,
                    peerTileProps.spinning && 'animate-pending -scale-x-100'
                )}
                name={peerTileProps.icon}
                size={40}
            />
            {peerTileProps.children}
        </div>
    )
}
