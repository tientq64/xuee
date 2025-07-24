export function setIntervalOrRaf(callback: VoidFunction, timeout: number = 0): () => void {
    let loopId: number = 0

    if (timeout === 0) {
        const rafFunc = (): void => {
            loopId = window.requestAnimationFrame(() => {
                callback()
                rafFunc()
            })
        }
        rafFunc()

        return () => {
            window.cancelAnimationFrame(loopId)
        }
    }

    loopId = window.setInterval(callback, timeout)

    return () => {
        window.clearInterval(loopId)
    }
}
