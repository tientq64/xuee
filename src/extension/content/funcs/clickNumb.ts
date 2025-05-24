import { clickNumbAttr } from './markClick'

const clickableSelector: string = 'a, button'

export function clickNumb(numb: string, openInNewTab: boolean): void {
    const numbSelector: string = `[${clickNumbAttr}="${numb}"]`
    const numbEl = document.querySelector<HTMLElement>(numbSelector)
    if (numbEl === null) return

    const clickEl: HTMLElement =
        numbEl.closest(clickableSelector) ?? numbEl.querySelector(clickableSelector) ?? numbEl

    if (clickEl instanceof HTMLAnchorElement && clickEl.href !== '') {
        if (openInNewTab) {
            window.open(clickEl.href)
        } else {
            location.href = clickEl.href
        }
    } else {
        clickEl.click()
    }
}
