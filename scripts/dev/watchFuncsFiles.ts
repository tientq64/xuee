import { readdirSync } from 'fs'
import { basename } from 'path'
import { format, Options } from 'prettier'
import prettierOptions from '../../.prettierrc.json'
import { upperFirst } from '../../src/common/utils/upperFirst'
import { watchGlob } from '../helpers/watchGlob'
import { outputFileSync } from '../utils/outputFileSync'

export function watchFuncsFiles(): void {
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
            path: 'src/web/remote'
        },
        {
            name: 'command',
            path: 'src/system/command'
        }
    ]
    for (const kind of kinds) {
        const funcsDir: string = `${kind.path}/funcs`

        watchGlob(funcsDir, 'rename', async (): Promise<void> => {
            const filenames: string[] = readdirSync(funcsDir)
            const funcNames: string[] = filenames.map((name) => basename(name, '.ts'))
            {
                const codes: string[] = [
                    ...funcNames.map((name) => {
                        return `import { ${name} } from '../funcs/${name}'`
                    }),
                    '\n',
                    `export const ${kind.name}Funcs = {`,
                    funcNames.join(', '),
                    '}',
                    `export type ${upperFirst(kind.name)}Funcs = typeof ${kind.name}Funcs`
                ]
                const code: string = codes.filter(Boolean).join('\n')
                const formatedCode: string = await format(code, {
                    ...(prettierOptions as Options),
                    parser: 'typescript'
                })
                outputFileSync(`${kind.path}/constants/funcs.ts`, formatedCode)
            }
            {
                const codes: string[] = [
                    `export const ${kind.name}FuncNames = [`,
                    funcNames.map((name) => `'${name}'`).join(', '),
                    ']'
                ]
                const code: string = codes.filter(Boolean).join('\n')
                const formatedCode: string = await format(code, {
                    ...(prettierOptions as Options),
                    parser: 'typescript'
                })
                outputFileSync(`${kind.path}/constants/funcNames.ts`, formatedCode)
            }
        })
    }
}
