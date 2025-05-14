import { SiteName } from '../types/types'

export function getSiteNameByUrl(url: string): SiteName {
    if (!url) return SiteName.Other

    const { hostname } = new URL(url)
    const domain: string = hostname.replace(/^www\./, '')

    switch (domain) {
        case 'youtube.com':
            return SiteName.YouTube

        case 'tiktok.com':
            return SiteName.TikTok
    }
    return SiteName.Other
}
