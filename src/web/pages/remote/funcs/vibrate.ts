export function vibrate(pattern: VibratePattern = 45): void {
    if (!navigator.vibrate) return
    try {
        navigator.vibrate(pattern)
    } catch {}
}
