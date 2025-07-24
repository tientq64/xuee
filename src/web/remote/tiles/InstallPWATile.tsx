import { Tile } from '@remote/components/Tile'
import { TileNode } from '@remote/types/types'
import { usePWAInstall } from 'react-use-pwa-install'

type PWAInstall = (() => Promise<boolean>) | null

export function InstallPWATile(): TileNode {
    const installPWA: PWAInstall = usePWAInstall()

    return (
        <Tile icon="dashboard_customize" disabled={installPWA === null} tap={installPWA}>
            Cài như ứng dụng
        </Tile>
    )
}
