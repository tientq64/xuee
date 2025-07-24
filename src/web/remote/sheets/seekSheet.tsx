import { Sheet } from '@remote/types/types'
import { PausePlayTile } from '@tiles/PausePlayTile'
import { SeekSegmentNumberTile } from '@tiles/SeekSegmentNumberTile'
import { SeekToSegmentTile } from '@tiles/SeekToSegmentTile'

export const seekSheet: Sheet = {
    '30': [<SeekSegmentNumberTile segment={7} />],
    '31': [<SeekSegmentNumberTile segment={8} />],
    '32': [<SeekSegmentNumberTile segment={9} />],
    '40': [<SeekSegmentNumberTile segment={4} />],
    '41': [<SeekSegmentNumberTile segment={5} />],
    '42': [<SeekSegmentNumberTile segment={6} />],
    '50': [<SeekSegmentNumberTile segment={1} />],
    '51': [<SeekSegmentNumberTile segment={2} />],
    '52': [<SeekSegmentNumberTile segment={3} />],
    '60': [<SeekSegmentNumberTile segment={0} />],
    '61': [<SeekToSegmentTile />],
    '62': [<PausePlayTile />]
}
