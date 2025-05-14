import { useCloseTabTile } from '../tiles/useCloseTabTile'
import { useFullscreenTile } from '../tiles/useFullscreenTile'
import { useInstallPwaTile } from '../tiles/useInstallPwaTile'
import { useNavigateTile } from '../tiles/useNavigateTile'
import { usePeerTile } from '../tiles/usePeerTile'
import { useReloadTabTile } from '../tiles/useReloadTabTile'
import { useReopenClosedTabTile } from '../tiles/useReopenClosedTabTile'
import { useStatusTile } from '../tiles/useStatusTile'
import { useSwitchTabTile } from '../tiles/useSwitchTabTile'
import { Sheet } from '../types/types'

export function useCommonSheet(): Sheet {
    return {
        '00': usePeerTile(),
        '01': useInstallPwaTile(),
        '02': useStatusTile(),
        '20': useReloadTabTile(),
        '21': [useCloseTabTile(), useReopenClosedTabTile()],
        '30': useNavigateTile(-1),
        '31': useNavigateTile(1),
        '40': useSwitchTabTile(-1),
        '41': useSwitchTabTile(1),
        '50': [, useFullscreenTile()]
    }
}
