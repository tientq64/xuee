import { SiteName } from '@common/constants/sites'
import { ref } from '@common/helpers/ref'
import { content } from '@content/store'
import { Media } from '@content/types/types'

const selectorsMap: Record<SiteName, string> = {
    [SiteName.YouTube]: '.html5-main-video[src]',
    [SiteName.TikTok]: '.tiktok-web-player>video, .swiper, [data-e2e="live-player"]>video',
    [SiteName.Other]: 'video'
}

export function updateMedia(): Media | null {
    const selector: string = selectorsMap[content.site.name]
    const media: Media | null = document.querySelector(selector)

    content.media = ref(media)

    return media
}
