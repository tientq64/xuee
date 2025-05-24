import { PathLike, copyFileSync as fsCopyFileSync } from 'fs'
import { dirname } from 'path'
import { ensureDirSync } from './ensureDirSync'

export function copyFileSync(src: PathLike, dest: PathLike): void {
    if (typeof dest === 'string') {
        ensureDirSync(dirname(dest))
    }
    fsCopyFileSync(src, dest)
}
