import { ScrollAmount } from '@common/constants/constants'
import { Sheet } from '@remote/types/types'
import { ClickTile } from '@tiles/ClickTile'
import { CloseTabTile } from '@tiles/CloseTabTile'
import { DuplicateTabTile } from '@tiles/DuplicateTabTile'
import { FullscreenTile } from '@tiles/FullscreenTile'
import { GoToTile } from '@tiles/GoToTile'
import { MinimizeTile } from '@tiles/MinimizeTile'
import { MoreTile } from '@tiles/MoreTile'
import { MoveTabTile } from '@tiles/MoveTabTile'
import { NavigateBrowserTile } from '@tiles/NavigateBrowserTile'
import { NavigateTile } from '@tiles/NavigateTile'
import { ReloadTabTile } from '@tiles/ReloadTabTile'
import { ReopenClosedTabTile } from '@tiles/ReopenClosedTabTile'
import { ScrollTile } from '@tiles/ScrollTile'
import { SwitchTabTile } from '@tiles/SwitchTabTile'

export const mainSheet: Sheet = {
    '10': [<DuplicateTabTile />],
    '12': [<MinimizeTile />],
    '20': [<ReloadTabTile />],
    '21': [<CloseTabTile />, <ReopenClosedTabTile />],
    '30': [<NavigateTile direct={-1} />, <NavigateBrowserTile direct={-1} />],
    '31': [<NavigateTile direct={+1} />, <NavigateBrowserTile direct={+1} />],
    '40': [<SwitchTabTile direct={-1} />, <MoveTabTile direct={-1} />],
    '41': [<SwitchTabTile direct={+1} />, <MoveTabTile direct={+1} />],
    '50': [<FullscreenTile />, <FullscreenTile />],
    '60': [<ClickTile />],
    '81': [<MoreTile />, , <MoreTile />],
    '70': [<ScrollTile amount={-ScrollAmount.Base} />, <ScrollTile amount={-ScrollAmount.Max} />],
    '80': [<ScrollTile amount={+ScrollAmount.Base} />, <ScrollTile amount={+ScrollAmount.Max} />],
    '82': [<GoToTile />]
}
