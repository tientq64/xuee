export function wrap(num: number, min: number, max: number): number
export function wrap(num: number, max: number): number

export function wrap(num: number, min: number, max?: number): number {
    if (max === undefined) {
        max = min
        min = 0
    }
    const range: number = max - min

    return ((((num - min) % range) + range) % range) + min
}
