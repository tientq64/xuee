import { AnyFunction } from '@common/types/types'
import { Tile, TileProps } from '@remote/components/Tile'
import { reconnectPeer } from '@remote/funcs/reconnectPeer'
import { scanExtensionQRCode } from '@remote/funcs/scanExtensionQRCode'
import { useRemote } from '@remote/store'
import { TileColor, TileNode } from '@remote/types/types'
import { useNetwork } from 'ahooks'
import { MaterialSymbols } from 'material-design-icons-literal-types'
import { DataConnection, PeerError, PeerErrorType } from 'peerjs'
import { useMemo } from 'preact/hooks'
import { Snapshot } from 'valtio'

export function PeerTile(): TileNode {
    const { conn, peerError, extensionId, site } = useRemote()
    const { effectiveType } = useNetwork()

    const peerTileProps = useMemo<TileProps>(() => {
        return getPeerTileProps(
            conn,
            peerError,
            extensionId,
            effectiveType,
            'Đang kết nối...',
            site.text,
            reconnectPeer
        )
    }, [conn, peerError, extensionId, effectiveType, site.text])

    return <Tile {...peerTileProps} />
}

export function getPeerTileProps(
    conn: Snapshot<DataConnection> | undefined,
    peerError: PeerError<PeerErrorType> | undefined,
    extensionId: string | undefined,
    effectiveType: string | undefined,
    waitingText: string,
    successText: string,
    reconnect: AnyFunction | undefined
): TileProps {
    if (extensionId === undefined) {
        return {
            children: 'Quét QR kết nối...',
            icon: 'qr_code',
            tap: scanExtensionQRCode
        }
    }

    if (peerError !== undefined) {
        switch (peerError.type) {
            case PeerErrorType.PeerUnavailable:
                return {
                    children: 'Không khả dụng',
                    icon: 'signal_wifi_bad',
                    color: TileColor.Red,
                    tap: reconnect
                }

            case PeerErrorType.Network:
            case PeerErrorType.ServerError:
                return {
                    children: 'Lỗi mạng',
                    icon: 'signal_wifi_bad',
                    color: TileColor.Red,
                    tap: reconnect
                }

            case PeerErrorType.Disconnected:
                return {
                    children: 'Mất kết nối',
                    icon: 'perm_scan_wifi',
                    color: TileColor.Red,
                    tap: reconnect
                }

            case PeerErrorType.UnavailableID:
                return {
                    children: 'Server đã tồn tại',
                    icon: 'wifi_lock',
                    color: TileColor.Red,
                    tap: reconnect
                }

            case PeerErrorType.BrowserIncompatible:
                return {
                    children: 'Không hỗ trợ',
                    icon: 'signal_wifi_off',
                    color: TileColor.Red,
                    tap: reconnect
                }

            default:
                return {
                    children: peerError.type,
                    icon: 'signal_wifi_statusbar_not_connected',
                    color: TileColor.Red,
                    tap: reconnect
                }
        }
    }

    if (conn !== undefined) {
        return {
            children: successText,
            icon: networkEffectiveIconNames[effectiveType ?? '4g'],
            color: TileColor.Green,
            tap: reconnect
        }
    }

    return {
        children: waitingText,
        icon: 'data_usage',
        color: TileColor.Gray,
        spinning: true
    }
}

const networkEffectiveIconNames: Record<string, MaterialSymbols> = {
    'slow-2g': 'network_wifi_2_bar',
    '2g': 'network_wifi_3_bar',
    '3g': 'network_wifi',
    '4g': 'signal_wifi_4_bar'
}
