import { ScrollAmount } from '@common/constants/constants'

export function scroll(amount: ScrollAmount | number): void {
    let scroller: Element = document.scrollingElement ?? document.documentElement
    scroller.scrollBy(0, amount)
}
