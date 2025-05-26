export function isRealPC(): boolean {
    return navigator.maxTouchPoints === 0 || !('ontouchstart' in window)
}
