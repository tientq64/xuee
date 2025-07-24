import { updateMedia } from '@content/funcs/updateMedia'
import { useContent } from '@content/store'
import { useEffect } from 'preact/hooks'

const fullmediaClass: string = 'xuee-fullmedia'

export function useFullmediaChange(): void {
    const { isFullmedia } = useContent()

    useEffect(() => {
        updateMedia()

        const html: HTMLElement = document.documentElement
        if (isFullmedia) {
            html.classList.add(fullmediaClass)
        } else {
            html.classList.remove(fullmediaClass)
        }
    }, [isFullmedia])
}
