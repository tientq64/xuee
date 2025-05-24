import { ScrollAmount } from '@common/constants/constants'
import { Sheet } from '@remote/types/types'
import { useClickNumbTile } from '@tiles/useClickNumbTile'
import { useCloseTabTile } from '@tiles/useCloseTabTile'
import { useFullscreenTile } from '@tiles/useFullscreenTile'
import { useInstallPwaTile } from '@tiles/useInstallPwaTile'
import { useMoreTile } from '@tiles/useMoreTile'
import { useMoveTabTile } from '@tiles/useMoveTabTile'
import { useNavigateBrowserTile } from '@tiles/useNavigateBrowserTile'
import { useNavigateTile } from '@tiles/useNavigateTile'
import { useReloadTabTile } from '@tiles/useReloadTabTile'
import { useReopenClosedTabTile } from '@tiles/useReopenClosedTabTile'
import { useScrollTile } from '@tiles/useScrollTile'
import { useSwitchTabTile } from '@tiles/useSwitchTabTile'

export function useMainSheet(): Sheet {
    return {
        '01': useInstallPwaTile(),
        '20': useReloadTabTile(),
        '21': [useCloseTabTile(), useReopenClosedTabTile()],
        '30': [useNavigateTile(-1), useNavigateBrowserTile(-1)],
        '31': [useNavigateTile(1), useNavigateBrowserTile(1)],
        '40': [useSwitchTabTile(-1), useMoveTabTile(-1)],
        '41': [useSwitchTabTile(1), useMoveTabTile(1)],
        '50': [useFullscreenTile(), useFullscreenTile()],
        '60': [useClickNumbTile(), useClickNumbTile(true)],
        '70': [useScrollTile(-ScrollAmount.Base), useScrollTile(-ScrollAmount.Max)],
        '80': [useScrollTile(ScrollAmount.Base), useScrollTile(ScrollAmount.Max)],
        '81': useMoreTile()
    }
}
