import { pressKey } from './pressKey'

export async function printScreen(): Promise<void> {
    await pressKey('prtScr')
}
