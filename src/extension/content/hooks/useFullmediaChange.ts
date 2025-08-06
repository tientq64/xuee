import { updateMedia } from '@content/funcs/updateMedia'
import { useContent } from '@content/store'
import { useEffect } from 'preact/hooks'

const fullmediaClass: string = 'xuee-fullmedia'

export function useFullmediaChange(): void {
    const { isFullmedia } = useContent()

    useEffect(() => {
        updateMedia()

        const htmlEl: HTMLElement = document.documentElement
        if (isFullmedia) {
            htmlEl.classList.add(fullmediaClass)
        } else {
            htmlEl.classList.remove(fullmediaClass)
        }
    }, [isFullmedia])
}
