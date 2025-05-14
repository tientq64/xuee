import { useNetwork } from 'ahooks'
import { MaterialSymbols } from 'material-design-icons-literal-types'
import { PeerErrorType } from 'peerjs'
import { upperFirst } from '../../../../common/utils/upperFirst'
import { reconnectPeer } from '../funcs/reconnectPeer'
import { useRemote } from '../store'
import { Tile, TileColor } from '../types/types'

export function usePeerTile(): Tile {
    const { conn, peerError, siteName } = useRemote()
    const { effectiveType } = useNetwork()

    if (peerError !== undefined) {
        switch (peerError.type) {
            case PeerErrorType.PeerUnavailable:
                return {
                    text: 'Không khả dụng',
                    icon: 'signal_wifi_bad',
                    color: TileColor.Red,
                    press: reconnectPeer
                }

            case PeerErrorType.Network:
            case PeerErrorType.ServerError:
                return {
                    text: 'Lỗi mạng',
                    icon: 'signal_wifi_bad',
                    color: TileColor.Red,
                    press: reconnectPeer
                }

            case PeerErrorType.Disconnected:
                return {
                    text: 'Mất kết nối',
                    icon: 'perm_scan_wifi',
                    color: TileColor.Red,
                    press: reconnectPeer
                }

            default:
                return {
                    text: peerError.type,
                    icon: 'signal_wifi_statusbar_not_connected',
                    color: TileColor.Red,
                    press: reconnectPeer
                }
        }
    }

    if (conn !== undefined) {
        return {
            text: upperFirst(siteName),
            icon: networkEffectiveIconNames[effectiveType ?? '4g'],
            color: TileColor.Green,
            press: reconnectPeer
        }
    }

    return {
        text: 'Đang kết nối...',
        icon: 'data_usage',
        color: TileColor.Gray,
        spin: true,
        press: reconnectPeer
    }
}

const networkEffectiveIconNames: Record<string, MaterialSymbols> = {
    'slow-2g': 'network_wifi_2_bar',
    '2g': 'network_wifi_3_bar',
    '3g': 'network_wifi',
    '4g': 'signal_wifi_4_bar'
}
