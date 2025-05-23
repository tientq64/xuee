import { SiteName } from '@common/constants/sites'
import { content } from '@content/store'

const selectorsMap: Record<SiteName, string[]> = {
    [SiteName.YouTube]: [
        'ytd-thumbnail',
        'yt-thumbnail-view-model',
        // Video đề xuất lúc gần cuối video.
        '.ytp-ce-video',
        // Video đề xuất khi video kết thúc.
        '.ytp-videowall-still',
        'ytm-shorts-lockup-view-model',
        // Nút menu ở góc trên bên trái.
        '#guide-button',
        // Tên kênh dưới video.
        '.ytd-channel-name a.yt-simple-endpoint',
        // Nút đăng ký.
        '#subscribe-button-shape'
    ],
    [SiteName.TikTok]: [
        '[data-e2e="search-user-container"]',
        '[data-e2e="search-top-user-see-more"]'
    ],
    [SiteName.Other]: ['a, button, [role="button"]']
}

export const clickNumbAttr: string = 'data-xuee-click-numb'

export function markClick(): void {
    const { site } = content

    const oldNumbEls = document.querySelectorAll<HTMLElement>(`[${clickNumbAttr}]`)
    for (const oldNumbEl of oldNumbEls) {
        oldNumbEl.removeAttribute(clickNumbAttr)
    }

    const selectors: string[] = selectorsMap[site.name]
    if (selectors.length === 0) return

    let numbEls: HTMLElement[] = selectors
        .flatMap((selector) => {
            return [...document.querySelectorAll<HTMLElement>(selector)]
        })
        .filter((numbEl) => {
            return numbEl instanceof HTMLElement && numbEl.checkVisibility()
        })
    numbEls = [...new Set(numbEls)]

    numbEls.forEach((numbEl, numb) => {
        numbEl.setAttribute(clickNumbAttr, String(numb))
    })
}
