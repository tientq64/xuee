import { execSync } from 'child_process'
import { error, log } from 'console'
import { join } from 'path'
import { cwd, exit, stdin } from 'process'

const xueePath: string = cwd()
const vbsPath: string = join(xueePath, 'run.vbs')
const escapedVbsPath: string = vbsPath.replaceAll('\\', '\\\\')
const regPath: string = 'HKCU\\Software\\Classes\\xuee'

const regCommands: string[] = [
    `reg add "${regPath}" /ve /d "URL:xuee Protocol" /f`,
    `reg add "${regPath}" /v "URL Protocol" /d "" /f`,
    `reg add "${regPath}\\shell" /ve /d "open" /f`,
    `reg add "${regPath}\\shell\\open\\command" /ve /d "wscript \\"${escapedVbsPath}\\" %1" /f`
]
const regCommand: string = regCommands.join(' && ')

try {
    execSync(regCommand)
    log('Protocol "xuee://" đã được thiết lập (HKCU)!')
} catch (err) {
    error('Lỗi khi ghi registry:', String(err))
}

log('\nNhấn phím bất kỳ để thoát...')
stdin.setRawMode(true)
stdin.resume()
stdin.on('data', () => exit(0))
