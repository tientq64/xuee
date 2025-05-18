import { otherSite, Site, sites } from '@common/constants/sites'

export function getSiteByUrl(url: string): Site {
    for (const site of sites) {
        if (site.matches.test(url)) return site
    }
    return otherSite
}
