import { AnyFunction } from '@common/types/types'
import { reconnectPeer } from '@remote/funcs/reconnectPeer'
import { useRemote } from '@remote/store'
import { Tile, TileColor } from '@remote/types/types'
import { useNetwork } from 'ahooks'
import { MaterialSymbols } from 'material-design-icons-literal-types'
import { DataConnection, PeerError, PeerErrorType } from 'peerjs'
import { Snapshot } from 'valtio'

export function usePeerTile(): Tile {
    const { conn, peerError, site } = useRemote()
    const { effectiveType } = useNetwork()

    return getPeerTile(conn, peerError, effectiveType, 'Đang kết nối...', site.name, reconnectPeer)
}

export function getPeerTile(
    conn: Snapshot<DataConnection> | undefined,
    peerError: PeerError<PeerErrorType> | undefined,
    effectiveType: string | undefined,
    waitingText: string,
    successText: string,
    reconnect: AnyFunction | null | undefined
): Tile {
    if (peerError !== undefined) {
        switch (peerError.type) {
            case PeerErrorType.PeerUnavailable:
                return {
                    text: 'Không khả dụng',
                    icon: 'signal_wifi_bad',
                    color: TileColor.Red,
                    press: reconnect
                }

            case PeerErrorType.Network:
            case PeerErrorType.ServerError:
                return {
                    text: 'Lỗi mạng',
                    icon: 'signal_wifi_bad',
                    color: TileColor.Red,
                    press: reconnect
                }

            case PeerErrorType.Disconnected:
                return {
                    text: 'Mất kết nối',
                    icon: 'perm_scan_wifi',
                    color: TileColor.Red,
                    press: reconnect
                }

            case PeerErrorType.UnavailableID:
                return {
                    text: 'Server đã tồn tại',
                    icon: 'wifi_lock',
                    color: TileColor.Red,
                    press: reconnect
                }

            case PeerErrorType.BrowserIncompatible:
                return {
                    text: 'Không hỗ trợ',
                    icon: 'signal_wifi_off',
                    color: TileColor.Red,
                    press: reconnect
                }

            default:
                return {
                    text: peerError.type,
                    icon: 'signal_wifi_statusbar_not_connected',
                    color: TileColor.Red,
                    press: reconnect
                }
        }
    }

    if (conn !== undefined) {
        return {
            text: successText,
            icon: networkEffectiveIconNames[effectiveType ?? '4g'],
            color: TileColor.Green,
            press: reconnect
        }
    }

    return {
        text: waitingText,
        icon: 'data_usage',
        color: TileColor.Gray,
        spin: true
    }
}

const networkEffectiveIconNames: Record<string, MaterialSymbols> = {
    'slow-2g': 'network_wifi_2_bar',
    '2g': 'network_wifi_3_bar',
    '3g': 'network_wifi',
    '4g': 'signal_wifi_4_bar'
}
