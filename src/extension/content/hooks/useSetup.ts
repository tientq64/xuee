import { updateMedia } from '@content/funcs/updateMedia'
import { content } from '@content/store'
import { useEffect } from 'preact/hooks'

export function useSetup(): void {
    useEffect(() => {
        const html: HTMLElement = document.documentElement
        html.className = html.className
            .replace(/\bxuee-site-\w+\b/, '')
            .concat(` xuee-site-${content.site.name}`)
            .trim()

        updateMedia()
    }, [])
}
