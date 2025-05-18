import { Tile } from '@remote/types/types'
import { usePWAInstall } from 'react-use-pwa-install'

export function useInstallPwaTile(): Tile {
    const installPwa = usePWAInstall()

    return {
        text: 'Cài như ứng dụng',
        icon: 'dashboard_customize',
        disabled: installPwa === null,
        press: installPwa
    }
}
