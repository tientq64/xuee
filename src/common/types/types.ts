export enum SiteName {
    YouTube = 'youtube',
    TikTok = 'tiktok',
    Other = 'other'
}

export type RealSiteName = Exclude<SiteName, 'other'>

export type AnyFunction = (...args: any[]) => any
