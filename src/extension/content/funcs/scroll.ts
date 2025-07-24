import { ScrollAmount } from '@common/constants/constants'
import { fullmedia } from './fullmedia'

export function scroll(amount: ScrollAmount | number): void {
    let scroller: Element = document.scrollingElement ?? document.documentElement
    scroller.scrollBy(0, amount)

    fullmedia(false)
}
