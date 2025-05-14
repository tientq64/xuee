import { useEventListener, useFullscreen } from 'ahooks'

export function useEnsureFullscreen(): void {
    const [isFullscreen, { enterFullscreen }] = useFullscreen(document.documentElement)

    useEventListener('pointerup', () => {
        if (isFullscreen) return
        enterFullscreen()
    })
}
