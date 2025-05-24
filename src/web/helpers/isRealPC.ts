export function isRealPC(): boolean {
    return navigator.maxTouchPoints === 1 || !('ontouchstart' in window)
}
