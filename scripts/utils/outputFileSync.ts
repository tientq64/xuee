import { PathOrFileDescriptor, WriteFileOptions, writeFileSync } from 'fs'
import { dirname } from 'path'
import { ensureDirSync } from './ensureDirSync'

export function outputFileSync(
    file: PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView,
    options?: WriteFileOptions
): void {
    if (typeof file === 'string') {
        const dir: string = dirname(file)
        ensureDirSync(dir)
    }
    writeFileSync(file, data, options)
}
