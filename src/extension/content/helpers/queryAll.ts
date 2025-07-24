export function queryAll<T extends HTMLElement>(
    selector: string,
    parent?: Element | Document | null,
    includeText?: string,
    excludeText?: string
): T[] {
    parent ??= document

    const els: NodeListOf<Element> = parent.querySelectorAll(selector)
    const result: T[] = []

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

        result.push(el as T)
    }

    return result
}
