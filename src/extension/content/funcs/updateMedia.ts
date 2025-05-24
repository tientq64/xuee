import { SiteName } from '@common/constants/sites'
import { ref } from '@common/helpers/ref'
import { content } from '@content/store'

const selectorsMap: Record<SiteName, string> = {
    [SiteName.YouTube]: '.html5-main-video[src]',
    [SiteName.TikTok]: '.tiktok-web-player>video, .swiper, [data-e2e="live-player"]>video',
    [SiteName.Other]: 'video'
}

const mediaClass: string = 'xuee-media'

export function updateMedia(): void {
    if (content.media !== null) {
        content.media.classList.remove(mediaClass)
    }
    const selector: string = selectorsMap[content.site.name]
    const media: HTMLVideoElement | HTMLImageElement | null = document.querySelector(selector)

    if (media !== null) {
        media.classList.add(mediaClass)
    }
    content.media = ref(media)
}
