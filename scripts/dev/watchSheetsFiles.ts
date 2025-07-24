import { readdirSync } from 'fs'
import { basename } from 'path'
import { formatTsCode } from '../helpers/formatTsCode'
import { watchGlob } from '../helpers/watchGlob'
import { outputFileSync } from '../utils/outputFileSync'

export function watchSheetsFiles(): void {
    const sheetsDir: string = 'src/web/remote/sheets'

    watchGlob(sheetsDir, 'rename', async (): Promise<void> => {
        const filenames: string[] = readdirSync(sheetsDir)
        const sheetNames: string[] = filenames.map((name) => basename(name, '.tsx'))
        const codes: string[] = [
            "import { Sheet, SheetName } from '@remote/types/types'",
            ...sheetNames.map((sheetName) => {
                return `import {${sheetName}} from '../sheets/${sheetName}'`
            }),
            '\n',
            'export const sheets: Record<SheetName, Sheet> = {',
            ...sheetNames.map((sheetName) => {
                const name: string = getName(sheetName)
                return `${name}: ${sheetName},`
            }),
            '}'
        ]
        const code: string = await formatTsCode(codes)
        outputFileSync('src/web/remote/constants/sheets.ts', code)
    })
}

export function getName(sheetName: string): string {
    return sheetName.replace(/(Sub)?Sheet$/, '')
}
