import { setIntervalOrRaf } from './setIntervalOrRaf'
import { setTimeoutOrCall } from './setTimeoutOrCall'

export function startRafRunner(
    callback: () => any,
    interval: number = 0,
    duration: number = 5000,
    delay: number = 0,
    immediate: boolean = true
): () => void {
    let delayTimeoutId: number = 0
    let durationTimeoutId: number = 0
    let cancelLoop: () => void = () => {}

    const cancel = (): void => {
        window.clearTimeout(delayTimeoutId)
        window.clearTimeout(durationTimeoutId)
        cancelLoop()
    }

    delayTimeoutId = setTimeoutOrCall(() => {
        const intervalFunc = (): void => {
            const shouldStop: boolean = Boolean(callback())
            if (shouldStop) cancel()
        }

        cancelLoop = setIntervalOrRaf(intervalFunc, interval)
        if (immediate) intervalFunc()

        durationTimeoutId = setTimeoutOrCall(cancel, duration)
    }, delay)

    return cancel
}
