import { Tile } from '@remote/types/types'
import { useMemo } from 'preact/hooks'
import { usePWAInstall } from 'react-use-pwa-install'

type PWAInstall = (() => Promise<boolean>) | null

export function useInstallPWATile(): Tile {
    const installPWA: PWAInstall = usePWAInstall()

    return useMemo(() => {
        return {
            text: 'Cài như ứng dụng',
            icon: 'dashboard_customize',
            disabled: installPWA === null,
            press: installPWA
        }
    }, [installPWA])
}
