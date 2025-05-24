import { mkdirSync, PathLike } from 'fs'

export function ensureDirSync(path: PathLike): void {
    mkdirSync(path, { recursive: true })
}
