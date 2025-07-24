import { videoQualities, VideoQuality } from '@common/constants/videoQualities'

export function detectVideoQuality(searchValue: string): VideoQuality | undefined {
    for (const videoQuality of videoQualities) {
        const qualityNames: string[] = [videoQuality.name, ...videoQuality.aliasNames]

        qualityNames.sort((qualityNameA, qualityNameB) => {
            return qualityNameB.length - qualityNameA.length
        })

        for (const qualityName of qualityNames) {
            if (!searchValue.includes(qualityName)) continue
            return videoQuality
        }
    }

    return undefined
}
