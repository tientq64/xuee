import { globSync, watch } from 'fs'

export function watchGlob(
    pattern: string[] | string,
    eventType: 'rename' | 'change' | null,
    cb: (path: string) => void
): void {
    const paths: string[] = globSync(pattern)
    if (paths.length === 0) {
        throw Error('Không tìm thấy mục nào để watch')
    }
    for (let path of paths) {
        path = path.replaceAll('\\', '/')
        watch(path).on('change', (type) => {
            if (eventType !== null && eventType !== type) return
            cb(path)
        })
        cb(path)
    }
}
