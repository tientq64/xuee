import { format, Options } from 'prettier'
import prettierOptions from '../../.prettierrc.json'

export function formatTsCode(code: string | string[]): Promise<string> {
    if (Array.isArray(code)) {
        code = code.filter(Boolean).join('\n')
    }

    return format(code, {
        ...(prettierOptions as Options),
        parser: 'typescript'
    })
}
