import { ScrollAmount } from '@common/constants/constants'
import { Sheet } from '@remote/types/types'
import { ClickNumberTile } from '@tiles/ClickNumberTile'
import { ClickOpenInNewTabTile } from '@tiles/ClickOpenInNewTabTile'
import { ClickStatusTile } from '@tiles/ClickStatusTile'
import { ClickTile } from '@tiles/ClickTile'
import { ScrollTile } from '@tiles/ScrollTile'

export const clickSubSheet: Sheet = {
    '21': [<ClickStatusTile />],
    '32': [<ClickNumberTile number={9} />],
    '31': [<ClickNumberTile number={8} />],
    '30': [<ClickNumberTile number={7} />],
    '42': [<ClickNumberTile number={6} />],
    '41': [<ClickNumberTile number={5} />],
    '40': [<ClickNumberTile number={4} />],
    '52': [<ClickNumberTile number={3} />],
    '51': [<ClickNumberTile number={2} />],
    '50': [<ClickNumberTile number={1} />],
    '60': [<ClickTile />],
    '61': [<ClickNumberTile number={0} />],
    '62': [<ClickOpenInNewTabTile />],
    '70': [<ScrollTile amount={-ScrollAmount.Base} />, <ScrollTile amount={-ScrollAmount.Max} />],
    '80': [<ScrollTile amount={+ScrollAmount.Base} />, <ScrollTile amount={+ScrollAmount.Max} />]
}
