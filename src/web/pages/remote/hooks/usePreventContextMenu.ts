import { useEventListener } from 'ahooks'

export function usePreventContextMenu(): void {
    useEventListener('contextmenu', (event: MouseEvent): void => {
        event.preventDefault()
    })
}
