import { VideoQuality, VideoQualityName } from '@common/constants/videoQualities'
import { getVideoQuality } from '@common/helpers/getVideoQuality'
import { Tile } from '@remote/components/Tile'
import { sender } from '@remote/constants/sender'
import { TileNode } from '@remote/types/types'

interface VideoQualityTileProps {
    qualityName: VideoQualityName
}

export function VideoQualityTile({ qualityName }: VideoQualityTileProps): TileNode {
    const quality: VideoQuality = getVideoQuality(qualityName)

    return (
        <Tile icon={quality.iconName} tap={() => sender.setVideoQuality(qualityName)}>
            Chất lượng {quality.text}
        </Tile>
    )
}
