export function getTouchDistance(touchA: Touch, touchB: Touch): number {
    const dX: number = touchB.clientX - touchA.clientX
    const dY: number = touchB.clientY - touchA.clientY

    return Math.sqrt(dX * dX + dY * dY)
}
