export function clamp(num: number, min: number, max: number): number
export function clamp(num: number, max: number): number

export function clamp(num: number, min: number, max?: number): number {
    if (max === undefined) {
        max = min
        min = 0
    }
    if (num > max) return max
    if (num < min) return min

    return num
}
