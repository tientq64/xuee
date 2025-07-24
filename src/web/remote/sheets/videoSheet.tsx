import { mergeSheet } from '@remote/helpers/mergeSheet'
import { Sheet } from '@remote/types/types'
import { FlipTile } from '@tiles/FlipTile'
import { PausePlayTile } from '@tiles/PausePlayTile'
import { RotateTile } from '@tiles/RotateTile'
import { ScaleTile } from '@tiles/ScaleTile'
import { SeekByTile } from '@tiles/SeekByTile'
import { SeekToSegmentTile } from '@tiles/SeekToSegmentTile'
import { SlowModeTile } from '@tiles/SlowModeTile'
import { VideoQualityTile } from '@tiles/VideoQualityTile'
import { mediaSheet } from './mediaSheet'

export const videoSheet: Sheet = mergeSheet(mediaSheet, {
    '42': [<ScaleTile amount={+0.1} />, <ScaleTile amount={-0.1} />],
    '51': [<SlowModeTile />, <VideoQualityTile qualityName="2160p" />],
    '52': [<RotateTile amount={-90} />, <FlipTile />],
    '61': [<SeekToSegmentTile />, , <SeekToSegmentTile />],
    '62': [<PausePlayTile />],
    '71': [<SeekByTile seconds={-5} />],
    '72': [<SeekByTile seconds={+5} />]
})
