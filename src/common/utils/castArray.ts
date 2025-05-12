export function castArray<T>(value: T[] | T): T[] {
    if (Array.isArray(value)) return value
    if (value == null) return []

    return [value]
}
