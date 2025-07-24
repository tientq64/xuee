import { sender } from '@content/constants/sender'
import { content } from '@content/store'

export function fullmedia(isFullmedia?: boolean): void {
    isFullmedia ??= !content.isFullmedia

    content.isFullmedia = isFullmedia

    if (isFullmedia) {
        sender.fullscreen(true)
    }
}
