import { readdirSync, writeFileSync } from 'fs'
import { basename } from 'path'
import { format, Options } from 'prettier'
import prettierOptions from '../../.prettierrc.json'
import { upperFirst } from '../../src/common/utils/upperFirst'
import { watchGlob } from '../helpers/watchGlob'

export function generateFuncsFiles(): void {
    const kinds = [
        {
            name: 'background',
            path: 'src/extension/background'
        },
        {
            name: 'content',
            path: 'src/extension/content'
        },
        {
            name: 'remote',
            path: 'src/web/pages/remote'
        }
    ]
    for (const kind of kinds) {
        const funcsDir: string = `${kind.path}/funcs`

        watchGlob(funcsDir, 'rename', async (): Promise<void> => {
            const filenames: string[] = readdirSync(funcsDir)
            const funcNames: string[] = filenames.map((name) => basename(name, '.ts'))
            const codes: string[] = [
                ...funcNames.map((name) => {
                    return `import { ${name} } from './funcs/${name}'`
                }),
                `export const ${kind.name}Funcs = { ${funcNames.join(', ')} }`,
                `export const ${kind.name}FuncNames = [`,
                funcNames.map((name) => `'${name}'`).join(', '),
                ']',
                `export type ${upperFirst(kind.name)}Funcs = typeof ${kind.name}Funcs`
            ]
            const code: string = codes.filter(Boolean).join('\n')
            const formatedCode: string = await format(code, {
                ...(prettierOptions as Options),
                parser: 'typescript'
            })
            writeFileSync(`${kind.path}/funcs.ts`, formatedCode)
        })
    }
}
