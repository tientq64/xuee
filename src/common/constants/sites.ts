export enum SiteName {
    YouTube = 'YouTube',
    TikTok = 'TikTok',
    Other = 'Other'
}

export interface Site {
    name: SiteName
    matches: RegExp
}

export const sites: Site[] = [
    {
        name: SiteName.YouTube,
        matches: /^https:\/\/www.youtube.com\//
    },
    {
        name: SiteName.TikTok,
        matches: /^https:\/\/(www\.)?tiktok.com\//
    },
    {
        name: SiteName.Other,
        matches: /.*/
    }
]

export const otherSite: Site = sites.find((site) => {
    return site.name === SiteName.Other
})!
