import { MaterialSymbols } from 'material-design-icons-literal-types'

export type VideoQualityName =
    | '2160p'
    | '1440p'
    | '1080p'
    | '720p'
    | '480p'
    | '360p'
    | '240p'
    | '144p'

export interface VideoQuality {
    name: VideoQualityName
    text: string
    aliasNames: string[]
    height: number
    iconName: MaterialSymbols
}

export const videoQualities: VideoQuality[] = [
    {
        name: '2160p',
        text: '4K',
        aliasNames: ['4k', 'uhd'],
        height: 2160,
        iconName: '4k'
    },
    {
        name: '1440p',
        text: '2K',
        aliasNames: ['2k'],
        height: 1440,
        iconName: '2k'
    },
    {
        name: '1080p',
        text: 'Full HD',
        aliasNames: ['fhd'],
        height: 1080,
        iconName: 'full_hd'
    },
    {
        name: '720p',
        text: 'HD',
        aliasNames: ['hd'],
        height: 720,
        iconName: 'hd'
    },
    {
        name: '480p',
        text: 'SD',
        aliasNames: ['sd'],
        height: 480,
        iconName: 'sd'
    },
    {
        name: '360p',
        text: '360p',
        aliasNames: [],
        height: 360,
        iconName: '3mp'
    },
    {
        name: '240p',
        text: '240p',
        aliasNames: [],
        height: 240,
        iconName: '2mp'
    },
    {
        name: '144p',
        text: '144p',
        aliasNames: [],
        height: 144,
        iconName: 'mp'
    }
]
