import { videoQualities, VideoQuality, VideoQualityName } from '@common/constants/videoQualities'

export function getVideoQuality(qualityName: VideoQualityName): VideoQuality
export function getVideoQuality(qualityName: string): VideoQuality | undefined

export function getVideoQuality(qualityName: string): VideoQuality | undefined {
    return videoQualities.find((videoQuality) => videoQuality.name === qualityName)
}
