import { query } from './query'

export function click<T extends HTMLElement>(
    selector: string,
    parent?: Element | Document | null,
    includeText?: string
): T | null {
    const el = query<T>(selector, parent, includeText)

    if (el instanceof HTMLElement) {
        el.click()
        return el
    }

    return null
}
