import { clickNumbAttr } from './markClick'

export function clickNumb(numb: string, openInNewTab: boolean): void {
    const numbSelector: string = `[${clickNumbAttr}="${numb}"]`
    const numbEl = document.querySelector<HTMLElement>(numbSelector)
    if (numbEl === null) return

    if (openInNewTab) {
        if (numbEl instanceof HTMLAnchorElement) {
            window.open(numbEl.href)
        }
    } else {
        numbEl.click()
    }
}
