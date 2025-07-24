import { SiteName } from '@common/constants/sites'
import { VideoQuality, VideoQualityName } from '@common/constants/videoQualities'
import { detectVideoQuality } from '@common/helpers/detectVideoQuality'
import { getVideoQuality } from '@common/helpers/getVideoQuality'
import { click } from '@content/helpers/click'
import { query } from '@content/helpers/query'
import { content } from '@content/store'

export function setVideoQuality(qualityName: VideoQualityName): void {
    const quality: VideoQuality = getVideoQuality(qualityName)

    switch (content.site.name) {
        case SiteName.YouTube:
            setYouTubeVideoQuality(quality)
            break
    }
}

function setYouTubeVideoQuality(quality: VideoQuality): void {
    click('button.ytp-settings-button')
    click('div.ytp-menuitem-label', null, 'Chất lượng')

    const itemEl = query('div.ytp-menuitem-label', null, 'Tự động')
    if (itemEl === null) return

    const itemEls: HTMLCollection | undefined = itemEl.parentElement?.parentElement?.children
    if (itemEls === undefined) return

    for (const el of itemEls) {
        if (!(el instanceof HTMLElement)) continue

        const label: string | undefined = el.textContent?.normalize()
        if (label === undefined) continue
        if (label.includes('Premium')) continue

        const youTubeQuality: VideoQuality | undefined = detectVideoQuality(label)
        if (youTubeQuality === undefined) continue
        if (youTubeQuality.height > quality.height) continue

        el.click()
        break
    }
}
