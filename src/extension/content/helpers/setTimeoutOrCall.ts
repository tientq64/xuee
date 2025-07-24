export function setTimeoutOrCall(callback: VoidFunction, timeout: number = 0): number {
    if (timeout <= 0) {
        callback()
        return 0
    }

    return window.setTimeout(callback, timeout)
}
