export function query<T extends HTMLElement>(
    selector: string,
    parent?: Element | Document | null,
    includeText?: string,
    excludeText?: string
): T | null {
    parent ??= document

    const els: NodeListOf<Element> = parent.querySelectorAll(selector)

    for (const el of els) {
        if (!(el instanceof HTMLElement)) continue

        if (excludeText !== undefined || includeText !== undefined) {
            const textContent: string | undefined = el.textContent?.normalize()
            if (textContent === undefined) continue

            if (excludeText !== undefined) {
                if (textContent.includes(excludeText)) continue
            }
            if (includeText !== undefined) {
                if (!textContent.includes(includeText)) continue
            }
        }

        return el as T
    }

    return null
}
