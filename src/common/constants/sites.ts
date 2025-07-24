export enum SiteName {
    YouTube = 'youTube',
    TikTok = 'tikTok',
    Threads = 'threads',
    Other = 'other'
}

export interface Site {
    name: SiteName
    text: string
    matches: RegExp
}

export const sites: Site[] = [
    {
        name: SiteName.YouTube,
        text: 'YouTube',
        matches: /^https:\/\/www\.youtube\.com\//
    },
    {
        name: SiteName.TikTok,
        text: 'TikTok',
        matches: /^https:\/\/(www\.)?tiktok\.com\//
    },
    {
        name: SiteName.Threads,
        text: 'Threads',
        matches: /^https:\/\/www\.threads\.com\//
    },
    {
        name: SiteName.Other,
        text: 'Khác',
        matches: /.*/
    }
]

export const otherSite: Site = sites.find((site) => {
    return site.name === SiteName.Other
})!
